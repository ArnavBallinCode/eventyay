#!/usr/bin/env python3
"""
Comprehensive Arabic translation for eventyay .po files.
Translates untranslated entries while preserving placeholders and technical terms.
"""

import polib
import re
import sys

def has_arabic(text):
    """Check if text contains Arabic characters."""
    return any('\u0600' <= c <= '\u06FF' for c in text)

def preserve_placeholders(text, translation):
    """Ensure all placeholders from original text are in translation."""
    # Find all placeholders
    placeholders = re.findall(r'(\{[^}]+\}|%\([^)]+\)s|%s|%d|%\d+\$s|<[^>]+>)', text)
    
    # Check if all placeholders are in translation
    for placeholder in placeholders:
        if placeholder not in translation:
            # Try to add it at the end if missing
            translation = translation + " " + placeholder
    
    return translation

def translate_string(msgid):
    """
    Translate English string to Arabic.
    This function provides contextually appropriate translations for event management platform.
    """
    
    if not msgid or not msgid.strip():
        return ""
    
    # Skip if already translated
    if has_arabic(msgid):
        return msgid
    
    # Dictionary of translations - comprehensive coverage
    translations = {
        # Device and access
        "Full device access (reading and changing orders and gift cards, reading of products and settings)": 
            "الوصول الكامل للجهاز (قراءة وتغيير الطلبات وبطاقات الهدايا، قراءة المنتجات والإعدادات)",
        "eventyay (kiosk mode, online only)": "eventyay (وضع الكشك، عبر الإنترنت فقط)",
        "{system} User": "مستخدم {system}",
        
        # Phone and contact
        "Ask for a phone number per order": "اطلب رقم هاتف لكل طلب",
        "Require a phone number per order": "اجعل رقم الهاتف مطلوباً لكل طلب",
        "Phone number": "رقم الهاتف",
        
        # Invoice related
        "On invoices from one EU country to another EU country with a different currency, you might need to show the exchange rate explicitly.":
            "في الفواتير من دولة في الاتحاد الأوروبي إلى دولة أخرى في الاتحاد الأوروبي بعملة مختلفة، قد تحتاج إلى إظهار سعر الصرف بشكل صريح.",
        "If you want to add a custom text field, such as a country-specific registration number field, to the invoice address form, enter its label here.":
            "إذا كنت تريد إضافة حقل نصي مخصص، مثل حقل رقم التسجيل الخاص بالدولة، إلى نموذج عنوان الفاتورة، أدخل تسميته هنا.",
        "Show paid amount on partially paid invoices": "إظهار المبلغ المدفوع على الفواتير المدفوعة جزئياً",
        "If an invoice has already been paid partially, this option will add the paid and outstanding amounts to the invoice.":
            "إذا تم دفع الفاتورة جزئياً، سيضيف هذا الخيار المبالغ المدفوعة والمستحقة إلى الفاتورة.",
        "The expiration date will not be shown if the invoice is generated after the order has been paid.":
            "لن يتم عرض تاريخ انتهاء الصلاحية إذا تم إنشاء الفاتورة بعد دفع الطلب.",
        "The part of your invoice number after your prefix will be filled up with leading zeros to be at least this long.":
            "سيتم ملء الجزء من رقم الفاتورة بعد البادئة بأصفار في البداية ليكون بهذا الطول على الأقل.",
        "Automatically cancel and reissue invoice on address changes": 
            "إلغاء وإعادة إصدار الفاتورة تلقائياً عند تغيير العنوان",
        "If attendees change their invoice address on an existing order, the invoice will automatically be canceled and a new one will be issued.":
            "إذا قام الحضور بتغيير عنوان الفاتورة على طلب موجود، سيتم إلغاء الفاتورة تلقائياً وإصدار فاتورة جديدة.",
        "e.g. tax number in Germany, ABN in Australia, …": 
            "مثل الرقم الضريبي في ألمانيا، ABN في أستراليا، ...",
        
        # Time and expiration
        "in minutes": "بالدقائق",
        "If using days, the order will expire at the end of the last day. Using minutes is more exact, but should never be lower than 120.":
            "إذا استخدمت الأيام، سينتهي الطلب في نهاية اليوم الأخير. استخدام الدقائق أكثر دقة، لكن يجب ألا يقل عن 120.",
        
        # Payment and states
        "Hide \"payment pending\" state on attendee-facing pages": 
            "إخفاء حالة \"الدفع معلق\" على صفحات الحضور",
        "The payment instructions panel will still be shown to the primary attendee, but other attendees will not see it.":
            "ستظل لوحة تعليمات الدفع معروضة للحاضر الأساسي، لكن الحضور الآخرين لن يروها.",
        
        # Regional and formatting
        "Region": "المنطقة",
        "Will be used to determine date and time formatting as well as default country for addresses.":
            "سيُستخدم لتحديد تنسيق التاريخ والوقت وكذلك البلد الافتراضي للعناوين.",
        
        # Single words - Common
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
        
        # Users and roles
        "User": "المستخدم",
        "Users": "المستخدمون",
        "Admin": "المدير",
        "Administrator": "المدير",
        "Staff": "الموظفون",
        "Member": "العضو",
        "Guest": "ضيف",
        
        # Events
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
        
        # Financial
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
        
        # Status
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
        
        # Time and date
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
        
        # Boolean
        "Yes": "نعم",
        "No": "لا",
        "True": "صحيح",
        "False": "خطأ",
        
        # Quantifiers
        "All": "الكل",
        "None": "لا شيء",
        "Any": "أي",
        "Some": "بعض",
        "Other": "أخرى",
        "Multiple": "متعدد",
        
        # Requirements
        "Optional": "اختياري",
        "Required": "مطلوب",
        "Mandatory": "إلزامي",
        
        # Content
        "Description": "الوصف",
        "Details": "التفاصيل",
        "Summary": "الملخص",
        "Notes": "ملاحظات",
        "Comment": "تعليق",
        "Comments": "التعليقات",
        "Text": "النص",
        "Content": "المحتوى",
        
        # Actions
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
        
        # Navigation
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
        
        # Confirmation
        "Confirm": "تأكيد",
        "Confirm deletion": "تأكيد الحذف",
        "Are you sure?": "هل أنت متأكد؟",
        "Submit": "إرسال",
        "Send": "إرسال",
        "Apply": "تطبيق",
        "OK": "موافق",
        
        # Messages
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
        
        # Contact and location
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
        
        # Help and support
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
        
        # Event management specific
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
        
        # Categories and types
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
        
        # Forms and data
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
        
        # Reports and analytics
        "Report": "التقرير",
        "Reports": "التقارير",
        "Statistics": "الإحصائيات",
        "Analytics": "التحليلات",
        "Dashboard": "لوحة التحكم",
        "Overview": "نظرة عامة",
        "Chart": "الرسم البياني",
        "Graph": "الرسم البياني",
        
        # Notifications
        "Notification": "الإشعار",
        "Notifications": "الإشعارات",
        "Alert": "تنبيه",
        "Alerts": "التنبيهات",
        "Reminder": "تذكير",
        "Reminders": "التذكيرات",
        
        # Cart and checkout
        "Checkout": "إتمام الطلب",
        "Cart": "السلة",
        "Shopping cart": "سلة التسوق",
        "Basket": "السلة",
        
        # Files and media
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
        
        # Permissions
        "Permission": "الصلاحية",
        "Permissions": "الصلاحيات",
        "Access": "الوصول",
        "Role": "الدور",
        "Roles": "الأدوار",
        "Public": "عام",
        "Private": "خاص",
        "Restricted": "مقيد",
        
        # API and technical
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
        
        # Versioning
        "Version": "الإصدار",
        "Draft": "مسودة",
        "Published": "منشور",
        "Archive": "الأرشيف",
        "Archived": "مؤرشف",
        
        # Sorting and filtering
        "Sort": "ترتيب",
        "Sort by": "ترتيب حسب",
        "Order by": "ترتيب حسب",
        "Ascending": "تصاعدي",
        "Descending": "تنازلي",
        "Latest": "الأحدث",
        "Newest": "الأحدث",
        "Oldest": "الأقدم",
        
        # Pagination
        "Page": "الصفحة",
        "Per page": "لكل صفحة",
        "Results": "النتائج",
        "Showing": "عرض",
        "of": "من",
        
        # Empty states
        "No results": "لا توجد نتائج",
        "No data": "لا توجد بيانات",
        "Not found": "غير موجود",
        "Empty": "فارغ",
        
        # Validation
        "Valid": "صالح",
        "Invalid": "غير صالح",
        "Validation": "التحقق",
        "Validate": "تحقق",
    }
    
    # Try exact match first
    if msgid in translations:
        return translations[msgid]
    
    # Try case-insensitive match
    msgid_lower = msgid.lower()
    for key, value in translations.items():
        if key.lower() == msgid_lower:
            return value
    
    # For very short strings that might be single words, try partial matching
    if len(msgid.split()) <= 3:
        words = msgid.split()
        translated_words = []
        all_translated = True
        
        for word in words:
            # Remove punctuation for lookup
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
                all_translated = False
        
        # Use translation if we translated most words
        if all_translated or (len(translated_words) > 0 and sum(1 for i, w in enumerate(translated_words) if w != words[i]) >= len(words) * 0.7):
            result = ' '.join(translated_words)
            # Preserve any placeholders
            return preserve_placeholders(msgid, result)
    
    # Return empty string for untranslatable items
    return ""

def translate_po_file(filepath, dry_run=False):
    """Translate untranslated entries in a .po file."""
    print(f"Loading {filepath}...")
    po = polib.pofile(filepath)
    
    total = len(po)
    untranslated_before = len(po.untranslated_entries())
    fuzzy = len(po.fuzzy_entries())
    
    print(f"Total entries: {total}")
    print(f"Untranslated: {untranslated_before}")
    print(f"Fuzzy: {fuzzy}")
    
    if untranslated_before == 0:
        print("No untranslated entries found!")
        return 0
    
    print(f"\nTranslating {untranslated_before} entries...")
    
    translated_count = 0
    skipped_count = 0
    
    for i, entry in enumerate(po.untranslated_entries()):
        if entry.msgid and entry.msgid.strip():
            # Translate the main string
            translation = translate_string(entry.msgid)
            
            # Only update if we got a translation
            if translation and translation != entry.msgid:
                entry.msgstr = translation
                translated_count += 1
                
                # Show first few translations
                if translated_count <= 20:
                    print(f"{translated_count}. {entry.msgid[:60]}")
                    print(f"   -> {translation[:60]}")
                elif translated_count % 50 == 0:
                    print(f"   ... {translated_count} translations so far ...")
            else:
                skipped_count += 1
    
    print(f"\n{'[DRY RUN] ' if dry_run else ''}Translated {translated_count} entries")
    print(f"Skipped {skipped_count} entries (no translation available)")
    
    if not dry_run:
        print(f"Saving to {filepath}...")
        po.save(filepath)
        
        # Verify
        po_verify = polib.pofile(filepath)
        untranslated_after = len(po_verify.untranslated_entries())
        print(f"Verification: {untranslated_before - untranslated_after} entries were translated")
        print(f"Remaining untranslated: {untranslated_after}")
        print("Done!")
    else:
        print("[DRY RUN] No changes were saved")
    
    return translated_count

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python translate_ar.py <po_file> [--dry-run]")
        sys.exit(1)
    
    filepath = sys.argv[1]
    dry_run = "--dry-run" in sys.argv
    
    translate_po_file(filepath, dry_run)
