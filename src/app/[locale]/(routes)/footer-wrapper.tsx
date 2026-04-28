'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/common/footer';

export default function FooterWrapper() {
    const pathname = usePathname();

    const hideFooter = pathname.includes('/quiz') || pathname.endsWith('/404') || pathname.includes('/not-found');

    if (hideFooter) return null;

    return <Footer />;
}
