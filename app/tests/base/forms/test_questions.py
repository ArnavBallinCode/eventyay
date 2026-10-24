from unittest.mock import Mock, patch
from django_countries.fields import Country
from eventyay.base.forms.questions import guess_country

def test_guess_country_from_event_region():
    event = Mock()
    event.settings.region = Country('US')
    event.settings.invoice_address_from_country = None

    country = guess_country(event)
    assert country == Country('US')

def test_guess_country_from_invoice_address():
    event = Mock()
    event.settings.region = None
    event.settings.invoice_address_from_country = Country('DE')

    country = guess_country(event)
    assert country == Country('DE')

@patch('eventyay.base.forms.questions.get_language_without_region')
def test_guess_country_from_locale(mock_get_language_without_region):
    event = Mock()
    event.settings.region = None
    event.settings.invoice_address_from_country = None

    test_cases = [
        ('en', 'US'),
        ('en-gb', 'GB'),
        ('de', 'DE'),
        ('de-formal', 'DE'),
        ('ar', 'EG'),
        ('pt-br', 'BR'),
        ('zh-hans', 'CN'),
        ('zh-hant', 'TW'),
        ('fr', 'FR'),
        ('es', 'ES'),
        ('sv', 'SE'),
        ('sl', 'SI'),
        ('cs', 'CZ'),
    ]

    for locale, expected_country_code in test_cases:
        mock_get_language_without_region.return_value = locale
        country = guess_country(event)
        assert country == Country(expected_country_code), f"Expected {expected_country_code} for locale {locale}, but got {country.code if hasattr(country, 'code') else country}"

@patch('eventyay.base.forms.questions.get_language_without_region')
def test_guess_country_from_locale_fallback(mock_get_language_without_region):
    event = Mock()
    event.settings.region = None
    event.settings.invoice_address_from_country = None

    # invalid/unknown locales but with fallback format
    mock_get_language_without_region.return_value = 'xx-xx'

    with patch('eventyay.base.forms.questions.Locale.parse', side_effect=Exception('Invalid locale')):
        country = guess_country(event)
        assert country is None # 'xx' isn't a valid country

    mock_get_language_without_region.return_value = 'xx-us'
    with patch('eventyay.base.forms.questions.Locale.parse', side_effect=Exception('Invalid locale')):
        country = guess_country(event)
        assert country == Country('US')
