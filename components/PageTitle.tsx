import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import icon from '/assets/icons/icon.svg';

export const PageTitle: React.FC<{ titleKey?: string }> = ({ titleKey }) => {
  const { t } = useTranslation('common');
  const brand = t('title');

  return (
    <Head>
      <link rel="icon" href={icon.src} />
      <title>{titleKey ? `${t(titleKey)} · ${brand}` : brand}</title>
    </Head>
  );
};
