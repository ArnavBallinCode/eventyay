import json
import logging
from decimal import Decimal

from django.dispatch import receiver

from eventyay.base.models import Order, OrderPayment, OrderRefund
from eventyay.base.services.orders import mark_order_refunded
from eventyay.eventyay_common.tasks import update_billing_invoice_information
from eventyay.services.stripe.signals import stripe_webhook_received

logger = logging.getLogger(__name__)


@receiver(stripe_webhook_received, dispatch_uid="core_stripe_webhook_payment_intent_succeeded")
def handle_payment_intent_succeeded(sender, event, event_type, data_object, **kwargs):
    if event_type == "payment_intent.succeeded":
        invoice_id = data_object.get("metadata", {}).get("invoice_id")
        if invoice_id:
            update_billing_invoice_information.delay(invoice_id=invoice_id)
        else:
            logger.info(
                "Ignoring payment_intent.succeeded without invoice_id metadata (event %s)", getattr(event, "id", None)
            )


@receiver(stripe_webhook_received, dispatch_uid="core_stripe_webhook_charge_refunded")
def handle_charge_refunded(sender, event, event_type, data_object, **kwargs):
    if event_type == "charge.refunded":
        charge = data_object
        metadata = charge.get("metadata", {})
        order_code = metadata.get("order")
        payment_id = metadata.get("payment")
        charge_id = charge.get("id")

        payment = None
        if order_code and payment_id:
            payment = OrderPayment.objects.filter(order__code=order_code, local_id=payment_id).first()

        if not payment:
            payment = OrderPayment.objects.filter(info__contains=charge_id).first()

        if payment:
            order = payment.order
            # Process each refund in the charge
            stripe_refunds = charge.get("refunds", {}).get("data", [])

            for sr in stripe_refunds:
                amount = Decimal(sr.get("amount")) / 100
                stripe_refund_id = sr.get("id")

                # Check if we already recorded this refund
                if not order.refunds.filter(info__contains=stripe_refund_id).exists():
                    order.refunds.create(
                        payment=payment,
                        source=OrderRefund.REFUND_SOURCE_EXTERNAL,
                        state=OrderRefund.REFUND_STATE_DONE,
                        amount=amount,
                        provider="stripe",
                        info=json.dumps({"id": stripe_refund_id, "full_data": sr}),
                    )
                    logger.info("Recorded refund of %s for order %s via Stripe webhook.", amount, order.code)

            # If the charge is fully refunded, mark the order as refunded (canceled)
            if charge.get("refunded"):
                if order.status != Order.STATUS_CANCELED:
                    mark_order_refunded(order, user=None)
                    logger.info("Order %s marked as fully refunded (canceled) via Stripe webhook.", order.code)


@receiver(stripe_webhook_received, dispatch_uid="core_stripe_webhook_invoice_paid")
def handle_invoice_paid(sender, event, event_type, data_object, **kwargs):
    if event_type == "invoice.paid":
        invoice_id = data_object.get("metadata", {}).get("invoice_id")
        if invoice_id:
            update_billing_invoice_information.delay(invoice_id=invoice_id)
        else:
            logger.info("Ignoring invoice.paid without invoice_id metadata")


@receiver(stripe_webhook_received, dispatch_uid="core_stripe_webhook_invoice_payment_failed")
def handle_invoice_payment_failed(sender, event, event_type, data_object, **kwargs):
    if event_type == "invoice.payment_failed":
        invoice_id = data_object.get("metadata", {}).get("invoice_id")
        if invoice_id:
            logger.warning("Invoice payment failed for invoice_id: %s", invoice_id)
