import { Lamps } from '@/lib/lamps';
import { useTranslation } from 'next-i18next';
import { SVGIcon } from '@/components/SVGIcon';
import { useLampStore } from '@/lib/store';
import heart from '/assets/icons/heart.svg';
import brokenHeart from '/assets/icons/heart_broken.svg';
import cart from '/assets/icons/shopping_cart.svg';

const actionClass =
  'flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-12 m-0 px-1 py-2 md:px-3 rounded-2xl md:rounded-full border border-black shadow-none text-sm md:text-base font-semibold leading-tight';

export const LampContentCard: React.FC<{ index: number; img: string; name: string; description: string }> = ({
  index
}) => {
  const { t } = useTranslation('common');
  const isLiked = useLampStore((s) => s.liked.has(index));
  const isDisliked = useLampStore((s) => s.disliked.has(index));

  return (
    <div className="flex md:flex-row flex-col items-center rounded-2xl overflow-clip shadow-xl mx-auto gap-4">
      <img src={Lamps[index].src} alt={t('lamp-alt', { number: index + 1 })} className="md:h-[50vh] w-full md:w-[50%] h-[50vh] object-cover" />
      <div className="my-auto px-4 flex flex-col items-start justify-between w-full gap-4 shadow-none">
        <h3 className="text-2xl font-bold">{t('name')}</h3>
        <p className="m-0 text-left">{t('description')}</p>
        <div className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-3 gap-2 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] bg-white/90 backdrop-blur border-t border-black/10 md:static md:w-full md:px-0 md:pt-0 md:pb-4 md:bg-transparent md:backdrop-blur-none md:border-0">
          <button
            type="button"
            aria-pressed={isDisliked}
            onClick={() => useLampStore.getState().toggleDislike(index)}
            className={`${actionClass} ${isDisliked ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            <SVGIcon src={brokenHeart.src} className={`h-4 ${isDisliked ? 'invert' : ''}`} /> {t('dislike')}
          </button>
          <button
            type="button"
            aria-pressed={isLiked}
            onClick={() => useLampStore.getState().toggleLike(index)}
            className={`${actionClass} ${isLiked ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            <SVGIcon src={heart.src} className={`h-4 ${isLiked ? 'invert' : ''}`} /> {t('like')}
          </button>
          <button type="button" className={`${actionClass} bg-white text-black`}>
            <SVGIcon src={cart.src} className="h-4" /> {t('buy')}
          </button>
        </div>
      </div>
    </div>
  );
};
