import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { Navigation } from '@/components/Navigation';

import { useRef, useState } from 'react';
import { TinderCard, TinderCardHandle } from '@/components/TinderCard';
import { useLampStore } from '@/lib/store';
import { Lamps } from '@/lib/lamps';
import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import brokenHeart from '/assets/icons/heart_broken.svg';

export const TinderSlides = () => {
  const { t } = useTranslation(['common']);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<TinderCardHandle>(null);

  const onLike = (index: number) => {
    useLampStore.getState().addLiked(index);
    setActiveIndex((prev) => prev + 1);
  };

  const onDislike = (index: number) => {
    useLampStore.getState().addDisliked(index);
    setActiveIndex((prev) => prev + 1);
  };

  const hasCard = Boolean(Lamps[activeIndex]);

  return (
    <>
      <Navigation />
      <main className="bg-white-900 w-full h-dvh flex flex-col items-center overflow-clip pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="relative flex-1 w-[min(85vw,600px)] max-h-[800px]">
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
          {hasCard ? (
            <TinderCard
              active
              ref={cardRef}
              key={activeIndex}
              url={Lamps[activeIndex].src}
              index={activeIndex}
              onLike={() => onLike(activeIndex)}
              onDislike={() => onDislike(activeIndex)}
              name={t('this-is-a-lamp')}
            />
          ) : null}
        </div>
        {hasCard && (
          <div className="flex flex-row gap-10 pt-4">
            <button
              type="button"
              aria-label={t('dislike')}
              onClick={() => cardRef.current?.swipe(false)}
              className="grid place-items-center size-16 m-0 p-0 rounded-full bg-white shadow-lg active:scale-95 transition-transform"
            >
              <SVGIcon src={brokenHeart.src} className="size-7" />
            </button>
            <button
              type="button"
              aria-label={t('like')}
              onClick={() => cardRef.current?.swipe(true)}
              className="grid place-items-center size-16 m-0 p-0 rounded-full bg-white shadow-lg active:scale-95 transition-transform"
            >
              <SVGIcon src={heart.src} className="size-7" />
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default TinderSlides;

const getStaticProps = makeStaticProps(['common', 'navigation']);
export { getStaticPaths, getStaticProps };
