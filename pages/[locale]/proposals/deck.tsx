import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { PageTitle } from '@/components/PageTitle';
import { TopBar } from '@/components/landing/TopBar';
import { SVGIcon } from '@/components/SVGIcon';
import Link from '@/components/Link';
import { Lamps } from '@/lib/lamps';
import heart from '/assets/icons/heart.svg';
import circleYes from '/assets/icons/circle_yes.svg';
import cart from '/assets/icons/shopping_cart.svg';

const FAN = [
  { lamp: 4, className: '-rotate-12 -translate-x-[38%] translate-y-3 opacity-90' },
  { lamp: 2, className: 'rotate-12 translate-x-[38%] translate-y-3 opacity-90' }
];

const STEPS = [
  { icon: circleYes.src, title: 'step-swipe', body: 'step-swipe-body' },
  { icon: heart.src, title: 'step-collect', body: 'step-collect-body' },
  { icon: cart.src, title: 'step-light', body: 'step-light-body' }
];

const DeckLanding = () => {
  const { t } = useTranslation(['landing', 'common']);

  return (
    <div className="min-h-dvh bg-linear-to-b from-[#fbeee0] via-[#f6f1ea] to-white text-[#1d1b19] flex flex-col">
      <PageTitle />
      <TopBar />

      <section className="flex flex-col items-center gap-4 px-6 pt-4">
        <div className="relative w-full h-[36dvh] min-h-52 max-h-96 grid place-items-center">
          {FAN.map(({ lamp, className }) => (
            <img
              key={lamp}
              src={Lamps[lamp].src}
              alt=""
              className={`absolute h-[85%] aspect-[3/4] object-cover rounded-2xl shadow-xl grayscale-[0.5] ${className}`}
            />
          ))}
          <div className="relative h-full aspect-[3/4] origin-bottom motion-safe:animate-sway">
            <img
              src={Lamps[0].src}
              alt={t('common:lamp-alt', { number: 1 })}
              fetchPriority="high"
              className="size-full object-cover rounded-2xl shadow-2xl"
            />
            <span className="absolute top-3 left-3 grid place-items-center size-12 rounded-full bg-white/90 border-4 border-green-500 -rotate-12">
              <SVGIcon src={heart.src} className="size-6" />
            </span>
          </div>
        </div>

        <h1 className="m-0 pt-2 text-[2.1rem] sm:text-6xl font-light leading-[1.1]">{t('deck-title')}</h1>
        <p className="m-0 text-[#1d1b19]/70">{t('deck-body')}</p>
        <Link
          href="/tinder-slides"
          className="grid place-items-center w-full max-w-sm min-h-12 rounded-full bg-[#1d1b19] text-white font-semibold"
        >
          {t('cta-start')}
        </Link>
      </section>

      <section className="grid gap-6 sm:grid-cols-3 max-w-4xl w-full mx-auto px-6 pt-14 pb-[calc(env(safe-area-inset-bottom)+3rem)] text-left">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-row sm:flex-col gap-4 items-start">
            <span className="grid place-items-center shrink-0 size-12 rounded-full bg-white shadow-md">
              <SVGIcon src={step.icon} className="size-6" />
            </span>
            <div>
              <p className="m-0 text-xs uppercase tracking-[0.3em] text-[#8a6f4e]">0{i + 1}</p>
              <h2 className="m-0 text-xl font-semibold">{t(step.title)}</h2>
              <p className="m-0 text-[#1d1b19]/70">{t(step.body)}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DeckLanding;

const getStaticProps = makeStaticProps(['common', 'landing']);
export { getStaticPaths, getStaticProps };
