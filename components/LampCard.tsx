import { useTranslation } from 'next-i18next';
import Link from './Link';
import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import cart from '/assets/icons/shopping_cart.svg';

export const LampCard: React.FC<{ index: number; img: string; name: string }> = ({ index, img }) => {
  const { t } = useTranslation('common');

  return (
    <div className="relative w-full rounded-2xl overflow-clip shadow-xl bg-white/60">
      <Link href={`/lamps/${index}`} className="block">
        <img src={img} alt="lamp" className="w-full aspect-[3/4] object-cover" />
        <h3 className="m-0 px-11 py-3 text-base font-bold truncate">{t('name')}</h3>
      </Link>
      <span className="absolute bottom-0 left-0 grid place-items-center size-11 pointer-events-none">
        <SVGIcon src={heart.src} className="h-4" />
      </span>
      <Link
        href={`/lamps/${index}`}
        aria-label={t('buy')}
        className="absolute bottom-0 right-0 grid place-items-center size-11"
      >
        <SVGIcon src={cart.src} className="h-4" />
      </Link>
    </div>
  );
};
