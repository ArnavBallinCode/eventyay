import logging
import tempfile

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile, UploadedFile
from django.utils.translation import gettext_lazy as _

from eventyay.control.forms import ClearableBasenameFileInput

logger = logging.getLogger(__name__)


class PNGImageField:
    """A form field for PNG image uploads with automatic conversion."""

    def __new__(cls, **kwargs):
        from django import forms

        widget = kwargs.pop('widget', ClearableBasenameFileInput())
        field = forms.FileField(widget=widget, **kwargs)
        field._original_clean = field.clean

        def clean(value, *args, **inner_kwargs):
            value = field._original_clean(value, *args, **inner_kwargs)
            if isinstance(value, UploadedFile):
                try:
                    from PIL import Image
                except ImportError:
                    return value

                value.open('rb')
                value.seek(0)
                try:
                    with (
                        Image.open(value, formats=getattr(settings, 'PILLOW_FORMATS_IMAGE', None))
                        as im,
                        tempfile.NamedTemporaryFile('rb', suffix='.png') as tmpfile,
                    ):
                        im.save(tmpfile.name)
                        tmpfile.seek(0)
                        return SimpleUploadedFile('picture.png', tmpfile.read(), 'image/png')
                except IOError:
                    logger.exception('Could not convert image to PNG')
                    raise ValidationError(
                        _('The file you uploaded could not be converted to PNG format.')
                    )
            return value

        field.clean = clean
        return field
