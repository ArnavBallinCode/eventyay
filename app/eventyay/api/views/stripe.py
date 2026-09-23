import logging

import stripe
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from eventyay.base.operational_logging import OUTCOME_FAILURE, log_event
from eventyay.helpers.stripe_utils import get_stripe_webhook_secret_key
from eventyay.services.stripe.signals import stripe_webhook_received


logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def stripe_webhook_view(request):
    """
    Unified Stripe Webhook Dispatcher (API path ``/api/v1/stripe/webhook/``).

    Parses incoming Stripe events and dispatches them via the `stripe_webhook_received`
    signal. Listeners across the core platform and plugins can hook into this signal
    to process specific event types.
    """
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    if not sig_header:
        log_event('plugins', 'webhook.inbound', OUTCOME_FAILURE, error_code='missing_signature', backend='stripe')
        logger.error('Missing Stripe signature header')
        return HttpResponse('Missing signature', status=400)

    try:
        webhook_secret_key = get_stripe_webhook_secret_key()
    except ValidationError:
        log_event('plugins', 'webhook.inbound', OUTCOME_FAILURE, error_code='secret_unconfigured', backend='stripe')
        logger.exception('Stripe webhook secret is not configured')
        # 503: temporary misconfiguration — ask Stripe to retry after ops fixes secrets.
        return HttpResponse('Webhook secret not configured', status=503)

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret_key)
    except ValueError as e:
        log_event('plugins', 'webhook.inbound', OUTCOME_FAILURE, error_code='invalid_payload', backend='stripe')
        logger.error('Error parsing payload: %s', e)
        return HttpResponse('Invalid payload', status=400)
    except stripe.error.SignatureVerificationError as e:
        log_event('plugins', 'webhook.inbound', OUTCOME_FAILURE, error_code='invalid_signature', backend='stripe')
        logger.error('Error verifying webhook signature: %s', e)
        return HttpResponse('Invalid signature', status=400)

    # Dispatch the validated event via Django signals
    stripe_webhook_received.send(
        sender=None,
        event=event,
        event_type=event.type,
        data_object=event.data.object,
    )

    return HttpResponse('Success', status=200)
