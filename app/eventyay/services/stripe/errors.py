import logging
import stripe
from functools import wraps
from django.core.exceptions import ValidationError
from eventyay.base.operational_logging import OUTCOME_FAILURE, log_event

logger = logging.getLogger(__name__)

def handle_stripe_errors(operation_name: str):
    """
    Handle the Stripe errors uniformly across all core and plugin Stripe calls.
    @param operation_name: A string representing the operation name for logging.
    @return: A decorator function.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except stripe.error.APIError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='api_error', backend='stripe')
                logger.error('Stripe API error during %s: %s', operation_name, e)
                raise ValidationError('Stripe service error.')
            except stripe.error.APIConnectionError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='api_connection_error', backend='stripe')
                logger.error('Stripe API connection error during %s: %s', operation_name, e)
                raise ValidationError('Stripe connection error.')
            except stripe.error.AuthenticationError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='auth_error', backend='stripe')
                logger.error('Stripe authentication error during %s: %s', operation_name, e)
                raise ValidationError('Stripe authentication error.')
            except stripe.error.RateLimitError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='rate_limit', backend='stripe')
                logger.error('Stripe rate limit error during %s: %s', operation_name, e)
                raise ValidationError('Stripe rate limit exceeded.')
            except stripe.error.InvalidRequestError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='invalid_request', backend='stripe')
                logger.error('Stripe invalid request error during %s: %s', operation_name, e)
                raise ValidationError(f'Invalid request to Stripe: {e.user_message or str(e)}')
            except stripe.error.SignatureVerificationError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='signature_error', backend='stripe')
                logger.error('Stripe signature verification error during %s: %s', operation_name, e)
                raise ValidationError('Invalid Stripe webhook signature.')
            except stripe.error.PermissionError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='permission_error', backend='stripe')
                logger.error('Stripe permission error during %s: %s', operation_name, e)
                raise ValidationError('Stripe permission denied.')
            except stripe.error.IdempotencyError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='idempotency_error', backend='stripe')
                logger.error('Stripe idempotency error during %s: %s', operation_name, e)
                raise ValidationError('Stripe idempotency conflict.')
            except stripe.error.StripeError as e:
                log_event('plugins', 'connection.stripe', OUTCOME_FAILURE, error_code='stripe_error', backend='stripe')
                logger.error('Stripe error during %s: %s', operation_name, e)
                raise ValidationError('An error occurred while communicating with Stripe.')
        return wrapper
    return decorator
