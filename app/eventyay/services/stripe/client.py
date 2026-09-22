import stripe
from typing import Optional
from eventyay.services.stripe.credentials import get_stripe_secret_key

def get_stripe_client(account_id: Optional[str] = None) -> stripe.StripeClient:
    """
    Returns a thread-safe Stripe client initialized with the platform's secret key.
    This avoids mutating the global stripe.api_key state, ensuring thread safety
    across concurrent requests.
    
    :param account_id: Optional Stripe Connect account ID to act on behalf of.
    """
    secret_key = get_stripe_secret_key()
    return stripe.StripeClient(api_key=secret_key, stripe_account=account_id)
