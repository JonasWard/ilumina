import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { Navigation } from '@/components/Navigation';

import { useRef } from 'react';
import { TinderCard, TinderCardHandle } from '@/components/TinderCard';
import { useLampStore } from '@/lib/store';
import { Lamps } from '@/lib/lamps';
import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import brokenHeart from '/assets/icons/heart_broken.svg';

export const TinderSlides = () => {
  const { t } = useTranslation(['common']);
  const cardRef = useRef<TinderCardHandle>(null);
  const hydrated = useLampStore((s) => s.hydrated);
  const liked = useLampStore((s) => s.liked);
  const disliked = useLampStore((s) => s.disliked);

  const queue = hydrated ? Lamps.map((_, i) => i).filter((i) => !liked.has(i) && !disliked.has(i)) : [];
  const [current, next] = queue;

  const onLike = (index: number) => useLampStore.getState().addLiked(index);
  const onDislike = (index: number) => useLampStore.getState().addDisliked(index);

  const hasCard = current !== undefined;

  return (
    <>
      <Navigation />
      <main className="bg-white-900 w-full h-dvh flex flex-col items-center overflow-clip pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="relative flex-1 w-[min(85vw,600px)] max-h-[800px]">
          {next !== undefined ? (
            <TinderCard
              active={false}
              key={next}
              url={Lamps[next].src}
              index={next}
              onLike={() => onLike(next)}
              onDislike={() => onDislike(next)}
              name={t('this-is-a-lamp')}
            />
          ) : null}
          {hasCard ? (
            <TinderCard
              active
              ref={cardRef}
              key={current}
              url={Lamps[current].src}
              index={current}
              onLike={() => onLike(current)}
              onDislike={() => onDislike(current)}
              name={t('this-is-a-lamp')}
            />
          ) : null}
        </div>
        {hasCard && (
          <p aria-live="polite" className="m-0 pt-3 text-sm leading-none opacity-60">
            {Lamps.length - queue.length + 1} / {Lamps.length}
          </p>
        )}
        {hasCard && (
          <div className="flex flex-row gap-10 pt-3">
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
