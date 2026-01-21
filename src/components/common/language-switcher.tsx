'use client';

import Image from 'next/image';

import { usePathname, useRouter } from '@/i18n/routing';

import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = (newLocale: string) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
        }
    };

    return (
        <div className='fixed right-6 bottom-6 z-99999999'>
            <div className='flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-lg'>
                <button
                    onClick={() => toggleLanguage('id')}
                    className={`mr-2 cursor-pointer rounded-full font-bold transition-all`}>
                    <Image
                        src='/icons/ic-id.png'
                        alt='id'
                        className={`rounded-full ${locale === 'id' ? 'border-3 border-slate-500' : ''}`}
                        width={32}
                        height={32}
                    />
                </button>

                <button
                    onClick={() => toggleLanguage('en')}
                    className={`cursor-pointer rounded-full font-bold transition-all`}>
                    <Image
                        src='/icons/ic-en.png'
                        alt='id'
                        className={`rounded-full ${locale === 'en' ? 'border-3 border-slate-500' : ''}`}
                        width={32}
                        height={32}
                    />
                </button>
            </div>
        </div>
    );
}
