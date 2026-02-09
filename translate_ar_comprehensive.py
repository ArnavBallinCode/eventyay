#!/usr/bin/env python3
"""
Comprehensive Arabic translation for event yay .po files.
Translates entries while preserving placeholders, HTML tags, and technical terms.
"""

import polib
import re
import sys


def has_arabic(text):
    """Check if text contains Arabic characters."""
    if not text:
        return False
    return any('\u0600' <= c <= '\u06FF' for c in text)


def get_comprehensive_translations():
    """Return comprehensive translation dictionary."""
    return {
        # Complex phrases
        "Full device access (reading and changing orders and gift cards, reading of products and settings)":
            "الوصول الكامل للجهاز (قراءة وتغيير الطلبات وبطاقات الهدايا، قراءة المنتجات والإعدادات)",
        "eventyay (kiosk mode, online only)": "eventyay (وضع الكشك، عبر الإنترنت فقط)",
        "{system} User": "مستخدم {system}",
        "Ask for a phone number per order": "اطلب رقم هاتف لكل طلب",
        "Require a phone number per order": "اجعل رقم الهاتف مطلوباً لكل طلب",
        
        # Invoice and billing
        "On invoices from one EU country to another EU country with a different currency, display the tax amount in both the foreign and your local currency.":
            "في الفواتير من دولة في الاتحاد الأوروبي إلى دولة أخرى في الاتحاد الأوروبي بعملة مختلفة، اعرض مبلغ الضريبة بكل من العملة الأجنبية وعملتك المحلية.",
        "If you want to add a custom text field, such as a country-specific registration number field, to the invoice address form, enter its label here.":
            "إذا كنت تريد إضافة حقل نصي مخصص، مثل حقل رقم التسجيل الخاص بالدولة، إلى نموذج عنوان الفاتورة، أدخل تسميته هنا.",
        "Show paid amount on partially paid invoices": "إظهار المبلغ المدفوع على الفواتير المدفوعة جزئياً",
        "If an invoice has already been paid partially, this option will add the paid and outstanding amounts to the invoice.":
            "إذا تم دفع الفاتورة جزئياً، سيضيف هذا الخيار المبالغ المدفوعة والمستحقة إلى الفاتورة.",
        "The expiration date will not be shown if the invoice is generated after the order has been paid.":
            "لن يتم عرض تاريخ انتهاء الصلاحية إذا تم إنشاء الفاتورة بعد دفع الطلب.",
        "The part of your invoice number after your prefix will be filled up with leading zeros up to this length.":
            "سيتم ملء الجزء من رقم الفاتورة بعد البادئة بأصفار في البداية حتى هذا الطول.",
        "The part of your invoice number after your prefix will be filled up with leading zeros to be at least this long.":
            "سيتم ملء الجزء من رقم الفاتورة بعد البادئة بأصفار في البداية ليكون بهذا الطول على الأقل.",
        "Automatically cancel and reissue invoice on address changes":
            "إلغاء وإعادة إصدار الفاتورة تلقائياً عند تغيير العنوان",
        "If attendees change their invoice address on an existing order, the invoice will automatically be canceled and a new one will be issued.":
            "إذا قام الحضور بتغيير عنوان الفاتورة على طلب موجود، سيتم إلغاء الفاتورة تلقائياً وإصدار فاتورة جديدة.",
        
        # Time and dates
        "in minutes": "بالدقائق",
        "If using days, the order will expire at the end of the last day. Using minutes is more exact, but should never be lower than 120.":
            "إذا استخدمت الأيام، سينتهي الطلب في نهاية اليوم الأخير. استخدام الدقائق أكثر دقة، لكن يجب ألا يقل عن 120.",
        "If disabled, no date or time will be shown on the ticket shop's front page. This settings does however not affect the calendar.":
            "إذا تم التعطيل، لن يتم عرض التاريخ أو الوقت على الصفحة الأمامية لمتجر التذاكر. هذا الإعداد لا يؤثر على التقويم.",
        "If your event series has more than 50 dates in the future, only the month or week calendar can be used, otherwise the shop might become very slow.":
            "إذا كانت سلسلة الأحداث لديك تحتوي على أكثر من 50 تاريخاً في المستقبل، فيمكن استخدام تقويم الشهر أو الأسبوع فقط، وإلا قد يصبح المتجر بطيئاً جداً.",
        
        # Payment and states
        "Hide \"payment pending\" state on attendee-facing pages":
            "إخفاء حالة \"الدفع معلق\" على صفحات الحضور",
        "The payment instructions panel will still be shown to the primary attendee, but other attendees will not see it.":
            "ستظل لوحة تعليمات الدفع معروضة للحاضر الأساسي، لكن الحضور الآخرين لن يروها.",
        
        # Regional settings
        "Region": "المنطقة",
        "Will be used to determine date and time formatting as well as default country for addresses.":
            "سيُستخدم لتحديد تنسيق التاريخ والوقت وكذلك البلد الافتراضي للعناوين.",
        "e.g. tax number in Germany, ABN in Australia, …":
            "مثل الرقم الضريبي في ألمانيا، ABN في أستراليا، ...",
        
        # UI and styling
        "Attach calendar files": "إرفاق ملفات التقويم",
        "Page background color": "لون خلفية الصفحة",
        "Scroll-over color": "لون التمرير",
        "Use round edges": "استخدام حواف مستديرة",
        "Social media image": "صورة وسائل التواصل الاجتماعي",
        "Banner text (top)": "نص اللافتة (أعلى)",
        "Banner text (bottom)": "نص اللافتة (أسفل)",
        "Help text of the email field": "نص المساعدة لحقل البريد الإلكتروني",
        "Privacy Policy URL": "رابط سياسة الخصوصية",
        "Page title": "عنوان الصفحة",
        "URL form": "نموذج الرابط",
        "Keep empty": "اتركه فارغاً",
        
        # Titles and salutations
        "Ms": "السيدة",
        "Mr": "السيد",
        "MA": "MA",
        
        # Layouts and formats
        "Simple with logo": "بسيط مع الشعار",
        "Valid and with value": "صالح وله قيمة",
        "Expired and with value": "منتهي الصلاحية وله قيمة",
        "4 landscape A6 pages on one A4 page": "4 صفحات A6 أفقية على صفحة A4 واحدة",
        
        # Terms and conditions
        "Special terms and conditions": "شروط وأحكام خاصة",
        
        # Location fields
        "Exit": "المخرج",
        "Gate": "البوابة",
        "Atlantis": "أتلانتس",
        "Sesame Street 42": "Sesame Street 42",
        
        # Contact information
        "Primary Contact Name": "اسم جهة الاتصال الأساسية",
        "Primary Contact Email": "بريد جهة الاتصال الأساسية",
        
        # Example patterns
        "e.g. {sample}": "مثال {sample}",
        "May be shown to the end user or used e.g. as part of a payment reference.":
            "قد يتم عرضه للمستخدم النهائي أو استخدامه كجزء من مرجع الدفع.",
        
        # Schedule and timing
        "Run at": "التشغيل في",
        "Updates to the {name} schedule.": "تحديثات على جدول {name}.",
        
        # Languages
        "Ukrainian": "الأوكرانية",
        "English": "الإنجليزية",
        "Arabic": "العربية",
        "German": "الألمانية",
        "French": "الفرنسية",
        "Spanish": "الإسبانية",
        "Italian": "الإيطالية",
        "Portuguese": "البرتغالية",
        "Russian": "الروسية",
        "Chinese": "الصينية",
        "Japanese": "اليابانية",
        
        # Email and communication
        "Send an email to speakers, authors, submitters, based on their proposal status and other filters.":
            "إرسال بريد إلكتروني إلى المتحدثين والمؤلفين ومقدمي المقترحات، بناءً على حالة مقترحاتهم ومرشحات أخرى.",
        
        # Common single/double words
        "Name": "الاسم",
        "Email": "البريد الإلكتروني",
        "Password": "كلمة المرور",
        "Login": "تسجيل الدخول",
        "Logout": "تسجيل الخروج",
        "Register": "تسجيل",
        "Save": "حفظ",
        "Cancel": "إلغاء",
        "Delete": "حذف",
        "Edit": "تعديل",
        "Create": "إنشاء",
        "Update": "تحديث",
        "Search": "بحث",
        "Filter": "تصفية",
        "Settings": "الإعدادات",
        "Configuration": "التكوين",
        "General": "عام",
        "Advanced": "متقدم",
        "User": "المستخدم",
        "Users": "المستخدمون",
        "Admin": "المدير",
        "Administrator": "المدير",
        "Staff": "الموظفون",
        "Member": "العضو",
        "Guest": "ضيف",
        "Event": "الحدث",
        "Events": "الأحداث",
        "Ticket": "التذكرة",
        "Tickets": "التذاكر",
        "Order": "الطلب",
        "Orders": "الطلبات",
        "Product": "المنتج",
        "Products": "المنتجات",
        "Item": "العنصر",
        "Items": "العناصر",
        "Addon": "الإضافة",
        "Add-on": "الإضافة",
        "Addons": "الإضافات",
        "Add-ons": "الإضافات",
        "Price": "السعر",
        "Total": "الإجمالي",
        "Subtotal": "المجموع الفرعي",
        "Amount": "المبلغ",
        "Currency": "العملة",
        "Tax": "الضريبة",
        "Fee": "الرسوم",
        "Discount": "الخصم",
        "Refund": "استرداد",
        "Payment": "الدفع",
        "Payments": "المدفوعات",
        "Invoice": "الفاتورة",
        "Invoices": "الفواتير",
        "Receipt": "الإيصال",
        "Billing": "الفوترة",
        "Shipping": "الشحن",
        "Status": "الحالة",
        "State": "الحالة",
        "Active": "نشط",
        "Inactive": "غير نشط",
        "Enabled": "مفعّل",
        "Disabled": "معطّل",
        "Available": "متاح",
        "Unavailable": "غير متاح",
        "Sold out": "نفدت الكمية",
        "Pending": "قيد الانتظار",
        "Confirmed": "مؤكد",
        "Cancelled": "ملغى",
        "Canceled": "ملغى",
        "Expired": "منتهي الصلاحية",
        "Paid": "مدفوع",
        "Unpaid": "غير مدفوع",
        "Free": "مجاني",
        "Refunded": "مُسترد",
        "Date": "التاريخ",
        "Time": "الوقت",
        "Start": "البداية",
        "End": "النهاية",
        "From": "من",
        "To": "إلى",
        "Until": "حتى",
        "Duration": "المدة",
        "Today": "اليوم",
        "Tomorrow": "غداً",
        "Yesterday": "أمس",
        "Yes": "نعم",
        "No": "لا",
        "True": "صحيح",
        "False": "خطأ",
        "All": "الكل",
        "None": "لا شيء",
        "Any": "أي",
        "Some": "بعض",
        "Other": "أخرى",
        "Multiple": "متعدد",
        "Optional": "اختياري",
        "Required": "مطلوب",
        "Mandatory": "إلزامي",
        "Description": "الوصف",
        "Details": "التفاصيل",
        "Summary": "الملخص",
        "Notes": "ملاحظات",
        "Comment": "تعليق",
        "Comments": "التعليقات",
        "Text": "النص",
        "Content": "المحتوى",
        "Add": "إضافة",
        "Remove": "إزالة",
        "Upload": "رفع",
        "Download": "تحميل",
        "Export": "تصدير",
        "Import": "استيراد",
        "Print": "طباعة",
        "Copy": "نسخ",
        "Duplicate": "تكرار",
        "Move": "نقل",
        "Rename": "إعادة تسمية",
        "Reset": "إعادة تعيين",
        "Refresh": "تحديث",
        "Reload": "إعادة تحميل",
        "Back": "رجوع",
        "Next": "التالي",
        "Previous": "السابق",
        "Continue": "متابعة",
        "Finish": "إنهاء",
        "Skip": "تخطي",
        "Close": "إغلاق",
        "Open": "فتح",
        "View": "عرض",
        "Show": "إظهار",
        "Hide": "إخفاء",
        "Confirm": "تأكيد",
        "Confirm deletion": "تأكيد الحذف",
        "Are you sure?": "هل أنت متأكد؟",
        "Submit": "إرسال",
        "Send": "إرسال",
        "Apply": "تطبيق",
        "OK": "موافق",
        "Ok": "موافق",
        "Loading": "جاري التحميل",
        "Please wait": "يرجى الانتظار",
        "Processing": "جاري المعالجة",
        "Saving": "جاري الحفظ",
        "Success": "نجاح",
        "Error": "خطأ",
        "Warning": "تحذير",
        "Info": "معلومات",
        "Notice": "إشعار",
        "Message": "الرسالة",
        "Language": "اللغة",
        "Country": "البلد",
        "City": "المدينة",
        "State": "الولاية",
        "Province": "المحافظة",
        "Address": "العنوان",
        "Street": "الشارع",
        "Postal code": "الرمز البريدي",
        "ZIP code": "الرمز البريدي",
        "Phone": "الهاتف",
        "Mobile": "الجوال",
        "Website": "الموقع الإلكتروني",
        "Company": "الشركة",
        "Organization": "المؤسسة",
        "Help": "مساعدة",
        "Documentation": "التوثيق",
        "Support": "الدعم",
        "FAQ": "الأسئلة الشائعة",
        "Contact": "اتصل بنا",
        "About": "حول",
        "Terms": "الشروط",
        "Terms and Conditions": "الشروط والأحكام",
        "Privacy": "الخصوصية",
        "Privacy Policy": "سياسة الخصوصية",
        "Legal": "قانوني",
        "Organizer": "المنظم",
        "Organizers": "المنظمون",
        "Attendee": "الحاضر",
        "Attendees": "الحاضرون",
        "Participant": "المشارك",
        "Participants": "المشاركون",
        "Speaker": "المتحدث",
        "Speakers": "المتحدثون",
        "Sponsor": "الراعي",
        "Sponsors": "الرعاة",
        "Check-in": "تسجيل الحضور",
        "Check in": "تسجيل الحضور",
        "Checked in": "تم تسجيل الحضور",
        "Check-out": "تسجيل المغادرة",
        "Check out": "تسجيل المغادرة",
        "Registration": "التسجيل",
        "Voucher": "القسيمة",
        "Vouchers": "القسائم",
        "Coupon": "القسيمة",
        "Coupons": "القسائم",
        "Gift card": "بطاقة الهدايا",
        "Gift cards": "بطاقات الهدايا",
        "Quota": "الحصة",
        "Quotas": "الحصص",
        "Capacity": "السعة",
        "Availability": "التوافر",
        "Seat": "المقعد",
        "Seats": "المقاعد",
        "Seating": "المقاعد",
        "Table": "الطاولة",
        "Tables": "الطاولات",
        "Venue": "المكان",
        "Location": "الموقع",
        "Room": "القاعة",
        "Hall": "القاعة",
        "Category": "الفئة",
        "Categories": "الفئات",
        "Type": "النوع",
        "Types": "الأنواع",
        "Group": "المجموعة",
        "Groups": "المجموعات",
        "Tag": "الوسم",
        "Tags": "الوسوم",
        "Label": "التسمية",
        "Labels": "التسميات",
        "Form": "النموذج",
        "Forms": "النماذج",
        "Field": "الحقل",
        "Fields": "الحقول",
        "Question": "السؤال",
        "Questions": "الأسئلة",
        "Answer": "الإجابة",
        "Answers": "الإجابات",
        "Option": "الخيار",
        "Options": "الخيارات",
        "Choice": "الاختيار",
        "Choices": "الاختيارات",
        "Select": "اختر",
        "Selection": "الاختيار",
        "Value": "القيمة",
        "Default": "افتراضي",
        "Report": "التقرير",
        "Reports": "التقارير",
        "Statistics": "الإحصائيات",
        "Analytics": "التحليلات",
        "Dashboard": "لوحة التحكم",
        "Overview": "نظرة عامة",
        "Chart": "الرسم البياني",
        "Graph": "الرسم البياني",
        "Notification": "الإشعار",
        "Notifications": "الإشعارات",
        "Alert": "تنبيه",
        "Alerts": "التنبيهات",
        "Reminder": "تذكير",
        "Reminders": "التذكيرات",
        "Checkout": "إتمام الطلب",
        "Cart": "السلة",
        "Shopping cart": "سلة التسوق",
        "Basket": "السلة",
        "File": "الملف",
        "Files": "الملفات",
        "Image": "الصورة",
        "Images": "الصور",
        "Photo": "الصورة",
        "Photos": "الصور",
        "Logo": "الشعار",
        "Icon": "الأيقونة",
        "Attachment": "المرفق",
        "Attachments": "المرفقات",
        "Permission": "الصلاحية",
        "Permissions": "الصلاحيات",
        "Access": "الوصول",
        "Role": "الدور",
        "Roles": "الأدوار",
        "Public": "عام",
        "Private": "خاص",
        "Restricted": "مقيد",
        "API": "API",
        "URL": "URL",
        "Link": "الرابط",
        "Code": "الرمز",
        "Key": "المفتاح",
        "Token": "الرمز المميز",
        "Secret": "السر",
        "Webhook": "webhook",
        "Plugin": "الإضافة",
        "Plugins": "الإضافات",
        "Extension": "الامتداد",
        "Extensions": "الامتدادات",
        "Integration": "التكامل",
        "Integrations": "التكاملات",
        "Version": "الإصدار",
        "Draft": "مسودة",
        "Published": "منشور",
        "Archive": "الأرشيف",
        "Archived": "مؤرشف",
        "Sort": "ترتيب",
        "Sort by": "ترتيب حسب",
        "Order by": "ترتيب حسب",
        "Ascending": "تصاعدي",
        "Descending": "تنازلي",
        "Latest": "الأحدث",
        "Newest": "الأحدث",
        "Oldest": "الأقدم",
        "Page": "الصفحة",
        "Per page": "لكل صفحة",
        "Results": "النتائج",
        "Showing": "عرض",
        "of": "من",
        "No results": "لا توجد نتائج",
        "No data": "لا توجد بيانات",
        "Not found": "غير موجود",
        "Empty": "فارغ",
        "Valid": "صالح",
        "Invalid": "غير صالح",
        "Validation": "التحقق",
        "Validate": "تحقق",
        "Billing Validation": "التحقق من الفوترة",
        "date": "التاريخ",
        "time": "الوقت",
    }


def translate_string(msgid, translations):
    """Translate a string using the dictionary."""
    if not msgid or not msgid.strip():
        return ""
    
    # Skip if already translated
    if has_arabic(msgid):
        return msgid
    
    # Try exact match first
    if msgid in translations:
        return translations[msgid]
    
    # Try case-insensitive match
    msgid_lower = msgid.lower()
    for key, value in translations.items():
        if key.lower() == msgid_lower:
            return value
    
    # For short strings, try word-by-word translation
    if len(msgid.split()) <= 3:
        words = msgid.split()
        translated_words = []
        
        for word in words:
            # Clean punctuation
            clean_word = word.strip('.,!?;:()[]{}"\'-')
            punct_before = word[:len(word) - len(word.lstrip('.,!?;:()[]{}"\'-'))]
            punct_after = word[len(clean_word) + len(punct_before):]
            
            # Try to find translation
            found = False
            for key, value in translations.items():
                if key.lower() == clean_word.lower():
                    translated_words.append(punct_before + value + punct_after)
                    found = True
                    break
            
            if not found:
                translated_words.append(word)
        
        # Check if we translated most words
        translated_count = sum(1 for i, w in enumerate(translated_words) if w != words[i])
        if translated_count >= len(words) * 0.7:
            return ' '.join(translated_words)
    
    return ""


def translate_po_file(filepath, dry_run=False):
    """Translate untranslated entries in a .po file."""
    print(f"Loading {filepath}...")
    po = polib.pofile(filepath)
    
    translations = get_comprehensive_translations()
    
    total = len(po)
    untranslated_before = len(po.untranslated_entries())
    fuzzy = len(po.fuzzy_entries())
    
    print(f"Total entries: {total}")
    print(f"Untranslated: {untranslated_before}")
    print(f"Fuzzy: {fuzzy}")
    print(f"Translation dictionary size: {len(translations)}")
    
    if untranslated_before == 0:
        print("No untranslated entries found!")
        return 0
    
    print(f"\nTranslating {untranslated_before} entries...")
    
    translated_count = 0
    skipped_count = 0
    
    for entry in po.untranslated_entries():
        if entry.msgid and entry.msgid.strip():
            translation = translate_string(entry.msgid, translations)
            
            if translation and translation != entry.msgid:
                entry.msgstr = translation
                translated_count += 1
                
                if translated_count <= 20:
                    print(f"{translated_count}. {entry.msgid[:60]}")
                    print(f"   -> {translation[:60]}")
                elif translated_count % 100 == 0:
                    print(f"   ... {translated_count} translations so far ...")
            else:
                skipped_count += 1
    
    print(f"\n{'[DRY RUN] ' if dry_run else ''}Translated {translated_count} entries")
    print(f"Skipped {skipped_count} entries (no translation available)")
    
    if not dry_run and translated_count > 0:
        print(f"Saving to {filepath}...")
        po.save(filepath)
        
        # Verify
        po_verify = polib.pofile(filepath)
        untranslated_after = len(po_verify.untranslated_entries())
        print(f"Verification: {untranslated_before - untranslated_after} entries were translated")
        print(f"Remaining untranslated: {untranslated_after}")
        print("Done!")
    else:
        print("[DRY RUN] No changes were saved" if dry_run else "No changes made")
    
    return translated_count


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python translate_ar_comprehensive.py <po_file> [--dry-run]")
        sys.exit(1)
    
    filepath = sys.argv[1]
    dry_run = "--dry-run" in sys.argv
    
    count = translate_po_file(filepath, dry_run)
    sys.exit(0 if count > 0 else 1)
