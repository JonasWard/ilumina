import Head from 'next/head';
import icon from '/assets/icons/icon.svg';
import logo from '/assets/icons/logo_ilumina.svg';
import { useTranslation } from 'react-i18next';

export const Header: React.FC<{ heading: string; title: string; className?: string }> = ({ heading, title, className }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <link rel="icon" href={icon.src} />
        <title>{t(title)}</title>
      </Head>
      <img src={logo.src} alt="logo" className="max-w-[min(70vw,400px)] my-10" />
      <h1 className={className}>{t(heading)}</h1>
    </>
  );
};
