import { appWithTranslation } from 'next-i18next';
import './globals.css';
import { hydrateLampStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { markInAppNavigation } from '@/lib/history';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', markInAppNavigation);
    return () => router.events.off('routeChangeComplete', markInAppNavigation);
  }, [router.events]);

  useEffect(hydrateLampStore, []);

  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
