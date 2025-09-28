import { useTranslation } from 'react-i18next';
import Link from './Link';
import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import cart from '/assets/icons/shopping_cart.svg';

export const LampCard: React.FC<{ index: number; img: string; name: string }> = ({ index, img }) => {
  const { t } = useTranslation('common');

  return (
    <Link href={`/lamps/${index}`}>
      <div className="flex flex-col items-center w-[200px] h-[300px] rounded-2xl overflow-clip shadow-xl">
        <img src={img} alt="lamp" className="w-[200px] h-[230px] object-cover" />
        <div className="my-auto px-4 font-bold flex flex-row justify-between w-full gap-2 shadow-none">
          <SVGIcon src={heart.src} className="h-4 my-auto" />
          <h3>{t('name')}</h3>
          <SVGIcon src={cart.src} className="h-4 my-auto" />
        </div>
      </div>
    </Link>
  );
};
