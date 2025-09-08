import logo from '/assets/icons/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitchLink from './LanguageSwitchLink';
import { BASE_HREF } from '@/lib/config';

export const Navigation: React.FC<{ heading: string }> = ({ heading }) => {
  const { t } = useTranslation(['navigation']);

  return (
    <div className="fixed top-0 left-0 w-[100svw] my-2">
      <div className="w-[min(80vw,1200px)] mx-auto flex flex-row items-center justify-between">
        <img
          src={logo.src}
          alt="logo"
          className="max-h-[max(min(5svh,5svw),20px)]"
          onClick={() => (document.location.href = BASE_HREF)}
        />
        <span className="text-sm">
          {t('change-locale')}:
          <LanguageSwitchLink />
        </span>
      </div>
    </div>
  );
};
