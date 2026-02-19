import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '@/app/globals.css';
import Footer from '@/components/common/footer';
import HomeFloatingCard from '@/components/common/home-floating-card';
import { Navbar } from '@/components/common/navbar';
import { Toaster } from '@/components/ui/sonner';

import ClientLayout from './ClientLayout';
import { NextIntlClientProvider } from 'next-intl';

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

    return (
        <html suppressHydrationWarning lang={locale} data-scroll-behavior='smooth'>
            <body className={`${montserrat.className} text-foreground overscroll-none bg-white antialiased`}>
                <NextIntlClientProvider>
                    <Navbar />
                    <HomeFloatingCard />

                    <ClientLayout>{children}</ClientLayout>

                    <Toaster />
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
