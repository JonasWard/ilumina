import { Lamps } from '@/lib/lamps';
import { useTranslation } from 'react-i18next';

export const LampContentCard: React.FC<{ index: number; img: string; name: string; description: string }> = ({
  index,
  name,
  description
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex md:flex-row flex-col items-center w-[90%] rounded-2xl overflow-clip shadow-xl mx-auto gap-4">
      <img src={Lamps[index].src} alt="lamp" className="md:h-[50vh] w-full md:w-auto h-[40vh] object-cover" />
      <div className="my-auto px-4 font-bold flex flex-col items-start justify-between w-full gap-4 shadow-none">
        <h3>{t('name')}</h3>
        <p className="text-justify">{t('description')}</p>
        <div className="grid grid-cols-2 gap-4 md:gap-10 justify-between w-full pb-4">
          <span className="bg-white-700 text-black cursor-pointer p-2 shadow-xl border-1 rounded-2xl">
            💔 {t('dislike')}
          </span>
          <span className="bg-white-500 text-black cursor-pointer p-2 shadow-xl border-1 rounded-2xl">
            🛒 {t('buy')}
          </span>
        </div>
      </div>
    </div>
  );
};
