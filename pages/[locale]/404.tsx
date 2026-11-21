import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import Link from '../../components/Link';

const Homepage = () => {
  const { t } = useTranslation(['404', 'common', 'footer']);

  return (
    <>
      <main className="flex flex-col flex-1 items-center justify-center px-4">
        <Header className="text-2xl sm:text-4xl" heading={'404:h1'} title={'404:title'} />
        <div>
          <Link href="/" className="inline-grid place-items-center min-h-12 px-6 rounded-full bg-black text-white font-semibold">
            {t('common:back-to-home')}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;

const getStaticProps = makeStaticProps(['404', 'common', 'footer']);
export { getStaticPaths, getStaticProps };
