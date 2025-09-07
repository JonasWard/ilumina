import { appWithTranslation } from 'next-i18next';
import './globals.css';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
