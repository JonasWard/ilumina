import { useTranslation } from 'next-i18next';
import Link from './Link';
import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import cart from '/assets/icons/shopping_cart.svg';

export const LampCard: React.FC<{ index: number; img: string; name: string }> = ({ index, img }) => {
  const { t } = useTranslation('common');

  return (
    <Link href={`/lamps/${index}`} className="block">
      <div className="flex flex-col items-center w-full rounded-2xl overflow-clip shadow-xl bg-white/60">
        <img src={img} alt="lamp" className="w-full aspect-[3/4] object-cover" />
        <div className="px-3 py-2 font-bold flex flex-row items-center justify-between w-full gap-2 shadow-none">
          <SVGIcon src={heart.src} className="h-4 my-auto" />
          <h3 className="m-0 text-base truncate">{t('name')}</h3>
          <SVGIcon src={cart.src} className="h-4 my-auto" />
        </div>
      </div>
    </Link>
  );
};
