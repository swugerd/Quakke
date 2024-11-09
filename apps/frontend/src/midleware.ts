import createMiddleware from 'next-intl/middleware';
import { locales } from './constants/index.constants';

export default createMiddleware({
  locales,
  defaultLocale: 'ru',
});

export const config = {
  matcher: [
    '/',
    `/(${locales.join('|')})/:path*`,
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
