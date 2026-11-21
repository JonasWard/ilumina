import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import Link from '../../components/Link';

const Homepage = () => {
  const { t } = useTranslation(['common', 'footer']);

  return (
    <>
      <main className="flex flex-col flex-1 items-center justify-center px-4">
        <Header heading={'h1'} title={'title'} />
        <div>
          <Link href="/tinder-slides" className="inline-grid place-items-center min-h-12 px-6 rounded-full bg-black text-white font-semibold">
            {t('to-lamp-swiping')}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;

const getStaticProps = makeStaticProps(['common', 'footer']);
export { getStaticPaths, getStaticProps };
