'use client';

import Footer from '@/components/common/footer';
import { usePathname } from '@/i18n/routing';

export default function FooterWrapper() {
    const pathname = usePathname();

    if (pathname === '/quiz') return null;

    return <Footer />;
}
