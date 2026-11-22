import { interpolate } from './interpolate';

export const LOCALES = ['en', 'de', 'dk', 'it', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** URL segment to BCP 47 language tag. `dk` is the country code; Danish is `da`. */
export const LANGUAGE_TAGS: Record<Locale, string> = { en: 'en', de: 'de', dk: 'da', it: 'it', fr: 'fr' };

export type Resources = Record<Locale, Record<string, Record<string, string>>>;

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale);

/**
 * Returns `t(key, vars)`. Keys are `namespace:key`, or a bare key in `defaultNamespace`.
 * Missing translations fall back to English; missing English keys throw so the build fails.
 */
export const createTranslator =
  (resources: Resources, locale: Locale, defaultNamespace = 'common') =>
  (key: string, vars?: Record<string, string | number>) => {
    const [namespace, name] = key.includes(':') ? key.split(':', 2) : [defaultNamespace, key];
    const value = resources[locale]?.[namespace]?.[name] ?? resources[DEFAULT_LOCALE]?.[namespace]?.[name];
    if (value === undefined) throw new Error(`Missing translation key "${namespace}:${name}"`);
    return interpolate(value, vars);
  };
