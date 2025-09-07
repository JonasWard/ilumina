import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkComponent: React.FC<{
  children: React.ReactNode;
  skipLocaleHandling: boolean;
  href: string;
  locale: string;
}> = ({ children, skipLocaleHandling, ...rest }) => {
  const router = useRouter();
  const locale = (rest.locale || router.query.locale || '') as string;

  let href = rest.href || router.asPath;
  if (href.indexOf('http') === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale);
  }

  return (
    <>
      <Link href={href} legacyBehavior>
        <a {...rest}>{children}</a>
      </Link>
    </>
  );
};

export default LinkComponent;
