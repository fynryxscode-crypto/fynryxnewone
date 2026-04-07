import { useLocation } from 'react-router-dom';
import React, { ReactNode, useEffect, useState } from 'react';

// Lazy-load the heavy page-transition loader — not critical for render
const PageLoader = React.lazy(() => import('./PageLoader'));

interface LayoutClientWrapperProps {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
  widgets: ReactNode;
}

export default function LayoutClientWrapper({ children, navbar, footer, widgets }: LayoutClientWrapperProps) {
  const { pathname } = useLocation();
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    // Clear routing flag whenever the route settles and scroll to top
    setIsRouting(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Intercept internal link clicks to show transition loader
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (
        anchor?.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.href.includes('#') &&
        anchor.target !== '_blank' &&
        anchor.href !== window.location.href
      ) {
        setIsRouting(true);
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const isHiddenRoute =
    pathname?.startsWith('/admin') ||
    pathname === '/login' ||
    pathname === '/register';

  // Admin / auth routes — render children only, no public nav
  if (isHiddenRoute) {
    return (
      <>
        {isRouting && <PageLoader />}
        {children}
      </>
    );
  }

  // Public routes — always render nav + footer so the server HTML includes them,
  // eliminating the CLS flash caused by the previous `!mounted` guard.
  return (
    <div className="flex flex-col min-h-screen">
      {isRouting && <PageLoader />}
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
      {widgets}
    </div>
  );
}
