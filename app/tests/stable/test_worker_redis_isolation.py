import pytest

from tests.stable.conftest import build_worker_redis_settings, get_worker_redis_db


CACHES = {
    'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'},
    'redis': {'BACKEND': 'django.core.cache.backends.redis.RedisCache', 'LOCATION': 'redis://localhost:6379/0'},
    'broken': {},
}
LAYERS = {'default': {'CONFIG': {'hosts': [{'address': 'redis://localhost:6379/0'}]}}}


def test_worker_db_mapping():
    assert get_worker_redis_db('gw0') == 4
    assert get_worker_redis_db('gw11') == 15


@pytest.mark.parametrize('bad_id', ['gw12', 'worker1', 'gw'])
def test_invalid_worker_ids_rejected(bad_id):
    with pytest.raises(pytest.UsageError):
        get_worker_redis_db(bad_id)


def test_worker_settings_use_assigned_db():
    caches, layers = build_worker_redis_settings('gw2', 'redis://localhost:6379/0', CACHES, LAYERS)
    assert caches['redis']['LOCATION'] == 'redis://localhost:6379/6'
    assert 'LOCATION' not in caches['default']
    assert layers['default']['CONFIG']['hosts'][0]['address'] == 'redis://localhost:6379/6'


def test_warns_without_redis_cache():
    with pytest.warns(UserWarning):
        build_worker_redis_settings('gw0', 'redis://localhost:6379/0', {'default': CACHES['default']}, LAYERS)
