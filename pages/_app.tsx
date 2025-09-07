import { appWithTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
