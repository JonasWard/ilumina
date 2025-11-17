import { appWithTranslation } from 'next-i18next';
import './globals.css';
import { LOCAL_STORAGE_KEY_DISLIKED, LOCAL_STORAGE_KEY_LIKED, useLampStore } from '@/lib/store';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY_LIKED))
      useLampStore.setState(() => ({
        liked: new Set(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LIKED)!))
      }));
    
    if (localStorage.getItem(LOCAL_STORAGE_KEY_DISLIKED))
      useLampStore.setState(() => ({
        disliked: new Set(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DISLIKED)!))
      }));
  }, []);

  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
