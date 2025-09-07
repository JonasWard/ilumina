import { useTranslation } from 'react-i18next';
import TinderCards from '../../components/TinderCards';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';

export const TinderSlides = () => {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <TinderCards t={t} />
    </div>
  );
};

export default TinderSlides;

const getStaticProps = makeStaticProps(['second-page', 'common', 'footer']);
export { getStaticPaths, getStaticProps };
