import logging
from django.core.exceptions import ValidationError
from eventyay.base.settings import GlobalSettingsObject

logger = logging.getLogger(__name__)

def get_stripe_webhook_secret_key() -> str:
    """
    Retrieve the Stripe webhook secret key.
    @return: A string representing the Stripe webhook secret key.
    """
    gs = GlobalSettingsObject()
    stripe_webhook_secret_key = getattr(gs.settings, 'stripe_webhook_secret_key', None)
    if not stripe_webhook_secret_key:
        logger.error('Stripe webhook secret key not found')
        raise ValidationError('Stripe webhook secret key not found.')
    return stripe_webhook_secret_key

def get_stripe_key(key_type: str) -> str:
    """
    Retrieve the Stripe key.
    @param key_type: A string representing the key type.
    @return: A string representing the Stripe key.
    """
    gs = GlobalSettingsObject()

    try:
        prod_key = getattr(gs.settings, f'payment_stripe_{key_type}_key', None)
        test_key = getattr(gs.settings, f'payment_stripe_test_{key_type}_key', None)
    except AttributeError as e:
        logger.error('Missing attribute for Stripe %s key: %s', key_type, str(e))
        raise ValidationError(
            f'Missing attribute for Stripe {key_type} key: {str(e)}. Please contact the administrator to set the Stripe key.',
        )

    if not prod_key and not test_key:
        logger.error('No Stripe %s key found', key_type)
        raise ValidationError(f'Please contact the administrator to set the Stripe {key_type} key.')

    return prod_key or test_key

def get_stripe_secret_key() -> str:
    return get_stripe_key('secret')

def get_stripe_publishable_key() -> str:
    return get_stripe_key('publishable')
