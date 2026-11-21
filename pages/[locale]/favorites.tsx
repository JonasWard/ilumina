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
      <main className="w-[calc(min(100vw,1200px)-50px)] mx-auto">
        <div className="mt-[65px] w-[calc(min(100vw,1200px)-50px)] mx-auto">
          <p>{t('your-favorites')}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 p-8">
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
