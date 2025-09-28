import { useRouter } from 'next/router';
import { getStaticPathsWithAdditionalParams, makeStaticProps } from '../../../lib/getStatic';
import { useTranslation } from 'react-i18next';
import { Lamps } from '@/lib/lamps';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LampContentCard } from '@/components/LampContentCard';
import { SVGIcon } from '@/components/SVGIcon';
import heart from '/assets/icons/heart.svg';
import cart from '/assets/icons/shopping_cart.svg';
import customize from '/assets/icons/customize.svg';

export const Lamp = () => {
  const { t } = useTranslation(['404', 'common', 'footer']);
  const router = useRouter();

  const { lampIndex } = router.query;
  const index = Number(lampIndex);

  return (
    <>
      <Navigation
        heading={'heading'}
        links={[
          { href: 'tinder-slides', text: 'to-lamp-swiping', icon: <SVGIcon src={heart.src} /> },
          { href: 'tinder-slides', text: 'to-lamp-swiping', icon: <SVGIcon src={cart.src} /> },
          { href: 'tinder-slides', text: 'to-lamp-swiping', icon: <SVGIcon src={customize.src} /> }
        ]}
      />
      <main className="w-[calc(min(100vw,1200px)-50px)] mx-auto">
        <div className="mt-[65px] w-[calc(min(100vw,1200px)-50px)]">
          {Lamps[index] && (
            <LampContentCard index={index} img={Lamps[index].src} name={t('name')} description={t('description')} />
          )}
        </div>
      </main>
    </>
  );
};

export default Lamp;

const getStaticProps = makeStaticProps(['404', 'common', 'footer']);
const getStaticPaths = getStaticPathsWithAdditionalParams(Lamps.map((_, index) => ({ lampIndex: index.toString() })));

export { getStaticPaths, getStaticProps };
