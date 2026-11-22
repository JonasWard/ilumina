import { createTranslator, LOCALES, type Locale, type Resources } from './core';

export * from './core';
export { interpolate } from './interpolate';

const files = import.meta.glob<Record<string, string>>('./locales/*/*.json', {
  eager: true,
  import: 'default'
});

const resources = Object.entries(files).reduce((all, [path, strings]) => {
  const [, locale, namespace] = path.match(/locales\/(\w+)\/([\w-]+)\.json$/)!;
  (all[locale as Locale] ??= {})[namespace] = strings;
  return all;
}, {} as Resources);

export const useTranslations = (locale: Locale, defaultNamespace = 'common') =>
  createTranslator(resources, locale, defaultNamespace);

/** Static paths for `src/pages/[locale]/…` routes. */
export const localeStaticPaths = () => LOCALES.map((locale) => ({ params: { locale } }));

/** Path inside the site for a locale, honouring Astro's `base`. `path` has no leading slash. */
export const localizedPath = (locale: Locale, path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/|\/$/g, '');
  return `${base}/${locale}/${clean ? clean + '/' : ''}`;
};
