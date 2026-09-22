import logging

import stripe
from django.core.exceptions import ValidationError

from eventyay.base.models import BillingInvoice, Organizer
from eventyay.base.models.organizer import OrganizerBillingModel
from eventyay.services.stripe.credentials import get_stripe_secret_key
from eventyay.services.stripe.errors import handle_stripe_errors

logger = logging.getLogger(__name__)


@handle_stripe_errors("create_setup_intent")
def create_setup_intent(customer_id: str) -> str:
    """
    Create a setup intent for the customer.
    @param customer_id: A string representing the customer ID.
    @return: A string representing the client secret.
    """
    stripe_setup_intent = stripe.SetupIntent.create(
        api_key=get_stripe_secret_key(),
        customer=customer_id,
        payment_method_types=["card"],
        usage="off_session",
    )
    logger.info("Created a successful setup intent.")
    billing_settings_updated = OrganizerBillingModel.objects.filter(stripe_customer_id=customer_id).update(
        stripe_setup_intent_id=stripe_setup_intent.id
    )
    if not billing_settings_updated:
        logger.error("No billing settings found for the customer %s", customer_id)
        raise ValidationError("No billing settings found for the customer.")
    return stripe_setup_intent.client_secret


def get_stripe_customer_id(organizer_slug: str) -> str:
    """
    Retrieve the Stripe customer ID.
    @param organizer_slug: A string representing the organizer slug.
    @return: A string representing the Stripe customer ID.
    """
    organizer = Organizer.objects.get(slug=organizer_slug)
    if not organizer:
        logger.error("Organizer %s not found.", organizer_slug)
        raise ValidationError(f"Organizer {organizer_slug} not found.")
    billing_settings = OrganizerBillingModel.objects.filter(organizer_id=organizer.id).first()
    if billing_settings and billing_settings.stripe_customer_id:
        return billing_settings.stripe_customer_id
    logger.error(
        "No billing settings or Stripe customer ID found for organizer %s",
        organizer_slug,
    )
    raise ValidationError(f"No stripe_customer_id found for organizer {organizer_slug}")


@handle_stripe_errors("create_stripe_customer")
def create_stripe_customer(email: str, name: str):
    """
    Create a Stripe customer.
    @param email: A string representing the email address.
    @param name: A string representing the name.
    @return: A dictionary containing the customer information.
    """
    customer = stripe.Customer.create(
        api_key=get_stripe_secret_key(),
        email=email,
        name=name,
    )
    logger.info("Created a successful customer.")
    return customer


@handle_stripe_errors("update_payment_info")
def update_payment_info(setup_intent_id: str, customer_id: str):
    """
    Update the payment information.
    @param setup_intent_id: A string representing the setup intent ID.
    @param customer_id: A string representing the customer ID.
    @return: A dictionary containing the updated payment information.
    """
    setup_intent = get_setup_intent(setup_intent_id)
    payment_method = setup_intent.payment_method
    if not payment_method:
        logger.error("No payment method found for the setup intent %s", setup_intent_id)
        raise ValidationError("No payment method found for the setup intent.")
    billing_setting_updated = OrganizerBillingModel.objects.filter(stripe_customer_id=customer_id).update(
        stripe_payment_method_id=payment_method
    )
    if not billing_setting_updated:
        logger.error("No billing settings found for the customer %s", customer_id)
        raise ValidationError("No billing settings found for the customer.")
    attach_payment_method_to_customer(payment_method, customer_id)
    customer_info_updated = stripe.Customer.modify(
        customer_id, api_key=get_stripe_secret_key(), invoice_settings={"default_payment_method": payment_method}
    )
    logger.info("Updated successful payment information.")
    return customer_info_updated


@handle_stripe_errors("get_payment_method_info")
def get_payment_method_info(stripe_customer_id: str):
    """
    Retrieve the payment method information.
    @param stripe_customer_id: A string representing the customer ID.
    @return: A dictionary containing the payment method information.
    """
    billing_settings = OrganizerBillingModel.objects.filter(stripe_customer_id=stripe_customer_id).first()
    if not billing_settings or not billing_settings.stripe_payment_method_id:
        return None
    payment_method = stripe.PaymentMethod.retrieve(
        billing_settings.stripe_payment_method_id, api_key=get_stripe_secret_key()
    )
    logger.info("Retrieve successful payment information.")
    return payment_method


@handle_stripe_errors("update_customer_info")
def update_customer_info(customer_id: str, email: str, name: str):
    """
    Update the customer information.
    @param customer_id: A string representing the customer ID.
    @param email: A string representing the email address.
    @param name: A string representing the name.
    @return: A dictionary containing the updated customer information.
    """
    updated_customer_info = stripe.Customer.modify(
        customer_id, api_key=get_stripe_secret_key(), email=email, name=name
    )
    logger.info("Updated successful customer information.")
    return updated_customer_info


@handle_stripe_errors("attach_payment_method_to_customer")
def attach_payment_method_to_customer(payment_method_id: str, customer_id: str):
    """
    Attach the payment method to the customer.
    @param payment_method_id: A string representing the payment method ID.
    @param customer_id: A string representing the customer ID.
    @return: A dictionary containing the attached payment method information.
    """
    attached_payment_method = stripe.PaymentMethod.attach(
        payment_method_id, customer=customer_id, api_key=get_stripe_secret_key()
    )
    logger.info(
        "Attached successful payment method.",
    )
    return attached_payment_method


@handle_stripe_errors("get_setup_intent")
def get_setup_intent(setup_intent_id: str):
    """
    Retrieve the setup intent
    @param setup_intent_id: A string representing the setup intent ID.
    @return: A dictionary containing the setup intent information.
    """
    setup_intent = stripe.SetupIntent.retrieve(setup_intent_id, api_key=get_stripe_secret_key())
    logger.info("Retrieve successful setup intent.")
    return setup_intent


@handle_stripe_errors("create_payment_intent")
def create_payment_intent(
    amount: int,
    currency: str,
    customer_id: str,
    payment_method_id: str,
    metadata: dict,
    invoice_id: str,
):
    """
    Create a payment intent to process automatic billing charge.
    @param amount: int representing the amount charged in cents.
    @param currency: A string representing the currency in ISO code.
    @param customer_id: A string representing the customer ID.
    @param payment_method_id: A string representing the payment method ID.
    @param metadata: A dictionary of key-value pairs that you can attach to a payment object.
    @param invoice_id: A string representing the invoice ID.
    @return: A dictionary containing the payment intent information.
    """
    payment_intent = stripe.PaymentIntent.create(
        api_key=get_stripe_secret_key(),
        amount=int(amount * 100),
        currency=currency,
        customer=customer_id,
        payment_method=payment_method_id,
        automatic_payment_methods={"enabled": True, "allow_redirects": "never"},
        metadata=metadata,
    )
    billing_invoice_updated = BillingInvoice.objects.filter(id=invoice_id).update(
        stripe_payment_intent_id=payment_intent.id
    )
    if not billing_invoice_updated:
        logger.error("No billing invoice found for the invoice %s", invoice_id)
        raise ValidationError("No billing invoice found for the invoice.")
    logger.info("Created a successful payment intent.")
    return payment_intent


@handle_stripe_errors("confirm_payment_intent")
def confirm_payment_intent(payment_intent_id: str, payment_method_id: str):
    """
    Confirm the payment intent to process automatic billing charge.
    @param payment_intent_id: A string representing the payment intent ID.
    @param payment_method_id: A string representing the payment method ID.
    @return: A dictionary containing the payment intent confirmation information.
    """
    payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id, api_key=get_stripe_secret_key())
    payment_intent.confirm(payment_method=payment_method_id)
    logger.info("Confirmed successful payment intent.")
    return payment_intent


def process_auto_billing_charge_stripe(
    organizer_slug: str, amount: int, currency: str, metadata: dict, invoice_id: str
):
    """
    Process the automatic billing charge using Stripe.
    @param organizer_slug: A string representing the organizer slug.
    @param amount: int representing the amount charged in cents.
    @param currency: A string representing the currency in ISO code.
    @param metadata: A dictionary of key-value pairs that you can attach to a payment object.
    @param invoice_id: A string representing the invoice ID.
    @return: A dictionary containing the payment intent confirmation information.
    """
    customer_id = get_stripe_customer_id(organizer_slug)
    payment_method = get_payment_method_info(customer_id)
    if not payment_method:
        logger.error("No payment method found for the customer %s", customer_id)
        raise ValidationError("No payment method found for the customer.")
    payment_intent = create_payment_intent(amount, currency, customer_id, payment_method.id, metadata, invoice_id)
    payment_intent_confirmation_info = confirm_payment_intent(payment_intent.id, payment_method.id)
    return payment_intent_confirmation_info


# Re-export credentials for backward compatibility
from eventyay.services.stripe.credentials import (
    get_stripe_key,
    get_stripe_publishable_key,
    get_stripe_secret_key,
    get_stripe_webhook_secret_key,
)
