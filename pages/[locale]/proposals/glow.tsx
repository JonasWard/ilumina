import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { PageTitle } from '@/components/PageTitle';
import { TopBar } from '@/components/landing/TopBar';
import Link from '@/components/Link';
import { Lamps } from '@/lib/lamps';

const GlowLanding = () => {
  const { t } = useTranslation(['landing', 'common']);

  return (
    <div className="bg-black text-white text-left">
      <PageTitle />
      <section className="relative h-dvh min-h-[560px] overflow-clip">
        <img
          src={Lamps[0].src}
          alt={t('common:lamp-alt', { number: 1 })}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover scale-105 motion-safe:animate-drift"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,196,120,0.45),transparent_55%)] mix-blend-screen motion-safe:animate-breathe" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 via-45% to-black/10" />

        <TopBar dark className="relative z-10" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] max-w-xl">
          <p className="m-0 text-xs uppercase tracking-[0.3em] text-amber-200">{t('eyebrow')}</p>
          <h1 className="m-0 text-4xl sm:text-6xl font-light leading-[1.1]">{t('glow-title')}</h1>
          <p className="m-0 text-white/80">{t('glow-body')}</p>
          <Link
            href="/tinder-slides"
            className="grid place-items-center min-h-12 mt-2 rounded-full bg-white text-black font-semibold shadow-[0_0_40px_rgba(255,196,120,0.45)]"
          >
            {t('cta-start')}
          </Link>
        </div>
      </section>

      <section className="py-12 pb-[calc(env(safe-area-inset-bottom)+3rem)]">
        <h2 className="m-0 px-6 pb-6 text-xs uppercase tracking-[0.3em] text-amber-200">{t('collection')}</h2>
        <div className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 [scrollbar-width:none]">
          {Lamps.map((lamp, i) => (
            <Link
              key={lamp.src}
              href={`/lamps/${i}`}
              className="relative shrink-0 w-[68vw] max-w-72 snap-center rounded-2xl overflow-clip"
            >
              <img
                src={lamp.src}
                alt={t('common:lamp-alt', { number: i + 1 })}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover"
              />
              <span className="absolute bottom-3 left-4 text-sm text-white/90">
                {String(i + 1).padStart(2, '0')}
              </span>
            </Link>
          ))}
        </div>
        <div className="px-6 pt-6">
          <Link
            href="/tinder-slides"
            className="grid place-items-center min-h-12 rounded-full border border-white/40 text-white font-semibold"
          >
            {t('cta-start')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GlowLanding;

const getStaticProps = makeStaticProps(['common', 'landing']);
export { getStaticPaths, getStaticProps };
