import { useRouter } from 'next/router';
import { getStaticPathsWithAdditionalParams, makeStaticProps } from '../../../lib/getStatic';
import { useTranslation } from 'next-i18next';
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
      <Navigation />
      <main className="w-full max-w-[1200px] mx-auto justify-start px-4 pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-8">
        <div className="w-full">
          {Lamps[index] && (
            <LampContentCard index={index} img={Lamps[index].src} name={t('name')} description={t('description')} />
          )}
        </div>
      </main>
    </>
  );
};

export default Lamp;

const getStaticProps = makeStaticProps(['404', 'common', 'footer']);
const getStaticPaths = getStaticPathsWithAdditionalParams(Lamps.map((_, index) => ({ lampIndex: index.toString() })));

export { getStaticPaths, getStaticProps };
