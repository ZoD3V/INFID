import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '@/app/globals.css';
import Footer from '@/components/common/footer';
import LanguageSwitcher from '@/components/common/language-switcher';
import { Navbar } from '@/components/common/navbar';
import { Toaster } from '@/components/ui/sonner';

import ClientLayout from './ClientLayout';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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

export default async function HomeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();
    return (
        <html suppressHydrationWarning lang={locale}>
            <body className={`${montserrat.className} text-foreground overscroll-none bg-white antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <LanguageSwitcher />
                    <ClientLayout>{children}</ClientLayout>
                    <Toaster />

                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
