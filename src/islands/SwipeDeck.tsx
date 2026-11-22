import { useEffect, useRef } from 'react';
import { TinderCard, type TinderCardHandle } from '../../components/TinderCard';
import { useHydrateLampStore, useLampStore } from '../../lib/store';
import { interpolate } from '../i18n/interpolate';
import type { LampPicture } from '../images/lampPicture';

export type SwipeDeckLabels = {
  like: string;
  dislike: string;
  caption: string;
  /** Template with `{{number}}`. */
  lampAlt: string;
  deckDone: string;
  /** Template with `{{count}}` and `{{total}}`. */
  likedCount: string;
  seeFavorites: string;
  startOver: string;
};

export const SwipeDeck = ({
  lamps,
  labels,
  favoritesHref,
  icons
}: {
  lamps: LampPicture[];
  labels: SwipeDeckLabels;
  favoritesHref: string;
  icons: { heart: string; brokenHeart: string };
}) => {
  useHydrateLampStore();
  const cardRef = useRef<TinderCardHandle>(null);
  const hydrated = useLampStore((s) => s.hydrated);
  const liked = useLampStore((s) => s.liked);
  const disliked = useLampStore((s) => s.disliked);

  const queue = hydrated ? lamps.map((_, i) => i).filter((i) => !liked.has(i) && !disliked.has(i)) : [];
  const [current, next] = queue;

  const onLike = (index: number) => useLampStore.getState().addLiked(index);
  const onDislike = (index: number) => useLampStore.getState().addDisliked(index);

  useEffect(() => {
    // Hands the deck over from the pre-hydration CSS (see tinder-slides.astro) to this component.
    if (hydrated) document.documentElement.dataset.deckLive = '';
  }, [hydrated]);

  const hasCard = current !== undefined;
  const card = (index: number, active: boolean, loading?: 'lazy') => (
    <TinderCard
      active={active}
      ref={active ? cardRef : undefined}
      key={index}
      url={lamps[index].src}
      sources={lamps[index].sources}
      sizes={lamps[index].sizes}
      alt={interpolate(labels.lampAlt, { number: index + 1 })}
      index={index}
      onLike={() => onLike(index)}
      onDislike={() => onDislike(index)}
      name={labels.caption}
      loading={loading}
    />
  );

  if (!hydrated) {
    // Before hydration every card is in the HTML; an inline script in <head> picks the one that is shown.
    return (
      <>
        <div data-deck class="relative flex-1 w-[min(85vw,600px)] max-h-[800px]">
          {lamps.map((_, i) => card(i, false, 'lazy'))}
        </div>
        <p class="m-0 pt-3 text-sm leading-none opacity-60">&nbsp;</p>
        <div data-deck-controls class="flex flex-row gap-10 pt-3">
          <button type="button" aria-label={labels.dislike} class="grid place-items-center size-16 m-0 p-0 rounded-full bg-white shadow-lg">
            <img src={icons.brokenHeart} alt="" class="size-7" />
          </button>
          <button type="button" aria-label={labels.like} class="grid place-items-center size-16 m-0 p-0 rounded-full bg-white shadow-lg">
            <img src={icons.heart} alt="" class="size-7" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div data-deck class="relative flex-1 w-[min(85vw,600px)] max-h-[800px]">
        {hasCard ? card(current, true) : null}
        {next !== undefined ? card(next, false) : null}
        {hydrated && !hasCard && (
          <div class="absolute inset-0 rounded-2xl bg-white shadow-lg flex flex-col items-center justify-center gap-4 p-6">
            <img src={icons.heart} alt="" class="size-12" />
            <h2 class="m-0 text-2xl">{labels.deckDone}</h2>
            <p class="m-0 opacity-70">{interpolate(labels.likedCount, { count: liked.size, total: lamps.length })}</p>
            <a
              href={favoritesHref}
              class="grid place-items-center min-h-12 w-full max-w-64 rounded-full bg-black text-white font-semibold"
            >
              {labels.seeFavorites}
            </a>
            <button
              type="button"
              onClick={() => useLampStore.getState().resetRatings()}
              class="min-h-12 w-full max-w-64 m-0 rounded-full bg-white border border-black shadow-none font-semibold"
            >
              {labels.startOver}
            </button>
          </div>
        )}
      </div>
      {hasCard && (
        <p aria-live="polite" class="m-0 pt-3 text-sm leading-none opacity-60">
          {lamps.length - queue.length + 1} / {lamps.length}
        </p>
      )}
      {hasCard && (
        <div class="flex flex-row gap-10 pt-3">
          <button
            type="button"
            aria-label={labels.dislike}
            onClick={() => cardRef.current?.swipe(false)}
            class="grid place-items-center size-16 m-0 p-0 rounded-full bg-white shadow-lg active:scale-95 transition-transform"
          >
            <img src={icons.brokenHeart} alt="" class="size-7" />
          </button>
          <button
            type="button"
            aria-label={labels.like}
            onClick={() => cardRef.current?.swipe(true)}
            class="grid place-items-center size-16 m-0 p-0 rounded-full bg-white shadow-lg active:scale-95 transition-transform"
          >
            <img src={icons.heart} alt="" class="size-7" />
          </button>
        </div>
      )}
    </>
  );
};
