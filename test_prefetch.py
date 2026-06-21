import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tests.tickets.settings')

django.setup()

from eventyay.base.models import Organizer

try:
    organizers = Organizer.objects.prefetch_related('billing__invoice_voucher', 'events').all()
    print("Prefetch setup works:", organizers.query)
except Exception as e:
    print("Error:", e)
