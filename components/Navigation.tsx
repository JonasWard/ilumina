import logo from '/assets/icons/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitchLink from './LanguageSwitchLink';
import Link from './Link';

export const Navigation: React.FC<{ heading: string; links: { href: string; children: string }[] }> = ({ links }) => {
  const { t } = useTranslation(['navigation']);

  return (
    <div className="fixed top-0 w-[min(100vw,1200px)] mx-[max(0px,calc(50vw-600px))] left-0 p-2 flex flex-row items-center justify-between">
      <Link href="/">
        <img
          src={logo.src}
          alt="logo"
          className="max-h-[max(min(5svh,5svw),20px)] max-w-[max(min(20svh,20svw),80px)]"
        />
      </Link>
      <span className="text-sm flex flex-row items-center gap-2">
        {links.map((link) => (
          <Link href={link.href} children={link.children} key={link.href} />
        ))}
        {t('change-locale')}:
        <LanguageSwitchLink />
      </span>
    </div>
  );
};
