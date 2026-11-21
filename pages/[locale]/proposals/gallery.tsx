import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { PageTitle } from '@/components/PageTitle';
import { TopBar } from '@/components/landing/TopBar';
import Link from '@/components/Link';
import { Lamps } from '@/lib/lamps';

const MarqueeRow: React.FC<{ lamps: number[]; reverse?: boolean }> = ({ lamps, reverse = false }) => {
  const { t } = useTranslation('common');

  return (
    <div className="overflow-clip [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex w-max gap-3 ${reverse ? 'motion-safe:animate-marquee-reverse' : 'motion-safe:animate-marquee'}`}
      >
        {[...lamps, ...lamps].map((i, k) => (
          <img
            key={k}
            src={Lamps[i].src}
            alt={k < lamps.length ? t('lamp-alt', { number: i + 1 }) : ''}
            aria-hidden={k >= lamps.length}
            loading={k < 4 ? 'eager' : 'lazy'}
            className="h-36 sm:h-56 w-auto aspect-[3/4] object-cover rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

const GalleryLanding = () => {
  const { t } = useTranslation(['landing', 'common']);

  return (
    <div className="min-h-dvh bg-[#f4f1ec] text-[#1d1b19] text-left flex flex-col">
      <PageTitle />
      <TopBar />

      <section className="flex flex-col gap-4 px-6 pt-8 pb-8 max-w-2xl">
        <p className="m-0 text-xs uppercase tracking-[0.3em] text-[#8a6f4e]">{t('eyebrow')}</p>
        <h1 className="m-0 text-[2.6rem] sm:text-7xl font-light leading-[1.05] tracking-tight">{t('gallery-title')}</h1>
        <p className="m-0 text-[#1d1b19]/70">{t('gallery-body')}</p>
        <Link
          href="/tinder-slides"
          className="grid place-items-center min-h-12 mt-2 sm:max-w-xs rounded-full bg-[#1d1b19] text-white font-semibold"
        >
          {t('cta-start')}
        </Link>
      </section>

      <section className="flex flex-col gap-3 pb-[calc(env(safe-area-inset-bottom)+3rem)]">
        <MarqueeRow lamps={[0, 1, 2, 3, 4]} />
        <MarqueeRow lamps={[5, 6, 7, 8, 9]} reverse />
      </section>
    </div>
  );
};

export default GalleryLanding;

const getStaticProps = makeStaticProps(['common', 'landing']);
export { getStaticPaths, getStaticProps };
