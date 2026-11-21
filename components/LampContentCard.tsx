import { Lamps } from '@/lib/lamps';
import { useTranslation } from 'next-i18next';
import { SVGIcon } from '@/components/SVGIcon';
import { useLampStore } from '@/lib/store';
import heart from '/assets/icons/heart.svg';
import brokenHeart from '/assets/icons/heart_broken.svg';
import cart from '/assets/icons/shopping_cart.svg';

const actionClass =
  'flex flex-row items-center justify-center gap-2 min-h-12 m-0 px-3 rounded-full border border-black shadow-none font-semibold leading-none';

export const LampContentCard: React.FC<{ index: number; img: string; name: string; description: string }> = ({
  index
}) => {
  const { t } = useTranslation('common');
  const isLiked = useLampStore((s) => s.liked.has(index));
  const isDisliked = useLampStore((s) => s.disliked.has(index));

  return (
    <div className="flex md:flex-row flex-col items-center rounded-2xl overflow-clip shadow-xl mx-auto gap-4">
      <img src={Lamps[index].src} alt="lamp" className="md:h-[50vh] w-full md:w-[50%] h-[50vh] object-cover" />
      <div className="my-auto px-4 flex flex-col items-start justify-between w-full gap-4 shadow-none">
        <h3 className="font-bold">{t('name')}</h3>
        <p className="text-left">{t('description')}</p>
        <div className="grid grid-cols-3 gap-2 w-full pb-4">
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
