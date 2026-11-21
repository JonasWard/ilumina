import logo from '/assets/icons/logo_ilumina.svg';
import heart from '/assets/icons/heart.svg';
import customize from '/assets/icons/customize.svg';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import LanguageSwitchLink from './LanguageSwitchLink';
import Link from './Link';
import { SVGIcon } from './SVGIcon';

const NAV_LINKS = [
  { href: 'tinder-slides', text: 'to-lamp-swiping', icon: customize.src },
  { href: 'favorites', text: 'to-favorites', icon: heart.src }
];

export const Navigation: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const current = router.pathname.split('/').pop();

  return (
    <div className="fixed inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-linear-to-b from-white to-transparent">
      <div className="max-w-[1200px] mx-auto px-3 py-1 flex flex-row items-center justify-between gap-2">
        <Link href="/" className="flex items-center min-h-11 shrink-0">
          <img src={logo.src} alt="logo" className="h-6 w-auto" />
        </Link>
        <span className="flex flex-row items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.href === current ? (
              <span key={link.href} className="grid place-items-center size-11 shrink-0 rounded-full bg-black/10">
                <SVGIcon src={link.icon} className="size-6" />
              </span>
            ) : (
              <Link href={link.href} key={link.href} className="grid place-items-center size-11 shrink-0 rounded-full">
                <SVGIcon src={link.icon} className="size-6" />
              </Link>
            )
          )}
          <LanguageSwitchLink />
        </span>
      </div>
    </div>
  );
};
