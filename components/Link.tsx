import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { navigateTo } from '@/lib/getCorrectHref';
import Link from 'next/link';

const LinkComponent: React.FC<{
  children: ReactNode;
  skipLocaleHandling?: boolean;
  href: string;
  className?: string;
}> = ({ href, className, ...props }) => {
  const router = useRouter();
  return (
    <Link className={className + ' cursor-pointer h-full w-full'} href={navigateTo(router.asPath, href)} {...props} />
  );
};

export default LinkComponent;
