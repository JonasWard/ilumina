import { BASE_HREF } from '@/lib/config';
import { useRouter } from 'next/router';
import i18nextConfig from '../next-i18next.config';

const LanguageSwitchLink: React.FC = () => {
  const router = useRouter();
  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <select
      value={currentLocale}
      onChange={(e) => {
        const locale = e.target.value;
        const currentRelevantURL = router.asPath.replace(BASE_HREF !== '/' ? BASE_HREF + '/' : '/', '').split('/')[1];
        router.push((BASE_HREF === '/' ? BASE_HREF : BASE_HREF + '/') + locale + '/' + currentRelevantURL);
      }}
    >
      {i18nextConfig.i18n.locales.map((locale) => (
        <option style={{ fontSize: 'small' }} key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitchLink;
