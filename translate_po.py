#!/usr/bin/env python3
"""
Translate untranslated entries in .po files to Arabic.
This script preserves placeholders, HTML tags, and technical terms.
"""

import polib
import re
import sys

# Comprehensive translation dictionary
TRANSLATIONS = {
    # Exact phrase translations
    "Full device access (reading and changing orders and gift cards, reading of products and settings)": "الوصول الكامل للجهاز (قراءة وتغيير الطلبات وبطاقات الهدايا، قراءة المنتجات والإعدادات)",
    "eventyay (kiosk mode, online only)": "eventyay (وضع الكشك، عبر الإنترنت فقط)",
    "{system} User": "مستخدم {system}",
    "Ask for a phone number per order": "اطلب رقم هاتف لكل طلب",
    "Require a phone number per order": "اجعل رقم الهاتف مطلوباً لكل طلب",
    "Show paid amount on partially paid invoices": "إظهار المبلغ المدفوع على الفواتير المدفوعة جزئياً",
    "in minutes": "بالدقائق",
    "Hide \"payment pending\" state on attendee-facing pages": "إخفاء حالة \"الدفع معلق\" على صفحات الحضور",
    "Automatically cancel and reissue invoice on address changes": "إلغاء وإعادة إصدار الفاتورة تلقائياً عند تغيير العنوان",
    "e.g. tax number in Germany, ABN in Australia, …": "مثل الرقم الضريبي في ألمانيا، ABN في أستراليا، ...",
    "Region": "المنطقة",
    
    # Common UI elements
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
    "Settings": "الإعدادات",
    "User": "المستخدم",
    "Users": "المستخدمون",
    "Event": "الحدث",
    "Events": "الأحداث",
    "Ticket": "التذكرة",
    "Tickets": "التذاكر",
    "Order": "الطلب",
    "Orders": "الطلبات",
    "Product": "المنتج",
    "Products": "المنتجات",
    "Price": "السعر",
    "Total": "الإجمالي",
    "Date": "التاريخ",
    "Time": "الوقت",
    "Status": "الحالة",
    "Active": "نشط",
    "Inactive": "غير نشط",
    "Enabled": "مفعّل",
    "Disabled": "معطّل",
    "Yes": "نعم",
    "No": "لا",
    "All": "الكل",
    "None": "لا شيء",
    "Other": "أخرى",
    "Optional": "اختياري",
    "Required": "مطلوب",
    "Description": "الوصف",
    "Details": "التفاصيل",
    "Add": "إضافة",
    "Remove": "إزالة",
    "Upload": "رفع",
    "Download": "تحميل",
    "Export": "تصدير",
    "Import": "استيراد",
    "Language": "اللغة",
    "Currency": "العملة",
    "Country": "البلد",
    "Address": "العنوان",
    "Phone": "الهاتف",
    "Website": "الموقع الإلكتروني",
    "Message": "الرسالة",
    "Error": "خطأ",
    "Warning": "تحذير",
    "Success": "نجاح",
    "Info": "معلومات",
    "Help": "مساعدة",
    "Documentation": "التوثيق",
    "Support": "الدعم",
    "Contact": "اتصل بنا",
    "About": "حول",
    "Terms": "الشروط",
    "Privacy": "الخصوصية",
    "Close": "إغلاق",
    "Back": "رجوع",
    "Next": "التالي",
    "Previous": "السابق",
    "Continue": "متابعة",
    "Confirm": "تأكيد",
    "Submit": "إرسال",
    "Send": "إرسال",
    "Loading": "جاري التحميل",
    "Please wait": "يرجى الانتظار",
    
    # Event management specific
    "Organizer": "المنظم",
    "Organizers": "المنظمون",
    "Attendee": "الحاضر",
    "Attendees": "الحاضرون",
    "Check-in": "تسجيل الحضور",
    "Checked in": "تم تسجيل الحضور",
    "Voucher": "القسيمة",
    "Vouchers": "القسائم",
    "Invoice": "الفاتورة",
    "Invoices": "الفواتير",
    "Payment": "الدفع",
    "Payments": "المدفوعات",
    "Refund": "استرداد",
    "Quota": "الحصة",
    "Quotas": "الحصص",
    "Category": "الفئة",
    "Categories": "الفئات",
    "Question": "السؤال",
    "Questions": "الأسئلة",
    "Answer": "الإجابة",
    "Answers": "الإجابات",
    "Gift card": "بطاقة الهدايا",
    "Gift cards": "بطاقات الهدايا",
    "Discount": "الخصم",
    "Tax": "الضريبة",
    "Fee": "الرسوم",
    "Shipping": "الشحن",
    "Billing": "الفوترة",
    "Checkout": "إتمام الطلب",
    "Cart": "السلة",
    "Available": "متاح",
    "Sold out": "نفدت الكمية",
    "Pending": "قيد الانتظار",
    "Confirmed": "مؤكد",
    "Cancelled": "ملغى",
    "Expired": "منتهي الصلاحية",
    "Paid": "مدفوع",
    "Unpaid": "غير مدفوع",
    "Free": "مجاني",
}

def translate_text(text):
    """
    Translate English text to Arabic while preserving technical elements.
    """
    if not text or not text.strip():
        return text
    
    # Check if already translated (contains Arabic)
    if any('\u0600' <= c <= '\u06FF' for c in text):
        return text
    
    # Direct translation if available
    if text in TRANSLATIONS:
        return TRANSLATIONS[text]
    
    # Try case-insensitive match
    for key, value in TRANSLATIONS.items():
        if text.lower() == key.lower():
            return value
    
    # For complex sentences, try to translate parts
    result = text
    
    # Common patterns in event management
    patterns = {
        r'^(Full device access) \((.*?)\)$': lambda m: f"{TRANSLATIONS.get(m.group(1), m.group(1))} ({translate_text(m.group(2))})",
        r'^(.*?) \(([^)]+)\)$': lambda m: f"{translate_text(m.group(1))} ({translate_text(m.group(2))})",
    }
    
    for pattern, handler in patterns.items():
        match = re.match(pattern, text)
        if match:
            try:
                return handler(match)
            except:
                pass
    
    # Simple word-by-word translation for common terms
    words = text.split()
    if len(words) <= 5:
        translated_words = []
        for word in words:
            # Remove trailing punctuation for lookup
            clean_word = word.rstrip('.,!?;:')
            punct = word[len(clean_word):]
            
            if clean_word in TRANSLATIONS:
                translated_words.append(TRANSLATIONS[clean_word] + punct)
            elif clean_word.lower() in [k.lower() for k in TRANSLATIONS.keys()]:
                # Case-insensitive lookup
                for k, v in TRANSLATIONS.items():
                    if k.lower() == clean_word.lower():
                        translated_words.append(v + punct)
                        break
            else:
                translated_words.append(word)
        
        # If we translated most words, use it
        translated_count = sum(1 for i, w in enumerate(translated_words) if w != words[i])
        if translated_count >= len(words) * 0.5:
            return ' '.join(translated_words)
    
    # Return original if we can't translate
    return text

def translate_po_file(filepath):
    """Translate untranslated entries in a .po file."""
    print(f"Loading {filepath}...")
    po = polib.pofile(filepath)
    
    total = len(po)
    untranslated = len(po.untranslated_entries())
    fuzzy = len(po.fuzzy_entries())
    
    print(f"Total entries: {total}")
    print(f"Untranslated: {untranslated}")
    print(f"Fuzzy: {fuzzy}")
    
    if untranslated == 0:
        print("No untranslated entries found!")
        return
    
    print(f"\nTranslating {untranslated} entries...")
    
    translated_count = 0
    for entry in po.untranslated_entries():
        if entry.msgid and entry.msgid.strip():
            # Translate the main string
            translation = translate_text(entry.msgid)
            
            # Only update if we got a translation
            if translation and translation != entry.msgid:
                entry.msgstr = translation
                translated_count += 1
                
                if translated_count <= 10:
                    print(f"  {entry.msgid[:50]}... -> {translation[:50]}...")
    
    if translated_count > 10:
        print(f"  ... and {translated_count - 10} more")
    
    print(f"\nTranslated {translated_count} entries")
    print(f"Saving to {filepath}...")
    po.save(filepath)
    print("Done!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python translate_po.py <po_file>")
        sys.exit(1)
    
    translate_po_file(sys.argv[1])
