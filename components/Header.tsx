import logo from '/assets/icons/logo_ilumina.svg';
import { useTranslation } from 'next-i18next';
import { PageTitle } from './PageTitle';

export const Header: React.FC<{ heading: string; title: string; className?: string }> = ({ heading, title, className }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <PageTitle titleKey={title === 'title' ? undefined : title} />
      <img src={logo.src} alt="logo" className="max-w-[min(70vw,400px)] my-10" />
      <h1 className={className}>{t(heading)}</h1>
    </>
  );
};
