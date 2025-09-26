import { useTranslation } from 'react-i18next';
import Link from './Link';

export const LampCard: React.FC<{ index: number; img: string; name: string }> = ({ index, img }) => {
  const { t } = useTranslation('common');

  return (
    <Link href={`/lamps/${index}`}>
      <div className="flex flex-col items-center w-[200px] h-[300px] rounded-2xl overflow-clip shadow-xl">
        <img src={img} alt="lamp" className="w-[200px] h-[230px] object-cover" />
        <div className="my-auto px-4 font-bold flex flex-row justify-between w-full gap-2 shadow-none">
          <h3>🤍</h3>
          <h3>{t('name')}</h3>
          <h3>🛒</h3>
        </div>
      </div>
    </Link>
  );
};
