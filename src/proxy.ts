import { routing } from './i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
    matcher: ['/((?!api|_next|_static|.well-known|.*\\..*).*)', '/(id|en)/:path*']
};
