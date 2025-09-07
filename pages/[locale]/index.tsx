import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import Link from '../../components/Link';

const Homepage = () => {
  const { t } = useTranslation(['common', 'footer']);

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          <Link href="/tinder-slides">
            <button type="button">{t('to-lamp-swiping')}</button>
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
