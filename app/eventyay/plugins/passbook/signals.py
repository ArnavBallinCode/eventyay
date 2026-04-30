import re
from collections import OrderedDict

from django import forms
from django.core.exceptions import ValidationError
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile, UploadedFile
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from eventyay.base.settings import settings_hierarkey
from eventyay.base.signals import register_global_settings, register_ticket_outputs
from eventyay.control.forms import ClearableBasenameFileInput


def validate_rsa_privkey(value: str):
    value = value.strip()
    if not value:
        return
    if not re.match(
        r'^-----BEGIN( (RSA |ENCRYPTED )?PRIVATE KEY-----).*-----END\1$', value, re.DOTALL
    ):
        raise ValidationError(
            _(
                'This does not look like an RSA private key in PEM format '
                '(it misses the correct begin or end signifiers)'
            ),
        )


class CertificateFileField(forms.FileField):
    widget = ClearableBasenameFileInput

    def clean(self, value, *args, **kwargs):
        import logging
        import subprocess

        logger = logging.getLogger(__name__)

        value = super().clean(value, *args, **kwargs)
        if isinstance(value, UploadedFile):
            value.open('rb')
            value.seek(0)
            content = value.read()
            if (
                content.startswith(b'-----BEGIN CERTIFICATE-----')
                and b'-----BEGIN CERTIFICATE-----' in content
            ):
                return SimpleUploadedFile('cert.pem', content, 'text/plain')

            openssl_cmd = ['openssl', 'x509', '-inform', 'DER', '-outform', 'PEM']
            process = subprocess.Popen(
                openssl_cmd,
                stderr=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stdin=subprocess.PIPE,
            )
            process.stdin.write(content)
            pem, error = process.communicate()
            if process.returncode != 0:
                logger.info('Trying to convert a DER to PEM failed: %s', error)
                raise ValidationError(
                    _('This does not look like a X509 certificate in either PEM or DER format'),
                )

            return SimpleUploadedFile('cert.pem', pem, 'text/plain')
        return value


@receiver(register_ticket_outputs, dispatch_uid='output_passbook')
def register_ticket_output(sender, **kwargs):
    from .passbook import PassbookOutput

    return PassbookOutput


@receiver(register_global_settings, dispatch_uid='passbook_global_settings')
def register_passbook_global_settings(sender, **kwargs):
    return OrderedDict(
        [
            (
                'passbook_team_id',
                forms.CharField(
                    label=_('Passbook team ID'),
                    help_text=_(
                        'Your Apple Developer Team ID. Found in your Apple Developer account '
                        'under Membership or when inspecting your passbook certificate.'
                    ),
                    required=False,
                ),
            ),
            (
                'passbook_pass_type_id',
                forms.CharField(
                    label=_('Passbook Pass Type ID'),
                    help_text=_(
                        'Your Pass Type Identifier, e.g. pass.com.yourorg.events. '
                        'Register one in your Apple Developer account under Certificates, '
                        'Identifiers & Profiles.'
                    ),
                    required=False,
                ),
            ),
            (
                'passbook_certificate_file',
                CertificateFileField(
                    label=_('Passbook certificate file'),
                    help_text=_(
                        'Upload the .pem certificate file for your Pass Type ID. '
                        'You can export it from Keychain Access after downloading it from Apple.'
                    ),
                    required=False,
                ),
            ),
            (
                'passbook_wwdr_certificate_file',
                CertificateFileField(
                    label=_('Passbook CA Certificate (WWDR)'),
                    help_text=_(
                        'Apple WWDR (WorldWide Developer Relations) intermediate certificate. '
                        'Download from https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer'
                    ),
                    required=False,
                ),
            ),
            (
                'passbook_key',
                forms.CharField(
                    label=_('Passbook secret key'),
                    help_text=_(
                        'The RSA private key in PEM format used to sign passes.'
                    ),
                    required=False,
                    widget=forms.Textarea,
                    validators=[validate_rsa_privkey],
                ),
            ),
            (
                'passbook_key_password',
                forms.CharField(
                    label=_('Passbook key password'),
                    widget=forms.PasswordInput(render_value=True),
                    required=False,
                    help_text=_(
                        'Optional, only necessary if the key entered above requires a password to use.'
                    ),
                ),
            ),
        ]
    )


# Register setting defaults
settings_hierarkey.add_default('passbook_certificate_file', None, File)
settings_hierarkey.add_default('passbook_wwdr_certificate_file', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_background', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_background2x', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_background3x', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_icon', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_icon2x', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_icon3x', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_logo', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_logo2x', None, File)
settings_hierarkey.add_default('ticketoutput_passbook_logo3x', None, File)
