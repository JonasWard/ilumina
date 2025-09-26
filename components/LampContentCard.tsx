import { useTranslation } from 'react-i18next';

export const LampContentCard: React.FC<{ index: number; img: string; name: string; description: string }> = ({
  index,
  img,
  name,
  description
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-row items-center w-[min(90svw,900px)] h-[min(80svh,400px)] rounded-2xl overflow-clip shadow-xl">
      <img src={img} alt="lamp" className="w-auto h-full object-cover" />
      <div className="my-auto px-4 font-bold flex flex-col items-start justify-between w-full gap-2 shadow-none">
        <h3>{t('name')}</h3>
        <p>{t('description')}</p>
        <div className="flex flex-row gap-2">
          <button>🤍</button>
          <button>🛒</button>
        </div>
      </div>
    </div>
  );
};
