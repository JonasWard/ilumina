import { useHydrateLampStore, useLampStore } from '../lib/store';
import { interpolate } from '../i18n/interpolate';
import type { LampPicture } from '../images/lampPicture';

export type FavoritesLabels = {
  unlike: string;
  buy: string;
  name: string;
  /** Template with `{{number}}`. */
  lampAlt: string;
  noFavorites: string;
  toLampSwiping: string;
};

const prefetched = new Set<string>();

/** Starts loading a detail page as soon as a finger or pointer lands on its card. */
const prefetch = (href: string) => {
  if (prefetched.has(href)) return;
  prefetched.add(href);
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

export const FavoritesGrid = ({
  lamps,
  labels,
  lampHref,
  swipeHref,
  icons
}: {
  lamps: LampPicture[];
  labels: FavoritesLabels;
  /** Detail page URL prefix; the lamp index and a slash are appended. */
  lampHref: string;
  swipeHref: string;
  icons: { heart: string; cart: string };
}) => {
  useHydrateLampStore();
  const liked = useLampStore((s) => s.liked);
  const hydrated = useLampStore((s) => s.hydrated);

  return (
    <>
      {hydrated && liked.size === 0 && (
        <div class="flex flex-col items-center gap-4 pt-8">
          <p class="m-0 max-w-72 opacity-70">{labels.noFavorites}</p>
          <a href={swipeHref} class="grid place-items-center min-h-12 px-6 rounded-full bg-black text-white font-semibold">
            {labels.toLampSwiping}
          </a>
        </div>
      )}
      <div class="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 sm:gap-8 pt-4">
        {[...liked].map((index) => (
          <div key={index} class="relative w-full rounded-2xl overflow-clip shadow-xl bg-white/60">
            <a
              href={`${lampHref}${index}/`}
              onPointerDown={() => prefetch(`${lampHref}${index}/`)}
              onMouseEnter={() => prefetch(`${lampHref}${index}/`)}
              class="block"
            >
              <picture class="contents [&>source]:hidden">
                {lamps[index].sources.map((source) => (
                  <source key={source.type} type={source.type} srcset={source.srcset} sizes={lamps[index].sizes} />
                ))}
                <img
                  src={lamps[index].src}
                  alt={interpolate(labels.lampAlt, { number: index + 1 })}
                  width={lamps[index].width}
                  height={lamps[index].height}
                  loading="lazy"
                  decoding="async"
                  class="w-full h-auto aspect-[3/4] object-cover"
                />
              </picture>
              <h3 class="m-0 px-11 py-3 text-base font-bold truncate">{labels.name}</h3>
            </a>
            <button
              type="button"
              aria-label={labels.unlike}
              onClick={() => useLampStore.getState().removeLiked(index)}
              class="absolute bottom-0 left-0 grid place-items-center size-11 m-0 p-0 bg-transparent shadow-none rounded-full"
            >
              <img src={icons.heart} alt="" class="h-4" />
            </button>
            <a
              href={`${lampHref}${index}/`}
              onPointerDown={() => prefetch(`${lampHref}${index}/`)}
              onMouseEnter={() => prefetch(`${lampHref}${index}/`)}
              aria-label={labels.buy}
              class="absolute bottom-0 right-0 grid place-items-center size-11"
            >
              <img src={icons.cart} alt="" class="h-4" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
