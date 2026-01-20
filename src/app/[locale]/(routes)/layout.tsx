import Footer from '@/components/common/footer';
import LanguageSwitcher from '@/components/common/language-switcher';
import { Navbar } from '@/components/common/navbar';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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
        <div lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <Navbar />
                <LanguageSwitcher />
                {children}
                <Footer />
            </NextIntlClientProvider>
        </div>
    );
}
