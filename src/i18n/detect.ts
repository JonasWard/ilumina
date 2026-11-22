import { DEFAULT_LOCALE, LOCALES } from './core';

/**
 * Inline script body that picks a locale and replaces the current page with `${base}${locale}/${suffix}`.
 * Order: saved choice, an existing locale prefix in the URL (when `usePathLocale`), browser languages, English.
 * Runs before any framework code, so it is plain ES5 and self-contained.
 */
export const localeRedirectScript = (base: string, suffix: string, usePathLocale = false) => `(function () {
  var locales = ${JSON.stringify(LOCALES)};
  var base = ${JSON.stringify(base)};
  function pick() {
    ${
      usePathLocale
        ? `var segment = location.pathname.slice(base.length).split('/')[0];
    if (locales.indexOf(segment) > -1) return segment;`
        : ''
    }
    try {
      var saved = localStorage.getItem('locale');
      if (locales.indexOf(saved) > -1) return saved;
    } catch (e) {}
    var preferred = navigator.languages || [navigator.language];
    for (var i = 0; i < preferred.length; i++) {
      var code = String(preferred[i] || '').toLowerCase().split('-')[0];
      if (code === 'da') code = 'dk';
      if (locales.indexOf(code) > -1) return code;
    }
    return ${JSON.stringify(DEFAULT_LOCALE)};
  }
  location.replace(base + pick() + '/' + ${JSON.stringify(suffix)});
})();`;
