import stripe
from eventyay.services.stripe.credentials import get_stripe_secret_key

def get_stripe_client() -> stripe.StripeClient:
    """
    Returns a thread-safe Stripe client initialized with the platform's secret key.
    This avoids mutating the global stripe.api_key state, ensuring thread safety
    across concurrent requests.
    """
    secret_key = get_stripe_secret_key()
    return stripe.StripeClient(secret_key)
