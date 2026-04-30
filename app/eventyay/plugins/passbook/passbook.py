import logging
import tempfile
from collections import OrderedDict
from typing import Tuple

from django import forms
from django.contrib.staticfiles import finders
from django.core.files import File
from django.core.files.storage import default_storage
from django.core.validators import RegexValidator
from django.utils.formats import date_format
from django.utils.translation import gettext, gettext_lazy as _

from eventyay.base.models import OrderPosition
from eventyay.base.ticketoutput import BaseTicketOutput
from eventyay.control.forms import ClearableBasenameFileInput
from eventyay.multidomain.urlreverse import build_absolute_uri
from eventyay.plugins.passbook.forms import PNGImageField

logger = logging.getLogger(__name__)


class PassbookOutput(BaseTicketOutput):
    identifier = 'passbook'
    verbose_name = _('Passbook Tickets')
    download_button_icon = 'fa-mobile'
    download_button_text = _('Wallet/Passbook')
    multi_download_button_text = _('Download tickets (Wallet)')
    long_download_button_text = _('Download ticket (Wallet)')
    multi_download_enabled = False

    @property
    def settings_form_fields(self) -> dict:
        return OrderedDict(
            list(super().settings_form_fields.items())
            + [
                (
                    'selfscale',
                    forms.BooleanField(
                        label=_('I would like to scale the graphics myself'),
                        help_text=_(
                            'In some instances, the downscaling of graphics done by the Wallet-app is not '
                            'satisfactory. By checking this box, you can provide prescaled files in the correct '
                            'dimensions.'
                            '<br><br>'
                            'If you choose to do so, please only upload your pictures in the regular display size '
                            'and not the increased retina size.'
                        ),
                        required=False,
                    ),
                ),
                (
                    'icon',
                    PNGImageField(
                        label=_('Event icon'),
                        help_text='%s %s'
                        % (
                            _('Display size is {} x {} pixels.').format(29, 29),
                            _(
                                'We suggest an upload size of {} x {} pixels to support retina displays.'
                            ).format(87, 87),
                        ),
                        required=False,
                    ),
                ),
                (
                    'icon2x',
                    PNGImageField(
                        label=_('Event icon for Retina {}x displays').format(2),
                        help_text=_('Display size is {} x {} pixels.').format(58, 58),
                        widget=ClearableBasenameFileInput(
                            attrs={
                                'data-display-dependency': '#id_ticketoutput_passbook_selfscale',
                            }
                        ),
                        required=False,
                    ),
                ),
                (
                    'icon3x',
                    PNGImageField(
                        label=_('Event icon for Retina {}x displays').format(3),
                        help_text=_('Display size is {} x {} pixels.').format(87, 87),
                        widget=ClearableBasenameFileInput(
                            attrs={
                                'data-display-dependency': '#id_ticketoutput_passbook_selfscale',
                            }
                        ),
                        required=False,
                    ),
                ),
                (
                    'logo',
                    PNGImageField(
                        label=_('Event logo'),
                        help_text='%s %s'
                        % (
                            _('Display size is {} x {} pixels.').format(160, 50),
                            _(
                                'We suggest an upload size of {} x {} pixels to support retina displays.'
                            ).format(480, 150),
                        ),
                        required=False,
                    ),
                ),
                (
                    'logo2x',
                    PNGImageField(
                        label=_('Event logo for Retina {}x displays').format(2),
                        help_text=_('Display size is {} x {} pixels.').format(320, 100),
                        widget=ClearableBasenameFileInput(
                            attrs={
                                'data-display-dependency': '#id_ticketoutput_passbook_selfscale',
                            }
                        ),
                        required=False,
                    ),
                ),
                (
                    'logo3x',
                    PNGImageField(
                        label=_('Event logo for Retina {}x displays').format(3),
                        help_text=_('Display size is {} x {} pixels.').format(480, 150),
                        widget=ClearableBasenameFileInput(
                            attrs={
                                'data-display-dependency': '#id_ticketoutput_passbook_selfscale',
                            }
                        ),
                        required=False,
                    ),
                ),
                (
                    'background',
                    PNGImageField(
                        label=_('Pass background image'),
                        help_text='%s %s'
                        % (
                            _('Display size is {} x {} pixels.').format(180, 220),
                            _(
                                'We suggest an upload size of {} x {} pixels to support retina displays. '
                                'Please note: iOS Wallet seems to ignore custom text color and uses white text '
                                'if a background image is used. Please use a dark background '
                                'image to provide sufficient text contrast.'
                            ).format(540, 660),
                        ),
                        required=False,
                    ),
                ),
                (
                    'background2x',
                    PNGImageField(
                        label=_('Pass background image for Retina {}x displays').format(2),
                        help_text=_('Display size is {} x {} pixels.').format(360, 440),
                        widget=ClearableBasenameFileInput(
                            attrs={
                                'data-display-dependency': '#id_ticketoutput_passbook_selfscale',
                            }
                        ),
                        required=False,
                    ),
                ),
                (
                    'background3x',
                    PNGImageField(
                        label=_('Pass background image for Retina {}x displays').format(3),
                        help_text=_('Display size is {} x {} pixels.').format(540, 660),
                        widget=ClearableBasenameFileInput(
                            attrs={
                                'data-display-dependency': '#id_ticketoutput_passbook_selfscale',
                            }
                        ),
                        required=False,
                    ),
                ),
                (
                    'bg_color',
                    forms.CharField(
                        label=_('Background color'),
                        help_text=_(
                            'If you use a background image, the background color will have no effect.'
                        ),
                        validators=[
                            RegexValidator(
                                regex='^#[0-9a-fA-F]{6}$',
                                message=_(
                                    'Please enter the hexadecimal code of a color, e.g. #990000.'
                                ),
                            ),
                        ],
                        required=False,
                        widget=forms.TextInput(
                            attrs={
                                'class': 'colorpickerfield no-contrast',
                                'placeholder': '#RRGGBB',
                            }
                        ),
                    ),
                ),
                (
                    'fg_color',
                    forms.CharField(
                        label=_('Text color'),
                        help_text=_(
                            'If you use a background image, iOS Wallet ignores the custom text color.'
                        ),
                        validators=[
                            RegexValidator(
                                regex='^#[0-9a-fA-F]{6}$',
                                message=_(
                                    'Please enter the hexadecimal code of a color, e.g. #990000.'
                                ),
                            ),
                        ],
                        required=False,
                        widget=forms.TextInput(
                            attrs={
                                'class': 'colorpickerfield no-contrast',
                                'placeholder': '#RRGGBB',
                            }
                        ),
                    ),
                ),
                (
                    'label_color',
                    forms.CharField(
                        label=_('Label color'),
                        validators=[
                            RegexValidator(
                                regex='^#[0-9a-fA-F]{6}$',
                                message=_(
                                    'Please enter the hexadecimal code of a color, e.g. #990000.'
                                ),
                            ),
                        ],
                        required=False,
                        widget=forms.TextInput(
                            attrs={
                                'class': 'colorpickerfield no-contrast',
                                'placeholder': '#RRGGBB',
                            }
                        ),
                    ),
                ),
                (
                    'latitude',
                    forms.FloatField(
                        label=_('Event location (latitude)'),
                        help_text=_('Will be taken from event settings by default.'),
                        required=False,
                    ),
                ),
                (
                    'longitude',
                    forms.FloatField(
                        label=_('Event location (longitude)'),
                        help_text=_('Will be taken from event settings by default.'),
                        required=False,
                    ),
                ),
            ]
        )

    def _get_default_icon_path(self) -> str:
        path = finders.find('eventyay_passbook/icon.png')
        if path:
            return path
        return finders.find('common/img/logo.png')

    def _get_default_logo_path(self) -> str:
        path = finders.find('eventyay_passbook/logo.png')
        if path:
            return path
        return finders.find('common/img/logo.png')

    def generate_pass(self, order_position: OrderPosition):
        from wallet.models import Barcode, BarcodeFormat, EventTicket, Location, Pass

        order = order_position.order
        ev = order_position.subevent or order.event
        tz = order.event.timezone

        card = EventTicket()

        logo_file = self.event.settings.get('ticketoutput_passbook_logo')
        if logo_file:
            logo_text = None
            if order.event.has_subevents or ev.date_admission:
                if ev.date_admission:
                    card.addHeaderField(
                        'doorsAdmissionHeader',
                        date_format(ev.date_admission.astimezone(tz), 'SHORT_DATETIME_FORMAT'),
                        gettext('Admission time'),
                    )
                else:
                    card.addHeaderField(
                        'doorsAdmissionHeader',
                        ev.get_date_from_display(tz, short=True),
                        gettext('Begin'),
                    )
        else:
            logo_text = str(ev.name)
            if order.event.has_subevents:
                logo_text += f' ({ev.get_date_from_display(tz, short=True)})'

        card.addPrimaryField('eventName', str(ev.name), gettext('Event'))

        ticket = str(order_position.item.name)
        if order_position.variation:
            ticket += ' - ' + str(order_position.variation)

        card.addSecondaryField('ticket', ticket, gettext('Product'))

        if order_position.attendee_name:
            card.addAuxiliaryField('name', order_position.attendee_name, gettext('Attendee name'))

        if order_position.valid_from:
            card.addAuxiliaryField(
                'doorsOpen',
                date_format(order_position.valid_from.astimezone(tz), 'SHORT_DATETIME_FORMAT'),
                gettext('From'),
            )
        else:
            card.addAuxiliaryField(
                'doorsOpen',
                ev.get_date_from_display(tz, short=True),
                gettext('From'),
            )

        if order_position.valid_until:
            card.addAuxiliaryField(
                'doorsClose',
                date_format(order_position.valid_until.astimezone(tz), 'SHORT_DATETIME_FORMAT'),
                gettext('To'),
            )
        elif order.event.settings.show_date_to and ev.date_to:
            card.addAuxiliaryField(
                'doorsClose',
                ev.get_date_to_display(tz, short=True),
                gettext('To'),
            )

        if ev.date_admission:
            card.addBackField(
                'doorsAdmission',
                date_format(ev.date_admission.astimezone(tz), 'SHORT_DATETIME_FORMAT'),
                gettext('Admission time'),
            )

        if order_position.attendee_name:
            card.addBackField('name', order_position.attendee_name, gettext('Attendee name'))

        if order.email:
            card.addBackField('email', order.email, gettext('Ordered by'))

        card.addBackField('organizer', str(order.event.organizer), gettext('Organizer'))

        if order.event.settings.contact_mail:
            card.addBackField(
                'organizerContact',
                order.event.settings.contact_mail,
                gettext('Organizer contact'),
            )

        card.addBackField('orderCode', order.code, gettext('Order code'))
        card.addBackField(
            'purchaseDate',
            date_format(order.datetime.astimezone(tz), 'SHORT_DATETIME_FORMAT'),
            gettext('Purchase date'),
        )

        if order_position.subevent:
            card.addBackField(
                'website',
                build_absolute_uri(
                    order.event,
                    'presale:event.index',
                    {'subevent': order_position.subevent.pk},
                ),
                gettext('Website'),
            )
        else:
            card.addBackField(
                'website',
                build_absolute_uri(order.event, 'presale:event.index'),
                gettext('Website'),
            )

        passfile = Pass(
            card,
            passTypeIdentifier=order.event.settings.passbook_pass_type_id or '',
            organizationName=str(ev.name),
            teamIdentifier=order.event.settings.passbook_team_id or '',
        )

        passfile.serialNumber = '%s-%s-%s-%d' % (
            order.event.organizer.slug,
            order.event.slug,
            order.code,
            order_position.pk,
        )

        passfile.description = gettext('Ticket for {event} ({product})').format(
            event=ev.name, product=ticket
        )
        passfile.barcode = Barcode(message=order_position.secret, format=BarcodeFormat.QR)
        passfile.barcode.altText = order_position.secret

        date_from_local_time = ev.date_from.astimezone(tz)
        date_to_local_time = ev.date_to.astimezone(tz) if ev.date_to else None

        if (
            order_position.valid_until
            and order_position.valid_from
            and order_position.valid_from.astimezone(tz).date()
            != order_position.valid_until.astimezone(tz).date()
        ):
            # note: exprirationDate is a typo in the underlying wallet-library
            passfile.exprirationDate = order_position.valid_until.astimezone(tz).isoformat()
        elif order_position.valid_from:
            passfile.relevantDate = order_position.valid_from.astimezone(tz).isoformat()
            if order_position.valid_until:
                passfile.exprirationDate = order_position.valid_until.astimezone(tz).isoformat()
        elif (
            order.event.settings.show_date_to
            and date_to_local_time
            and date_to_local_time.date() != date_from_local_time.date()
        ):
            passfile.exprirationDate = date_to_local_time.isoformat()
        else:
            passfile.relevantDate = date_from_local_time.isoformat()

        # Location
        if self.event.settings.passbook_latitude and self.event.settings.passbook_longitude:
            passfile.locations = [
                Location(
                    self.event.settings.passbook_latitude,
                    self.event.settings.passbook_longitude,
                )
            ]
        elif (
            order_position.subevent
            and order_position.subevent.geo_lat
            and order_position.subevent.geo_lon
        ):
            passfile.locations = [
                Location(order_position.subevent.geo_lat, order_position.subevent.geo_lon)
            ]
        elif self.event.geo_lat and self.event.geo_lon:
            passfile.locations = [Location(self.event.geo_lat, self.event.geo_lon)]

        # Icon
        icon_file = self.event.settings.get('ticketoutput_passbook_icon')
        if icon_file:
            passfile.addFile('icon.png', default_storage.open(icon_file.name, 'rb'))
        else:
            default_icon = self._get_default_icon_path()
            if default_icon:
                passfile.addFile('icon.png', open(default_icon, 'rb'))

        # Logo
        if logo_file:
            passfile.addFile('logo.png', default_storage.open(logo_file.name, 'rb'))
        else:
            default_logo = self._get_default_logo_path()
            if default_logo:
                passfile.addFile('logo.png', open(default_logo, 'rb'))
        passfile.logoText = logo_text

        # Background
        bg_file = self.event.settings.get('ticketoutput_passbook_background')
        if bg_file:
            passfile.addFile('background.png', default_storage.open(bg_file.name, 'rb'))

        # Retina images (when self-scaling is enabled)
        if self.event.settings.get('ticketoutput_passbook_selfscale'):
            retina_files = {
                'icon@2x.png': 'ticketoutput_passbook_icon2x',
                'icon@3x.png': 'ticketoutput_passbook_icon3x',
                'logo@2x.png': 'ticketoutput_passbook_logo2x',
                'logo@3x.png': 'ticketoutput_passbook_logo3x',
                'background@2x.png': 'ticketoutput_passbook_background2x',
                'background@3x.png': 'ticketoutput_passbook_background3x',
            }
            for filename, setting_key in retina_files.items():
                f = self.event.settings.get(setting_key)
                if f:
                    passfile.addFile(filename, default_storage.open(f.name, 'rb'))

        # Colors
        passfile.backgroundColor = self.event.settings.get('ticketoutput_passbook_bg_color')
        passfile.foregroundColor = self.event.settings.get('ticketoutput_passbook_fg_color')
        passfile.labelColor = self.event.settings.get('ticketoutput_passbook_label_color')

        return passfile

    def generate(self, position: OrderPosition) -> Tuple[str, str, str]:
        order = position.order
        passfile = self.generate_pass(position)
        filename = '%s-%s.pkpass' % (order.event.slug, order.code)

        with (
            tempfile.NamedTemporaryFile('w', encoding='utf-8') as keyfile,
            tempfile.NamedTemporaryFile('wb') as certfile,
            tempfile.NamedTemporaryFile('wb') as cafile,
        ):
            cert_setting = order.event.settings.get(
                'passbook_certificate_file', as_type=File, binary_file=True
            )
            if not cert_setting:
                raise ValueError(
                    gettext(
                        'Passbook certificate file is not configured. '
                        'Please configure it in the global settings.'
                    )
                )
            certfile.write(cert_setting.read())
            certfile.flush()

            ca_setting = order.event.settings.get(
                'passbook_wwdr_certificate_file', as_type=File, binary_file=True
            )
            if not ca_setting:
                raise ValueError(
                    gettext(
                        'Passbook WWDR CA certificate file is not configured. '
                        'Please configure it in the global settings.'
                    )
                )
            cafile.write(ca_setting.read())
            cafile.flush()

            key_value = order.event.settings.passbook_key
            if not key_value:
                raise ValueError(
                    gettext(
                        'Passbook secret key is not configured. '
                        'Please configure it in the global settings.'
                    )
                )
            keyfile.write(key_value)
            keyfile.flush()

            _pass = passfile.create(
                certfile.name,
                keyfile.name,
                cafile.name,
                order.event.settings.get('passbook_key_password', ''),
            )

        _pass.seek(0)
        return filename, 'application/vnd.apple.pkpass', _pass.read()
