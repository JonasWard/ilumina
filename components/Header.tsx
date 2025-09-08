import Head from 'next/head';
import icon from '/assets/icons/icon.svg';
import logo from '/assets/icons/logo.svg';

export const Header: React.FC<{ heading: string; title: string; className?: string }> = ({ heading, title, className }) => (
  <>
    <Head>
      <link rel="icon" href={icon.src} />
      <title>{title}</title>
    </Head>
    <img src={logo.src} alt="logo" className="max-w-[min(70vw,400px)] my-10" />
    <h1 className={className}>{heading}</h1>
  </>
);
