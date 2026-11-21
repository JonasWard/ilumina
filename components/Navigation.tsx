import logo from '/assets/icons/logo_ilumina.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitchLink from './LanguageSwitchLink';
import Link from './Link';

export const Navigation: React.FC<{
  heading: string;
  links: { href: string; text: string; icon?: React.ReactNode }[];
}> = ({ links }) => {
  const { t } = useTranslation('common');

  return (
    <div className="fixed inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-linear-to-b from-white to-transparent">
      <div className="max-w-[1200px] mx-auto px-3 py-1 flex flex-row items-center justify-between gap-2">
        <Link href="/" className="flex items-center min-h-11 shrink-0">
          <img src={logo.src} alt="logo" className="h-6 w-auto" />
        </Link>
        <span className="flex flex-row items-center gap-1">
          {links.map((link) => (
            <Link
              href={link.href}
              children={link.icon ? link.icon : t(link.text)}
              tooltip={link.icon ? t(link.text) : undefined}
              key={link.href}
              className="grid place-items-center size-11 shrink-0 rounded-full"
            />
          ))}
          <LanguageSwitchLink />
        </span>
      </div>
    </div>
  );
};
