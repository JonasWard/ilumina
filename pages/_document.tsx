import Document, { Html, Head, Main, NextScript } from 'next/document';
import i18nextConfig from '../next-i18next.config';

class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;
    return (
      <Html lang={currentLocale as string}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" rel="stylesheet" />

          <link href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Oswald:600" rel="stylesheet" />
          <link data-react-helmet="true" rel="icon" href="/assets/icons/icon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
