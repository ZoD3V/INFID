import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'INFID',
    description:
        'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
    openGraph: {
        title: 'INFID',
        description:
            'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
        images: '/images/background-home.webp'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning>
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
};

export default Layout;
