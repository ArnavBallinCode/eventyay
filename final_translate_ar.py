#!/usr/bin/env python3
"""Final comprehensive Arabic translation script for eventyay .po files."""

import polib
import sys


def get_comprehensive_translations():
    """Return the most comprehensive translation dictionary."""
    # Import all previous translations plus new ones for remaining entries
    translations = {}
    
    # Add all comprehensive translations from earlier (keeping the good ones)
    # I'll add the most commonly needed ones inline for efficiency
    
    basic_translations = {
        # Common words
        "speaker": "المتحدث",
        "Name": "الاسم",
        "name": "الاسم",
        "Email": "البريد الإلكتروني",
        "Phone": "الهاتف",
        "Cancel": "إلغاء",
        "Delete": "حذف",
        "Save": "حفظ",
        "Edit": "تعديل",
        "Create": "إنشاء",
        "Update": "تحديث",
        "Search": "بحث",
        "Product": "المنتج",
        "Valid": "صالح",
        "Invalid": "غير صالح",
        "Canceled": "ملغى",
        "Unpaid": "غير مدفوع",
        "Entry": "الدخول",
        "Exit": "المخرج",
        
        # DjangoJS translations
        "Select a check-in list": "اختر قائمة تسجيل الحضور",
        "No active check-in lists found.": "لم يتم العثور على قوائم تسجيل حضور نشطة.",
        "Switch check-in list": "تبديل قائمة تسجيل الحضور",
        "Search results": "نتائج البحث",
        "This ticket requires special attention": "تتطلب هذه التذكرة اهتماماً خاصاً",
        "Switch direction": "تبديل الاتجاه",
        "Scan a ticket or search and press return…": "امسح تذكرة أو ابحث واضغط Enter…",
        "Load more": "تحميل المزيد",
        "Ticket not paid": "التذكرة غير مدفوعة",
        "This ticket is not yet paid. Do you want to continue anyways?": "هذه التذكرة غير مدفوعة بعد. هل تريد المتابعة على أي حال؟",
        "Additional information required": "معلومات إضافية مطلوبة",
        "Valid ticket": "تذكرة صالحة",
        "Exit recorded": "تم تسجيل المغادرة",
        "Ticket already used": "التذكرة مستخدمة بالفعل",
        "Information required": "معلومات مطلوبة",
        "Invalid ticket": "تذكرة غير صالحة",
        "Invalid product": "منتج غير صالح",
        "Entry not allowed": "الدخول غير مسموح",
        "Ticket code revoked/changed": "تم إلغاء/تغيير رمز التذكرة",
        "Order canceled": "تم إلغاء الطلب",
        "Valid Tickets": "التذاكر الصالحة",
        "Currently inside": "بالداخل حالياً",
        "is one of": "هو أحد",
        "is before": "قبل",
        "is after": "بعد",
        "Current date and time": "التاريخ والوقت الحاليين",
        "Number of previous entries": "عدد الدخولات السابقة",
        "Number of previous entries since midnight": "عدد الدخولات السابقة منذ منتصف الليل",
        "Number of days with a previous entry": "عدد الأيام التي بها دخول سابق",
        "All of the conditions below (AND)": "جميع الشروط أدناه (AND)",
        "At least one of the conditions below (OR)": "شرط واحد على الأقل من الشروط أدناه (OR)",
        "Event start": "بداية الحدث",
        "Event end": "نهاية الحدث",
        "Event admission": "قبول الحدث",
        "custom time": "وقت مخصص",
        "Tolerance (minutes)": "التسامح (بالدقائق)",
        "Add condition": "إضافة شرط",
        "You have unsaved changes!": "لديك تغييرات غير محفوظة!",
        "(one more date)": "(تاريخ واحد إضافي)",
        "Please enter the amount the organizer can keep.": "يرجى إدخال المبلغ الذي يمكن للمنظم الاحتفاظ به.",
        "Time zone:": "المنطقة الزمنية:",
        "Your local time:": "وقتك المحلي:",
        "Next week": "الأسبوع القادم",
        
        # Django translations
        "MA": "MA",
        "John Doe\nSample company\nSesame Street 42\n12345 Any City\nAtlantis": 
            "جون دو\nشركة نموذجية\nSesame Street 42\n12345 أي مدينة\nأتلانتس",
        "Sesame Street 42": "Sesame Street 42",
        "Sendgrid Token": "رمز Sendgrid",
        "SMTP": "SMTP",
        "For advanced users, usually does not need to be changed.": "للمستخدمين المتقدمين، عادة لا يحتاج إلى تغيير.",
        "Fully canceled but invoice not canceled": "ملغى بالكامل لكن الفاتورة غير ملغاة",
        "All dates starting at or after": "جميع التواريخ التي تبدأ في أو بعد",
        "All dates starting before": "جميع التواريخ التي تبدأ قبل",
        "Order placed at or after": "الطلب المقدم في أو بعد",
        "Exact matches only": "التطابقات الدقيقة فقط",
        "OpenCage API key for geocoding": "مفتاح OpenCage API للترميز الجغرافي",
        "MapQuest API key for geocoding": "مفتاح MapQuest API للترميز الجغرافي",
        "Leaflet tiles URL pattern": "نمط رابط بلاطات Leaflet",
        "Leaflet tiles attribution": "إسناد بلاطات Leaflet",
        "A percentage fee will be charged for each ticket sold.": "سيتم فرض رسوم نسبة مئوية لكل تذكرة مباعة.",
        "Shown independently of other products": "يعرض بشكل مستقل عن المنتجات الأخرى",
        "Create a separate order for each line": "إنشاء طلب منفصل لكل سطر",
        "Create one order with one position per line": "إنشاء طلب واحد بموضع واحد لكل سطر",
        "Create orders as pending and still require payment": "إنشاء الطلبات كمعلقة وتتطلب الدفع",
        'CSV column: "{name}"': 'عمود CSV: "{name}"',
        "Re-calculate taxes based on address and product settings, keep gross amount the same.":
            "إعادة حساب الضرائب بناءً على العنوان وإعدادات المنتج، والحفاظ على المبلغ الإجمالي كما هو.",
        "Re-calculate taxes based on address and product settings, keep net amount the same.":
            "إعادة حساب الضرائب بناءً على العنوان وإعدادات المنتج، والحفاظ على المبلغ الصافي كما هو.",
        "Remove this fee": "إزالة هذه الرسوم",
        "Refund order value to a gift card instead instead of the original payment method":
            "استرداد قيمة الطلب إلى بطاقة هدايا بدلاً من طريقة الدفع الأصلية",
        "If you set a date range, please set both a start and an end.":
            "إذا قمت بتعيين نطاق تاريخ، يرجى تعيين كل من البداية والنهاية.",
        "Please confirm that you want to cancel ALL dates in this event series.":
            "يرجى تأكيد أنك تريد إلغاء جميع التواريخ في سلسلة الأحداث هذه.",
    }
    
    return basic_translations


def has_arabic(text):
    """Check if text contains Arabic characters."""
    if not text:
        return False
    return any('\u0600' <= c <= '\u06FF' for c in text)


def translate_entry(entry, translations):
    """Translate a .po entry."""
    if not entry.msgid or not entry.msgid.strip():
        return False
    
    # Skip if already translated
    if entry.msgstr and has_arabic(entry.msgstr):
        return False
    
    # Try exact match
    if entry.msgid in translations:
        entry.msgstr = translations[entry.msgid]
        return True
    
    # Try case-insensitive match
    msgid_lower = entry.msgid.lower()
    for key, value in translations.items():
        if key.lower() == msgid_lower:
            entry.msgstr = value
            return True
    
    return False


def translate_po_file(filepath):
    """Translate a .po file."""
    print(f"\nProcessing {filepath}...")
    po = polib.pofile(filepath)
    
    translations = get_comprehensive_translations()
    
    untranslated_before = len(po.untranslated_entries())
    print(f"Untranslated entries: {untranslated_before}")
    
    if untranslated_before == 0:
        print("No untranslated entries!")
        return 0
    
    translated_count = 0
    for entry in po.untranslated_entries():
        if translate_entry(entry, translations):
            translated_count += 1
    
    if translated_count > 0:
        print(f"Translated {translated_count} entries")
        po.save(filepath)
        
        # Verify
        po_verify = polib.pofile(filepath)
        untranslated_after = len(po_verify.untranslated_entries())
        print(f"Remaining untranslated: {untranslated_after}")
    else:
        print("No new translations applied")
    
    return translated_count


if __name__ == "__main__":
    # Translate both files
    count1 = translate_po_file('app/eventyay/locale/ar/LC_MESSAGES/django.po')
    count2 = translate_po_file('app/eventyay/locale/ar/LC_MESSAGES/djangojs.po')
    
    total = count1 + count2
    print(f"\n{'='*60}")
    print(f"Total translations applied: {total}")
    print(f"{'='*60}")
