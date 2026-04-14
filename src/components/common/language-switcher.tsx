'use client';

import Image from 'next/image';

import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = (newLocale: string) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale, scroll: false });

            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        }
    };

    return (
        <div className='static' aria-label='Select Language'>
            <div
                role='group'
                aria-label='Language Selector'
                className='flex items-center rounded-full border border-gray-200 bg-white p-1'>
                <button
                    onClick={() => toggleLanguage('id')}
                    aria-pressed={locale === 'id'}
                    aria-label='Switch to Indonesian'
                    className={cn(
                        'mr-2 cursor-pointer rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
                        locale === 'id' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    )}>
                    <Image
                        src='/icons/ic-id.png'
                        alt=''
                        className={cn(
                            'rounded-full transition-transform',
                            locale === 'id' ? 'scale-110 border-2 border-slate-500' : 'border-2 border-transparent'
                        )}
                        width={28}
                        height={28}
                    />
                </button>

                <button
                    onClick={() => toggleLanguage('en')}
                    aria-pressed={locale === 'en'}
                    aria-label='Switch to English'
                    className={cn(
                        'cursor-pointer rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
                        locale === 'en' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    )}>
                    <Image
                        src='/icons/ic-en.png'
                        alt=''
                        className={cn(
                            'rounded-full transition-transform',
                            locale === 'en' ? 'scale-110 border-2 border-slate-500' : 'border-2 border-transparent'
                        )}
                        width={28}
                        height={28}
                    />
                </button>
            </div>
        </div>
    );
}
