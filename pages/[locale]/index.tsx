import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Footer } from '../../components/Footer';
import { PageTitle } from '../../components/PageTitle';
import { Lamps } from '@/lib/lamps';
import logo from '/assets/icons/logo_ilumina.svg';

import Link from '../../components/Link';

const Homepage = () => {
  const { t } = useTranslation(['common', 'footer']);

  return (
    <>
      <PageTitle />
      <main className="flex flex-col flex-1 items-center justify-center gap-5 px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-8">
        <img src={logo.src} alt="ilumina" className="h-10 w-auto" />
        <img
          src={Lamps[0].src}
          alt={t('lamp-alt', { number: 1 })}
          className="w-full max-w-sm h-[38dvh] min-h-48 object-cover rounded-2xl shadow-xl"
        />
        <h1 className="m-0 text-3xl sm:text-5xl">{t('h1')}</h1>
        <Link
          href="/tinder-slides"
          className="grid place-items-center w-full max-w-sm min-h-12 rounded-full bg-black text-white font-semibold"
        >
          {t('to-lamp-swiping')}
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;

const getStaticProps = makeStaticProps(['common', 'footer']);
export { getStaticPaths, getStaticProps };
