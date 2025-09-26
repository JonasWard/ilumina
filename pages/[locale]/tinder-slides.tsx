import { useTranslation } from 'react-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { Navigation } from '@/components/Navigation';

import lamp_01 from '/assets/images/lamp-series/lamp_01.jpg';
import lamp_02 from '/assets/images/lamp-series/lamp_02.jpg';
import lamp_03 from '/assets/images/lamp-series/lamp_03.jpg';
import lamp_04 from '/assets/images/lamp-series/lamp_04.jpg';
import lamp_05 from '/assets/images/lamp-series/lamp_05.jpg';
import lamp_06 from '/assets/images/lamp-series/lamp_06.jpg';
import lamp_07 from '/assets/images/lamp-series/lamp_07.jpg';
import lamp_08 from '/assets/images/lamp-series/lamp_08.jpg';
import lamp_09 from '/assets/images/lamp-series/lamp_09.jpg';
import lamp_10 from '/assets/images/lamp-series/lamp_10.jpg';
import { useState } from 'react';
import { TinderCard } from '@/components/TinderCard';
import { useLampStore } from '@/lib/store';

const lamps = [lamp_01, lamp_02, lamp_03, lamp_04, lamp_05, lamp_06, lamp_07, lamp_08, lamp_09, lamp_10];

export const TinderSlides = () => {
  const { t } = useTranslation(['common']);
  const [activeIndex, setActiveIndex] = useState(0);

  const onLike = (index: number) => {
    useLampStore.getState().addLiked(lamps[index].src);
    setActiveIndex((prev) => prev + 1);
  };

  const onDislike = (index: number) => {
    useLampStore.getState().addDisliked(lamps[index].src);
    setActiveIndex((prev) => prev + 1);
  };

  console.log(activeIndex);

  return (
    <main className="bg-white-900 w-[100vw]">
      <Navigation
        heading={t('heading')}
        links={[
          { href: '/', children: t('back-to-home') },
          { href: 'favorites', children: t('to-favorites') }
        ]}
      />
      <div className="overflow-clip flex items-center justify-center touch-none w-[100vw] h-[100vh] mt-[calc(100svh-100vh)]">
        <div className="relative w-[min(85svw,600px)] h-[min(80svh,800px)]">
          {lamps[activeIndex + 1] ? (
            <TinderCard
              active={false}
              key={activeIndex + 1}
              url={lamps[activeIndex + 1].src}
              index={activeIndex + 1}
              onLike={() => onLike(activeIndex + 1)}
              onDislike={() => onDislike(activeIndex + 1)}
              name={t('this-is-a-lamp')}
            />
          ) : null}
          {lamps[activeIndex] ? (
            <TinderCard
              active
              key={activeIndex}
              url={lamps[activeIndex].src}
              index={activeIndex}
              onLike={() => onLike(activeIndex)}
              onDislike={() => onDislike(activeIndex)}
              name={t('this-is-a-lamp')}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default TinderSlides;

const getStaticProps = makeStaticProps(['common', 'navigation']);
export { getStaticPaths, getStaticProps };
