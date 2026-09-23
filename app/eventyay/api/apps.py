from django.apps import AppConfig


class EventyayApiConfig(AppConfig):
    name = 'eventyay.api'
    label = 'api'

    def ready(self):
        from . import schema, signals, webhooks  # noqa
        import eventyay.services.stripe.signals_receivers  # noqa


default_app_config = 'eventyay.api.EventyayApiConfig'
