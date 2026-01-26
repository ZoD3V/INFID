import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'INFID',
    description: 'INFID',
    openGraph: {
        title: 'Acme',
        description: 'Acme is a...'
    }
};

const montserrat = Montserrat({
    subsets: ['latin']
});

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body className={`${montserrat.className} text-foreground overscroll-none bg-white antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
};

export default Layout;
