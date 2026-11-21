import logo from '/assets/icons/logo_ilumina.svg';
import { useTranslation } from 'next-i18next';
import LanguageSwitchLink from '../LanguageSwitchLink';
import Link from '../Link';

export const TopBar: React.FC<{ dark?: boolean; className?: string }> = ({ dark = false, className = '' }) => {
  const { t } = useTranslation('common');

  return (
    <div
      className={`flex flex-row items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+0.5rem)] ${className}`}
    >
      <Link href="/" aria-label={t('back-to-home')} className="flex items-center min-h-11">
        <img src={logo.src} alt="ilumina" className={`h-7 w-auto ${dark ? 'invert' : ''}`} />
      </Link>
      <LanguageSwitchLink className={dark ? 'border-white/30 text-white [&>option]:text-black' : 'border-black/20'} />
    </div>
  );
};
