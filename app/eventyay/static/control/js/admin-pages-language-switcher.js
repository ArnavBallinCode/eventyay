/* Compact per-language editing for the admin Pages tabs.
 *
 * Each Pages tab renders every enabled page language as a stacked i18n widget.
 * This switcher shows a single language at a time and toggles the visibility of
 * the matching per-locale widgets in the surrounding form, so the form no longer
 * grows vertically with every language.  "Add language" enables an extra page
 * language by submitting the form with the additional locale.
 */
(() => {
    const normalize = (value) => String(value || '').toLowerCase();

    function collectUnits(form) {
        const units = [];
        form.querySelectorAll('.i18n-form-group').forEach((group) => {
            const wrappers = group.querySelectorAll('.i18n-textarea-wrapper[data-lang]');
            if (wrappers.length) {
                wrappers.forEach((wrapper) => {
                    units.push({ locale: normalize(wrapper.getAttribute('data-lang')), el: wrapper });
                });
            } else {
                group.querySelectorAll('[lang]').forEach((field) => {
                    units.push({ locale: normalize(field.getAttribute('lang')), el: field, field });
                });
            }
        });
        return units;
    }

    function unitHasContent(unit) {
        const field = unit.field || unit.el.querySelector('textarea, input');
        return field ? String(field.value || '').trim().length > 0 : false;
    }

    function initSwitcher(switcher) {
        const form = switcher.closest('form');
        if (!form) return;

        const pills = Array.from(switcher.querySelectorAll('.page-language-pill'));
        if (!pills.length) return;

        const units = collectUnits(form);

        const apply = (locale) => {
            units.forEach((unit) => {
                const visible = unit.locale === locale;
                unit.el.style.display = visible ? '' : 'none';
                if (visible) {
                    unit.el.removeAttribute('hidden');
                } else {
                    unit.el.setAttribute('hidden', '');
                }
            });
            pills.forEach((pill) => {
                pill.classList.toggle('active', normalize(pill.getAttribute('data-locale')) === locale);
            });
            refreshRemoveButtons();
        };

        const refreshIndicators = () => {
            const hasContent = {};
            units.forEach((unit) => {
                if (!(unit.locale in hasContent)) hasContent[unit.locale] = false;
                if (unitHasContent(unit)) hasContent[unit.locale] = true;
            });
            pills.forEach((pill) => {
                const locale = normalize(pill.getAttribute('data-locale'));
                pill.classList.toggle('has-content', Boolean(hasContent[locale]));
            });
        };

        const refreshRemoveButtons = () => {
            // Hide the remove button when only one language remains.
            const visiblePills = pills.filter((p) => !p.hidden);
            pills.forEach((pill) => {
                const btn = pill.querySelector('.page-language-pill-remove');
                if (btn) btn.style.display = visiblePills.length <= 1 ? 'none' : '';
            });
        };

        pills.forEach((pill) => {
            pill.addEventListener('click', (e) => {
                if (e.target.closest('.page-language-pill-remove')) return;
                apply(normalize(pill.getAttribute('data-locale')));
            });

            const removeBtn = document.createElement('span');
            removeBtn.className = 'page-language-pill-remove';
            removeBtn.setAttribute('role', 'button');
            removeBtn.setAttribute('aria-label', 'Remove language');
            removeBtn.title = 'Remove language';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const locale = normalize(pill.getAttribute('data-locale'));
                // Clear all field values for this locale before submitting.
                units.forEach((unit) => {
                    if (unit.locale !== locale) return;
                    const field = unit.field || unit.el.querySelector('textarea, input:not([type="hidden"])');
                    if (field) field.value = '';
                });
                // Tell the server to drop this locale by submitting all remaining locales.
                switcher.querySelectorAll('input[name="page_locales"]').forEach((el) => el.remove());
                pills.forEach((p) => {
                    if (normalize(p.getAttribute('data-locale')) === locale) return;
                    const inp = document.createElement('input');
                    inp.type = 'hidden';
                    inp.name = 'page_locales';
                    inp.value = normalize(p.getAttribute('data-locale'));
                    switcher.appendChild(inp);
                });
                form.submit();
            });
            pill.appendChild(removeBtn);
        });

        const addSelect = switcher.querySelector('.page-language-add');
        if (addSelect) {
            addSelect.addEventListener('change', () => {
                const locale = normalize(addSelect.value);
                if (!locale) return;
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'page_locales';
                input.value = locale;
                switcher.appendChild(input);
                form.submit();
            });
        }

        refreshIndicators();
        refreshRemoveButtons();
        form.addEventListener('input', refreshIndicators);
        apply(normalize(pills[0].getAttribute('data-locale')));
    }

    function init() {
        document.querySelectorAll('[data-page-language-switcher]').forEach(initSwitcher);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
