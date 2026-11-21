import { useRouter } from 'next/router';
import i18nextConfig from '../next-i18next.config';
import { changeLocale } from '@/lib/getCorrectHref';

const LanguageSwitchLink: React.FC = () => {
  const router = useRouter();
  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <select
      className="h-11 min-w-11 px-2 text-base bg-transparent border border-gray-300 rounded-md"
      value={currentLocale}
      onChange={(e) => {
        const locale = e.target.value;
        router.push(changeLocale(router.asPath, locale));
      }}
    >
      {i18nextConfig.i18n.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitchLink;
