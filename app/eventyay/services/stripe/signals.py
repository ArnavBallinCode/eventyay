import django.dispatch


stripe_webhook_received = django.dispatch.Signal()
# Provides kwargs: sender, event (stripe.Event), event_type (str), data_object (dict)
