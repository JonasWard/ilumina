import { Lamps } from '@/lib/lamps';
import { useTranslation } from 'react-i18next';
import { SVGIcon } from '@/components/SVGIcon';
import brokenHeart from '/assets/icons/heart_broken.svg';
import cart from '/assets/icons/shopping_cart.svg';

export const LampContentCard: React.FC<{ index: number; img: string; name: string; description: string }> = ({
  index,
  name,
  description
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex md:flex-row flex-col items-center rounded-2xl overflow-clip shadow-xl mx-auto gap-4">
      <img src={Lamps[index].src} alt="lamp" className="md:h-[50vh] w-full md:w-[50%] h-[50vh] object-cover" />
      <div className="my-auto px-4 font-bold flex flex-col items-start justify-between w-full gap-4 shadow-none">
        <h3>{t('name')}</h3>
        <p className="text-left">{t('description')}</p>
        <div className="grid grid-cols-2 gap-4 justify-between w-full pb-4">
          <span className="bg-white-700 text-black cursor-pointer p-2 shadow-xl border-1 rounded-2xl flex flex-row gap-2 justify-center">
            <SVGIcon src={brokenHeart.src} className="h-4 my-auto" /> {t('dislike')}
          </span>
          <span className="bg-white-500 text-black cursor-pointer p-2 shadow-xl border-1 rounded-2xl flex flex-row gap-2 justify-center">
            <SVGIcon src={cart.src} className="h-4 my-auto" /> {t('buy')}
          </span>
        </div>
      </div>
    </div>
  );
};
