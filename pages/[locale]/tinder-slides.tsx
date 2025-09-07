import { useTranslation } from 'react-i18next';
import TinderCards from '../../components/TinderCards';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';

import lamp_01 from '/assets/images/lamp-series/lamp_01.jpg';
import lamp_02 from '/assets/images/lamp-series/lamp_02.jpg';
import lamp_03 from '/assets/images/lamp-series/lamp_03.jpg';
import lamp_04 from '/assets/images/lamp-series/lamp_04.jpg';
import lamp_05 from '/assets/images/lamp-series/lamp_05.jpg';
import lamp_06 from '/assets/images/lamp-series/lamp_06.jpg';
import lamp_07 from '/assets/images/lamp-series/lamp_07.jpg';
import lamp_08 from '/assets/images/lamp-series/lamp_08.jpg';
import lamp_09 from '/assets/images/lamp-series/lamp_09.jpg';
import lamp_10 from '/assets/images/lamp-series/lamp_10.jpg';

const lamps = [lamp_01, lamp_02, lamp_03, lamp_04, lamp_05, lamp_06, lamp_07, lamp_08, lamp_09, lamp_10];

export const TinderSlides = () => {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <TinderCards t={t} lamps={lamps.map((lamp) => lamp.src)} />
    </div>
  );
};

export default TinderSlides;

const getStaticProps = makeStaticProps(['second-page', 'common', 'footer']);
export { getStaticPaths, getStaticProps };
