import { useTranslation } from 'react-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { Navigation } from '@/components/Navigation';

import { useState } from 'react';
import { TinderCard } from '@/components/TinderCard';
import { useLampStore } from '@/lib/store';
import { Lamps } from '@/lib/lamps';

import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import cart from '/assets/icons/shopping_cart.svg';
import customize from '/assets/icons/customize.svg';
import burger from '/assets/icons/burger.svg';

export const TinderSlides = () => {
  const { t } = useTranslation(['common']);
  const [activeIndex, setActiveIndex] = useState(0);

  const onLike = (index: number) => {
    useLampStore.getState().addLiked(index);
    setActiveIndex((prev) => prev + 1);
  };

  const onDislike = (index: number) => {
    useLampStore.getState().addDisliked(index);
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <>
      <Navigation
        heading={t('heading')}
        links={[
          { href: 'tinder-slides', text: 'to-lamp-swiping', icon: <SVGIcon src={heart.src} className="size-6" /> },
          { href: 'tinder-slides', text: 'to-lamp-swiping', icon: <SVGIcon src={cart.src} className="size-6" /> },
          { href: 'favorites', text: 'to-favorites', icon: <SVGIcon src={customize.src} className="size-6" /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={burger.src} className="size-6" /> }
        ]}
      />
      <main className="bg-white-900 w-full">
        <div className="overflow-clip flex items-center justify-center touch-none w-full h-dvh">
          <div className="relative w-[min(85svw,600px)] h-[min(80svh,800px)]">
            {Lamps[activeIndex + 1] ? (
              <TinderCard
                active={false}
                key={activeIndex + 1}
                url={Lamps[activeIndex + 1].src}
                index={activeIndex + 1}
                onLike={() => onLike(activeIndex + 1)}
                onDislike={() => onDislike(activeIndex + 1)}
                name={t('this-is-a-lamp')}
              />
            ) : null}
            {Lamps[activeIndex] ? (
              <TinderCard
                active
                key={activeIndex}
                url={Lamps[activeIndex].src}
                index={activeIndex}
                onLike={() => onLike(activeIndex)}
                onDislike={() => onDislike(activeIndex)}
                name={t('this-is-a-lamp')}
              />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default TinderSlides;

const getStaticProps = makeStaticProps(['common', 'navigation']);
export { getStaticPaths, getStaticProps };
