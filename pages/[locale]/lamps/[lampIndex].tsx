import { useRouter } from 'next/router';
import { getStaticPathsWithAdditionalParams, makeStaticProps } from '../../../lib/getStatic';
import { useTranslation } from 'next-i18next';
import { Lamps } from '@/lib/lamps';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LampContentCard } from '@/components/LampContentCard';
import { navigateTo } from '@/lib/getCorrectHref';
import { canGoBackInApp } from '@/lib/history';

export const Lamp = () => {
  const { t } = useTranslation(['404', 'common', 'footer']);
  const router = useRouter();

  const { lampIndex } = router.query;
  const index = Number(lampIndex);

  return (
    <>
      <Navigation titleKey="name" />
      <main className="flex flex-col flex-1 items-center w-full max-w-[1200px] mx-auto px-4 pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-8">
        <div className="w-full">
          <button
            type="button"
            onClick={() =>
              canGoBackInApp() ? router.back() : router.push(navigateTo(router.asPath, 'favorites'))
            }
            className="flex items-center gap-1 min-h-11 m-0 mb-2 px-2 bg-transparent shadow-none font-semibold"
          >
            <span aria-hidden="true">←</span> {t('common:back')}
          </button>
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
