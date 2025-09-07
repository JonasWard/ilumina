import Head from 'next/head';
import icon from '/assets/icons/icon.svg';

export const Header: React.FC<{ heading: string; title: string }> = ({ heading, title }) => (
  <>
    <Head>
      <link rel="icon" href={icon.src} />
      <title>{title}</title>
    </Head>
    <h2>
      next-language-detector example
      <hr />
    </h2>
    <h1>{heading}</h1>
    <a className="github" href="https://github.com/i18next/next-language-detector">
      <i className="typcn typcn-social-github-circular" />
    </a>
  </>
);
