import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';

import '@/app/globals.css';
import HomeFloatingCard from '@/components/common/home-floating-card';
import { Navbar } from '@/components/common/navbar';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';

import ClientLayout from './ClientLayout';
import FooterWrapper from './footer-wrapper';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

const montserrat = Montserrat({
    subsets: ['latin']
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            images: [
                {
                    url: 'https://i.ibb.co.com/Vcd8nMNL/background-home.webp',
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt')
                }
            ],
            locale: locale,
            type: 'website'
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                id: '/id',
                en: '/en'
            }
        }
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function HomeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html suppressHydrationWarning lang={locale} data-scroll-behavior='smooth'>
            <body className={`${montserrat.className} text-foreground overscroll-none bg-white antialiased`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Navbar />
                    <HomeFloatingCard />
                    <ClientLayout>{children}</ClientLayout>
                    <Toaster richColors />
                    <FooterWrapper />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
