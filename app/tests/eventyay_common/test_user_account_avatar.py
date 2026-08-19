import io
import pytest
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from eventyay.base.models import User


def create_test_image_file():
    file = io.BytesIO()
    image = Image.new('RGB', (200, 200), color='blue')
    image.save(file, 'PNG')
    file.seek(0)
    return SimpleUploadedFile('test_avatar.png', file.read(), content_type='image/png')


@pytest.mark.django_db
def test_user_account_settings_view_get(client):
    user = User.objects.create_user(email='avatar_test@example.com', password='password123')
    client.force_login(user)

    response = client.get(reverse('eventyay_common:account.general'))
    assert response.status_code == 200
    assert 'Profile picture' in response.content.decode('utf-8')
    assert 'name="avatar"' in response.content.decode('utf-8')


@pytest.mark.django_db
def test_user_account_avatar_upload(client):
    user = User.objects.create_user(email='avatar_upload@example.com', password='password123')
    client.force_login(user)

    image_file = create_test_image_file()

    response = client.post(
        reverse('eventyay_common:account.general'),
        {
            'fullname': 'Avatar Test User',
            'locale': 'en',
            'timezone': 'UTC',
            'avatar': image_file,
        },
        follow=True,
    )
    assert response.status_code == 200

    user.refresh_from_db()
    assert bool(user.avatar) is True
    assert user.get_avatar_url() != ''
    assert 'avatars/' in user.avatar.name


@pytest.mark.django_db
def test_user_account_clear_avatar(client):
    user = User.objects.create_user(email='avatar_clear@example.com', password='password123')
    client.force_login(user)

    # First upload an avatar
    image_file = create_test_image_file()
    client.post(
        reverse('eventyay_common:account.general'),
        {
            'fullname': 'Avatar Test User',
            'locale': 'en',
            'timezone': 'UTC',
            'avatar': image_file,
        },
    )
    user.refresh_from_db()
    assert bool(user.avatar) is True
    avatar_name = user.avatar.name
    avatar_storage = user.avatar.storage
    assert avatar_storage.exists(avatar_name)

    thumb_name = user.avatar_thumbnail.name if user.avatar_thumbnail else None
    thumb_storage = user.avatar_thumbnail.storage if user.avatar_thumbnail else None
    tiny_thumb_name = user.avatar_thumbnail_tiny.name if user.avatar_thumbnail_tiny else None
    tiny_thumb_storage = user.avatar_thumbnail_tiny.storage if user.avatar_thumbnail_tiny else None

    # Now clear the avatar
    response = client.post(
        reverse('eventyay_common:account.general'),
        {
            'fullname': 'Avatar Test User',
            'locale': 'en',
            'timezone': 'UTC',
            'clear_avatar': 'on',
        },
        follow=True,
    )
    assert response.status_code == 200

    user.refresh_from_db()
    assert bool(user.avatar) is False
    assert not user.avatar_thumbnail
    assert not user.avatar_thumbnail_tiny
    assert not avatar_storage.exists(avatar_name)
    if thumb_name and thumb_storage:
        assert not thumb_storage.exists(thumb_name)
    if tiny_thumb_name and tiny_thumb_storage:
        assert not tiny_thumb_storage.exists(tiny_thumb_name)


@pytest.mark.django_db
def test_user_account_avatar_and_clear_conflict(client):
    user = User.objects.create_user(email='avatar_conflict@example.com', password='password123')
    client.force_login(user)

    image_file = create_test_image_file()
    response = client.post(
        reverse('eventyay_common:account.general'),
        {
            'fullname': 'Avatar Test User',
            'locale': 'en',
            'timezone': 'UTC',
            'avatar': image_file,
            'clear_avatar': 'on',
        },
        follow=True,
    )
    assert response.status_code == 200
    assert 'Cannot upload a new profile picture and remove the existing one at the same time.' in response.content.decode('utf-8')


@pytest.mark.django_db
def test_user_account_clear_avatar_with_existing_avatar_no_conflict(client):
    user = User.objects.create_user(email='avatar_no_conflict@example.com', password='password123')
    client.force_login(user)

    # 1. Upload initial avatar
    image_file = create_test_image_file()
    client.post(
        reverse('eventyay_common:account.general'),
        {
            'fullname': 'Avatar Test User',
            'locale': 'en',
            'timezone': 'UTC',
            'avatar': image_file,
        },
        follow=True,
    )
    user.refresh_from_db()
    assert bool(user.avatar) is True

    # 2. Check clear_avatar without uploading a new file -> should succeed without conflict
    response = client.post(
        reverse('eventyay_common:account.general'),
        {
            'fullname': 'Avatar Test User',
            'locale': 'en',
            'timezone': 'UTC',
            'clear_avatar': 'on',
        },
        follow=True,
    )
    assert response.status_code == 200
    assert 'Cannot upload a new profile picture' not in response.content.decode('utf-8')
    user.refresh_from_db()
    assert bool(user.avatar) is False
