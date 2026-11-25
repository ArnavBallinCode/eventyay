from django.conf import settings


def retired_payment_providers() -> set[str]:
    providers = set()
    if settings.DISABLE_NEW_PAYPAL_PAYMENTS:
        providers.update(('paypal', 'stripe_paypal'))
    if settings.DISABLE_NEW_BANK_TRANSFER_PAYMENTS:
        providers.add('banktransfer')
    return providers


def retired_payment_plugins() -> set[str]:
    plugins = set()
    if settings.DISABLE_NEW_PAYPAL_PAYMENTS:
        plugins.update(('eventyay_paypal', 'eventyay.plugins.paypal'))
    if settings.DISABLE_NEW_BANK_TRANSFER_PAYMENTS:
        plugins.add('eventyay.plugins.banktransfer')
    return plugins
