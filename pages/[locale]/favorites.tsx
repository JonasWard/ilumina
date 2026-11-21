import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Footer } from '../../components/Footer';
import { ReactNode } from 'react';
import { LampCard } from '@/components/LampCard';
import { useLampStore } from '@/lib/store';
import { Navigation } from '@/components/Navigation';
import { Lamps } from '@/lib/lamps';

const Favorites: React.FC = () => {
  const { t } = useTranslation(['common', 'footer']);
  const liked = useLampStore((s) => s.liked);

  return (
    <>
      <Navigation />
      <main className="w-full max-w-[1200px] mx-auto justify-start px-4 pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <div className="w-full">
          <p>{t('your-favorites')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 sm:gap-8 pt-4">
            {[...liked].map((index) => (
              <LampCard key={index} index={index} img={Lamps[index].src} name={'name'} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorites;

const getStaticProps = makeStaticProps(['common', 'footer']);
export { getStaticPaths, getStaticProps };

// // or if you want to merge the i18n props with other props...
// export { getStaticPaths };
// export const getStaticProps = async (ctx: any) => {
//   // some data fetched from anywhere...
//   const someOtherData = 'hello world';
//   return {
//     props: {
//       ...(await getI18nProps(ctx, ['second-page', 'common', 'footer'])),
//       someOtherData
//     }
//   };
// };
