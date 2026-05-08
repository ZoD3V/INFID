'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const idRef = useRef<HTMLButtonElement>(null);
    const enRef = useRef<HTMLButtonElement>(null);

    const toggleLanguage = (newLocale: string) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale, scroll: false });
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, current: 'id' | 'en') => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = current === 'id' ? 'en' : 'id';
            toggleLanguage(next);
            (next === 'en' ? enRef : idRef).current?.focus();
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = current === 'id' ? 'en' : 'id';
            toggleLanguage(prev);
            (prev === 'en' ? enRef : idRef).current?.focus();
        }
    };

    return (
        <div className='static'>
            <div
                role='radiogroup'
                aria-label='Language'
                className='flex items-center rounded-full border border-gray-200 bg-white p-1'>
                {/* ID */}
                <button
                    ref={idRef}
                    role='radio'
                    aria-checked={locale === 'id'}
                    tabIndex={locale === 'id' ? 0 : -1}
                    onClick={() => {
                        toggleLanguage('id');
                        idRef.current?.focus();
                    }}
                    onKeyDown={(e) => handleKeyDown(e, 'id')}
                    className={cn(
                        'group mr-2 cursor-pointer rounded-full transition-all outline-none',
                        locale === 'id' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    )}>
                    <span className='sr-only'>{locale == 'id' ? 'Bahasa Indonesia' : 'Indonesian'}</span>
                    <Image
                        src='/icons/ic-id.png'
                        alt=''
                        aria-hidden='true'
                        width={28}
                        height={28}
                        className={cn(
                            'rounded-full transition-all duration-200',
                            locale === 'id' ? 'scale-110 border-2 border-slate-500' : 'border-2 border-transparent',
                            'group-focus-visible:ring-primary-500 group-focus-visible:bg-blue-100 group-focus-visible:ring-2 group-focus-visible:ring-offset-2'
                        )}
                    />
                </button>

                {/* EN */}
                <button
                    ref={enRef}
                    role='radio'
                    aria-checked={locale === 'en'}
                    tabIndex={locale === 'en' ? 0 : -1}
                    onClick={() => {
                        toggleLanguage('en');
                        enRef.current?.focus();
                    }}
                    onKeyDown={(e) => handleKeyDown(e, 'en')}
                    className={cn(
                        'group cursor-pointer rounded-full transition-all outline-none',
                        locale === 'en' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    )}>
                    <span className='sr-only'>{locale == 'id' ? 'Bahasa Inggris' : 'English'}</span>
                    <Image
                        src='/icons/ic-en.png'
                        alt=''
                        aria-hidden='true'
                        width={28}
                        height={28}
                        className={cn(
                            'rounded-full transition-all duration-200',
                            locale === 'en' ? 'scale-110 border-2 border-slate-500' : 'border-2 border-transparent',
                            'group-focus-visible:ring-primary-500 group-focus-visible:bg-blue-100 group-focus-visible:ring-2 group-focus-visible:ring-offset-2'
                        )}
                    />
                </button>
            </div>
        </div>
    );
}
