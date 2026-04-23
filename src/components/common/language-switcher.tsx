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
        <div className='static'>
            <div
                role='radiogroup'
                aria-label='Select Language'
                className='flex items-center rounded-full border border-gray-200 bg-white p-1'>
                <button
                    role='radio'
                    onClick={() => toggleLanguage('id')}
                    aria-checked={locale === 'id'}
                    aria-label='Indonesian'
                    className={cn(
                        'group mr-2 cursor-pointer rounded-full transition-all outline-none',
                        locale === 'id' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    )}>
                    <Image
                        src='/icons/ic-id.png'
                        alt=''
                        className={cn(
                            'rounded-full transition-all duration-200',
                            locale === 'id' ? 'scale-110 border-2 border-slate-500' : 'border-2 border-transparent',
                            'group-focus-visible:ring-primary-500 group-focus-visible:bg-blue-100 group-focus-visible:ring-2 group-focus-visible:ring-offset-2'
                        )}
                        width={28}
                        height={28}
                    />
                </button>

                <button
                    role='radio'
                    onClick={() => toggleLanguage('en')}
                    aria-checked={locale === 'en'}
                    aria-label='English'
                    className={cn(
                        'group cursor-pointer rounded-full transition-all outline-none',
                        locale === 'en' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    )}>
                    <Image
                        src='/icons/ic-en.png'
                        alt=''
                        className={cn(
                            'rounded-full transition-all duration-200',
                            locale === 'en' ? 'scale-110 border-2 border-slate-500' : 'border-2 border-transparent',
                            'group-focus-visible:ring-primary-500 group-focus-visible:bg-blue-100 group-focus-visible:ring-2 group-focus-visible:ring-offset-2'
                        )}
                        width={28}
                        height={28}
                    />
                </button>
            </div>
        </div>
    );
}
