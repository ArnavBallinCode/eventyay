from io import BytesIO

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

from eventyay.common.image import THUMBNAIL_SIZES, create_thumbnail


def _jpeg_upload(width=800, height=800):
    img = Image.new('RGB', (width, height), color='red')
    buf = BytesIO()
    img.save(buf, format='JPEG')
    buf.seek(0)
    return SimpleUploadedFile('avatar.jpg', buf.read(), content_type='image/jpeg')


@pytest.mark.django_db
def test_list_thumbnail_size_is_registered():
    assert THUMBNAIL_SIZES['list'] == (192, 192)


@pytest.mark.django_db
def test_list_thumbnail_is_webp_and_resized(user):
    user.avatar.save('avatar.jpg', _jpeg_upload(), save=True)

    thumbnail = create_thumbnail(user.avatar, 'list')

    assert thumbnail.name.endswith('.webp')
    with Image.open(thumbnail.path) as img:
        assert img.format == 'WEBP'
        assert max(img.size) <= 192

    user.refresh_from_db()
    assert user.avatar_thumbnail_list


@pytest.mark.django_db
def test_list_avatar_url_uses_list_thumbnail(user):
    user.avatar.save('avatar.jpg', _jpeg_upload(), save=True)

    url = user.get_avatar_url(thumbnail='list')

    assert '.webp' in url
