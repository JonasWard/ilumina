import { useRouter } from 'next/router';
import { getStaticPathsWithAdditionalParams, makeStaticProps } from '../../../lib/getStatic';
import { useTranslation } from 'react-i18next';
import { Lamps } from '@/lib/lamps';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LampContentCard } from '@/components/LampContentCard';

export const Lamp = () => {
  const { t } = useTranslation(['404', 'common', 'footer']);
  const router = useRouter();

  const { lampIndex } = router.query;
  const index = Number(lampIndex);

  return (
    <>
      <Navigation
        heading={'heading'}
        links={[
          { href: '/', text: 'back-to-home', icon: <p className="text-2xl">🏠</p> },
          { href: 'tinder-slides', text: 'to-lamp-swiping', icon: <p className="text-2xl">🔄</p> }
        ]}
      />
      <main className="w-[calc(min(100vw,1200px)-50px)] mx-auto">
        <div className="mt-[65px] w-[calc(min(100vw,1200px)-50px)]">
          {Lamps[index] && (
            <LampContentCard index={index} img={Lamps[index].src} name={t('name')} description={t('description')} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Lamp;

const getStaticProps = makeStaticProps(['404', 'common', 'footer']);
const getStaticPaths = getStaticPathsWithAdditionalParams(Lamps.map((_, index) => ({ lampIndex: index.toString() })));

export { getStaticPaths, getStaticProps };
