import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkComponent: React.FC<{
  children: ReactNode;
  skipLocaleHandling?: boolean;
  href: string;
  locale?: string;
}> = ({ children, skipLocaleHandling, ...props }) => {
  const router = useRouter();
  const locale = (props.locale || router.query.locale || '') as string;

  let href = props.href || router.asPath;
  if (href.indexOf('http') === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale);
  }

  return (
    <>
      <Link href={href} legacyBehavior>
        <a {...props}>{children}</a>
      </Link>
    </>
  );
};

export default LinkComponent;
