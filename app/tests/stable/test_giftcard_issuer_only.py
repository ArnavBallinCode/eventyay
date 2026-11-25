from decimal import Decimal
from unittest.mock import MagicMock, patch

import pytest
from django.core.cache import cache
from django.test import override_settings
from django_scopes import scope, scopes_disabled
from rest_framework.test import APIClient

from eventyay.base.models import Order, Organizer, Team
from eventyay.base.payment import GiftCardPayment, PaymentException
from eventyay.base.services.cart import get_fees
from eventyay.base.services.orders import _try_auto_refund
from eventyay.control.forms.organizer_forms import GiftCardCreateForm


@pytest.fixture
def other_organizer(db):
    return Organizer.objects.create(name='Other Organizer', slug='otherorg')


@pytest.fixture
def own_card(organizer):
    gc = organizer.issued_gift_cards.create(secret='OWNCARD1', currency='USD')
    gc.transactions.create(value=Decimal('20.00'))
    return gc


@pytest.fixture
def foreign_card(organizer, other_organizer):
    gc = other_organizer.issued_gift_cards.create(secret='FOREIGN1', currency='USD')
    gc.transactions.create(value=Decimal('20.00'))
    # A legacy acceptance link must no longer have any effect.
    organizer.gift_card_issuer_acceptance.create(issuer=other_organizer)
    return gc


@pytest.fixture
@scopes_disabled()
def token_client(organizer, allow_all_entitlements):
    team = Team.objects.create(organizer=organizer, name='API team', can_manage_gift_cards=True)
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION='Token ' + team.tokens.create(name='Foo').token)
    return client


@pytest.mark.django_db
def test_card_only_accepted_by_issuer(organizer, own_card, foreign_card):
    assert own_card.accepted_by(organizer)
    assert not foreign_card.accepted_by(organizer)
    assert list(organizer.accepted_gift_cards) == [own_card]


@pytest.mark.django_db
def test_acceptance_link_does_not_enable_gift_cards(organizer, other_organizer):
    cache.clear()
    organizer.gift_card_issuer_acceptance.create(issuer=other_organizer)
    assert not organizer.has_gift_cards


@pytest.mark.django_db
def test_checkout_rejects_foreign_card(event, own_card, foreign_card):
    request = MagicMock()
    request.POST = {'giftcard': foreign_card.secret}
    cs = {}
    with (
        patch('eventyay.base.payment.get_cart', return_value=[]),
        patch('eventyay.base.payment.cart_session', return_value=cs),
        patch('eventyay.base.payment.messages') as messages,
        scopes_disabled(),
    ):
        GiftCardPayment(event).checkout_prepare(request, {'positions': [], 'invoice_address': None, 'raw': []})

    assert 'gift_cards' not in cs
    messages.error.assert_called_once()
    assert 'not known' in str(messages.error.call_args.args[1])


@pytest.mark.django_db
def test_get_fees_drops_foreign_card_from_session(event, own_card, foreign_card):
    cs = {'gift_cards': [foreign_card.pk, own_card.pk]}
    with patch('eventyay.presale.views.cart.cart_session', return_value=cs), scopes_disabled():
        fees = get_fees(event, MagicMock(), Decimal('50.00'), None, None, [])

    assert cs['gift_cards'] == [own_card.pk]
    assert [f.value for f in fees] == [Decimal('-20.00')]


@pytest.mark.django_db
def test_api_does_not_expose_foreign_cards(token_client, organizer, own_card, foreign_card):
    resp = token_client.get(f'/api/v1/organizers/{organizer.slug}/giftcards/?include_accepted=true')
    assert resp.status_code == 200
    assert [r['secret'] for r in resp.data['results']] == [own_card.secret]

    resp = token_client.get(
        f'/api/v1/organizers/{organizer.slug}/giftcards/{foreign_card.pk}/transactions/?include_accepted=true'
    )
    assert resp.status_code == 404


@pytest.mark.django_db
def test_api_cannot_transact_on_foreign_card(token_client, organizer, foreign_card):
    resp = token_client.post(
        f'/api/v1/organizers/{organizer.slug}/giftcards/{foreign_card.pk}/transact/?include_accepted=true',
        {'value': '500.00'},
        format='json',
    )
    assert resp.status_code == 404
    assert foreign_card.value == Decimal('20.00')


@pytest.mark.django_db
def test_create_form_allows_code_used_by_other_organizer(organizer, foreign_card, own_card):
    data = {'secret': foreign_card.secret, 'currency': 'USD', 'value': '5.00'}
    assert GiftCardCreateForm(data=data, organizer=organizer).is_valid()

    data['secret'] = own_card.secret.lower()
    form = GiftCardCreateForm(data=data, organizer=organizer)
    assert not form.is_valid()
    assert 'secret' in form.errors


@pytest.mark.django_db
@override_settings(SITE_URL='https://testserver')
def test_control_cannot_add_cross_organizer_acceptance(organizer_client, organizer, other_organizer, user):
    other_team = Team.objects.create(organizer=other_organizer, name='Other', can_manage_gift_cards=True)
    other_team.members.add(user)

    resp = organizer_client.post(f'/control/organizer/{organizer.slug}/giftcards', {'add': other_organizer.slug})
    assert resp.status_code == 405
    assert not organizer.gift_card_issuer_acceptance.exists()


@pytest.fixture
def paid_order(event):
    with scope(event=event, organizer=event.organizer):
        order = Order.objects.create(event=event, status=Order.STATUS_PAID, total=10)
        order.payments.create(provider='manual', amount=10, state='confirmed')
        yield order


@pytest.mark.django_db
@pytest.mark.parametrize('original_payment', [False, True])
def test_foreign_refund_destination_rejected(paid_order, foreign_card, original_payment):
    refund = paid_order.refunds.create(provider='giftcard', amount=5)
    if original_payment:
        payment = paid_order.payments.create(provider='giftcard', amount=5)
        payment.info_data = {'gift_card': foreign_card.pk}
        payment.save()
        refund.payment = payment
    else:
        refund.info_data = {'gift_card': foreign_card.pk}
    refund.save()
    with pytest.raises(PaymentException):
        GiftCardPayment(paid_order.event).execute_refund(refund)
    assert foreign_card.value == 20
    assert not refund.gift_card_transactions.exists()


@pytest.mark.django_db
@override_settings(SITE_URL='https://testserver')
@pytest.mark.parametrize('allocated,expected', [('5.00', 5), ('6.00', 0), ('-1.00', 0)])
def test_manual_gift_card_refund_allocation(organizer_client, paid_order, allocated, expected):
    event = paid_order.event
    response = organizer_client.post(
        f'/control/event/{event.organizer.slug}/{event.slug}/orders/{paid_order.code}/refund',
        {'start-mode': 'partial', 'start-partial_amount': '5.00', 'start-action': 'do_nothing',
         'perform': 'on', 'refund-new-giftcard': allocated},
    )
    assert response.status_code in (200, 302)
    if expected:
        refund = paid_order.refunds.get()
        card = event.organizer.issued_gift_cards.get()
        GiftCardPayment(event).execute_refund(refund)
        assert card.value == expected
        assert refund.gift_card_transactions.count() == 1
    else:
        assert not event.organizer.issued_gift_cards.exists()
        assert not paid_order.refunds.exists()


@pytest.mark.django_db
def test_cancellation_credit_uses_refundable_balance(paid_order):
    event = paid_order.event
    event.settings.cancel_allow_user_paid_keep_percentage = Decimal('20')
    event.settings.cancel_allow_user_paid_keep = Decimal('1.00')
    fee = paid_order.user_cancel_fee
    assert fee == Decimal('3.00')
    paid_order.total = fee
    paid_order.save(update_fields=['total'])
    _try_auto_refund(paid_order, refund_as_giftcard=True)
    card = event.organizer.issued_gift_cards.get()
    assert card.currency == event.currency
    assert card.testmode == paid_order.testmode
    assert card.value == Decimal('7.00')
    assert paid_order.pending_sum == 0


@pytest.mark.django_db
def test_partial_refund_to_original_gift_card(paid_order, own_card):
    payment = paid_order.payments.create(provider='giftcard', amount=8, state='confirmed')
    payment.info_data = {'gift_card': own_card.pk}
    payment.save()
    own_card.transactions.create(value=-8, order=paid_order, payment=payment)
    refund = paid_order.refunds.create(provider='giftcard', payment=payment, amount=3)
    GiftCardPayment(paid_order.event).execute_refund(refund)
    assert own_card.value == 15
    assert refund.info_data['gift_card'] == own_card.pk
