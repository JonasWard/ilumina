import { useHydrateLampStore, useLampStore } from '../lib/store';

const actionClass =
  'flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-12 m-0 px-1 py-2 md:px-3 rounded-2xl md:rounded-full border border-black shadow-none text-sm md:text-base font-semibold leading-tight';

export const DetailActions = ({
  index,
  labels,
  icons
}: {
  index: number;
  labels: { dislike: string; like: string; buy: string };
  icons: { heart: string; brokenHeart: string; cart: string };
}) => {
  useHydrateLampStore();
  const isLiked = useLampStore((s) => s.liked.has(index));
  const isDisliked = useLampStore((s) => s.disliked.has(index));

  return (
    <div class="fixed inset-x-0 bottom-0 z-10 grid grid-cols-3 gap-2 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] bg-white/90 backdrop-blur border-t border-black/10 md:static md:w-full md:px-0 md:pt-0 md:pb-4 md:bg-transparent md:backdrop-blur-none md:border-0">
      <button
        type="button"
        aria-pressed={isDisliked}
        onClick={() => useLampStore.getState().toggleDislike(index)}
        class={`${actionClass} ${isDisliked ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        <img src={icons.brokenHeart} alt="" class={`h-4 ${isDisliked ? 'invert' : ''}`} /> {labels.dislike}
      </button>
      <button
        type="button"
        aria-pressed={isLiked}
        onClick={() => useLampStore.getState().toggleLike(index)}
        class={`${actionClass} ${isLiked ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        <img src={icons.heart} alt="" class={`h-4 ${isLiked ? 'invert' : ''}`} /> {labels.like}
      </button>
      <button type="button" class={`${actionClass} bg-white text-black`}>
        <img src={icons.cart} alt="" class="h-4" /> {labels.buy}
      </button>
    </div>
  );
};
