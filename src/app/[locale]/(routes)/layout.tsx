import Footer from '@/components/common/footer';
import LanguageSwitcher from '@/components/common/language-switcher';
import { Navbar } from '@/components/common/navbar';

import ClientLayout from './ClientLayout';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function HomeLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    return (
        <div lang={params.locale}>
            <NextIntlClientProvider messages={messages}>
                <Navbar />
                <LanguageSwitcher />
                <ClientLayout>{children}</ClientLayout>
                <Footer />
            </NextIntlClientProvider>
        </div>
    );
}
