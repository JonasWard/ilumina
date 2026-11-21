import { appWithTranslation } from 'next-i18next';
import './globals.css';
import { LOCAL_STORAGE_KEY_DISLIKED, LOCAL_STORAGE_KEY_LIKED, useLampStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { markInAppNavigation } from '@/lib/history';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', markInAppNavigation);
    return () => router.events.off('routeChangeComplete', markInAppNavigation);
  }, [router.events]);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY_LIKED))
      useLampStore.setState(() => ({
        liked: new Set(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LIKED)!))
      }));
    
    if (localStorage.getItem(LOCAL_STORAGE_KEY_DISLIKED))
      useLampStore.setState(() => ({
        disliked: new Set(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DISLIKED)!))
      }));

    useLampStore.setState(() => ({ hydrated: true }));
  }, []);

  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
