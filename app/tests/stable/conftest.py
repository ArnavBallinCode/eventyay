"""
Pytest fixtures for eventyay integration tests.
Provides test users, organizers, events, and authenticated clients.
"""
import re
import warnings
from copy import deepcopy
from datetime import timedelta
from urllib.parse import urlsplit, urlunsplit

import pytest
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import caches as django_caches
from django.dispatch import Signal
from django.test import override_settings
from django.utils import timezone

from eventyay.base import entitlements


User = get_user_model()


REDIS_CACHE_BACKENDS = (
    'django.core.cache.backends.redis.RedisCache',
    'django_redis.cache.RedisCache',
)
# Databases 0-3 are reserved for application services; workers use 4 and up.
WORKER_REDIS_DB_OFFSET = 4
REDIS_DB_LIMIT = 16


def get_worker_redis_db(worker_id):
    match = re.fullmatch(r'gw(\d+)', worker_id)
    if not match:
        raise pytest.UsageError(f'Unsupported xdist worker id: {worker_id!r}')
    db = WORKER_REDIS_DB_OFFSET + int(match.group(1))
    if db >= REDIS_DB_LIMIT:
        raise pytest.UsageError(
            f'Worker {worker_id} needs Redis database {db}; at most '
            f'{REDIS_DB_LIMIT - WORKER_REDIS_DB_OFFSET} workers are supported.'
        )
    return db


def build_worker_redis_settings(worker_id, redis_url, caches, channel_layers):
    worker_url = urlunsplit(urlsplit(redis_url)._replace(path=f'/{get_worker_redis_db(worker_id)}'))
    caches = deepcopy(caches)
    matched = False
    for cache in caches.values():
        if cache.get('BACKEND') in REDIS_CACHE_BACKENDS:
            cache['LOCATION'] = worker_url
            matched = True
    if not matched:
        warnings.warn(f'No Redis cache configured; worker {worker_id} shares cache state.')

    channel_layers = deepcopy(channel_layers)
    for layer in channel_layers.values():
        for host in layer.get('CONFIG', {}).get('hosts', []):
            if isinstance(host, dict) and 'address' in host:
                host['address'] = worker_url
    return caches, channel_layers


@pytest.fixture(scope='session', autouse=True)
def isolate_worker_caches(worker_id):
    # Cache.clear() flushes a Redis database, including other workers' sessions.
    # Separate databases also isolate identical model IDs (VersionedModel, via the
    # channel layer used by sredis()) across test databases.
    if worker_id == 'master':
        yield
        return

    caches, channel_layers = build_worker_redis_settings(
        worker_id, settings.REDIS_URL, settings.CACHES, settings.CHANNEL_LAYERS
    )
    with override_settings(CACHES=caches, CHANNEL_LAYERS=channel_layers):
        # The cart view resolves its cache once at import time.
        from eventyay.presale.views import cart

        original = cart.widget_data_cache
        cart.widget_data_cache = django_caches['redis'] if 'redis' in caches else django_caches['default']
        try:
            yield
        finally:
            cart.widget_data_cache = original


@pytest.fixture
def allow_all_entitlements(monkeypatch):
    """Ignore installed plan plugins so tests do not depend on the organizer's plan."""
    monkeypatch.setattr(entitlements, 'entitlement_check', Signal())


@pytest.fixture
def user(db):
    """Create a regular test user."""
    return User.objects.create_user(
        email='testuser@example.com',
        password='testpass123',
        fullname='Test User',
        locale='en',
    )


@pytest.fixture
def staff_user(db):
    """Create a staff user with elevated permissions."""
    return User.objects.create_user(
        email='staff@example.com',
        password='staffpass123',
        fullname='Staff User',
        locale='en',
        is_staff=True,
    )


@pytest.fixture
def organizer(db):
    """Create a test organizer."""
    from eventyay.base.models import Organizer
    return Organizer.objects.create(
        name='Test Organizer',
        slug='testorg',
    )


@pytest.fixture
def event(db, organizer):
    """Create a test event with basic configuration."""
    from eventyay.base.models import Event
    now = timezone.now()
    return Event.objects.create(
        organizer=organizer,
        name='Test Event',
        slug='testevent',
        date_from=now + timedelta(days=30),
        date_to=now + timedelta(days=32),
        currency='USD',
        locale='en',
        is_public=True,
        live=True,
        email='test@example.com',
    )


@pytest.fixture
def room(db, event):
    """Create a test room for API throttling tests."""
    from django_scopes import scope

    from eventyay.base.models import Room

    with scope(event=event):
        return Room.objects.create(
            event=event,
            name='Test Room',
            description='A test room',
            position=1,
            capacity=50,
        )


@pytest.fixture
def team(db, organizer, user):
    """Create a team and add user as member."""
    from eventyay.base.models import Team
    team = Team.objects.create(
        organizer=organizer,
        name='Test Team',
        all_events=True,
        can_create_events=True,
        can_change_teams=True,
        can_manage_gift_cards=True,
        can_change_organizer_settings=True,
        can_change_event_settings=True,
        can_change_items=True,
        can_view_orders=True,
        can_change_orders=True,
        can_view_vouchers=True,
        can_change_vouchers=True,
    )
    team.members.add(user)
    return team


@pytest.fixture
def authenticated_client(client, user):
    """Return a client authenticated as regular user."""
    client.force_login(user)
    return client


@pytest.fixture
def staff_client(client, staff_user):
    """Return a client authenticated as staff user."""
    client.force_login(staff_user)
    return client


@pytest.fixture
def organizer_client(client, user, team):
    """Return a client authenticated as organizer team member."""
    client.force_login(user)
    return client
