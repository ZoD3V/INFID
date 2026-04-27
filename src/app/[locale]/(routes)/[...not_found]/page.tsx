'use client';

import { useRouter } from 'next/navigation';

import { Navbar } from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('not-found');
    const router = useRouter();

    return (
        <section className='flex min-h-screen w-full flex-col' aria-labelledby='error-heading'>
            <Navbar className='bg-primary-500!' />

            <div className='flex flex-1 flex-col items-center justify-center bg-white px-4 py-12 text-center font-sans sm:px-6'>
                <h1 id='error-heading' className='sr-only'>
                    Error 404 - {t('title')}
                </h1>

                {/* 404 Number */}
                <span
                    className='text-primary-500 mb-2 text-[5rem] leading-none font-bold select-none sm:text-9xl md:mb-4 md:text-[12rem]'
                    aria-hidden='true'>
                    404
                </span>

                {/* Title */}
                <h2 className='mb-3 text-xl font-extrabold text-black sm:text-2xl md:mb-4 md:text-3xl'>{t('title')}</h2>

                {/* Description */}
                <p className='mb-8 max-w-xs text-sm leading-relaxed text-gray-500 sm:max-w-md sm:text-base md:mb-10'>
                    {t('description')}
                </p>

                {/* Buttons */}
                <div className='mb-10 flex w-full max-w-xs flex-col gap-3 sm:mb-14 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4'>
                    <Button
                        asChild
                        variant='default'
                        className='w-full rounded-full px-8 py-6 text-base font-medium sm:w-auto'>
                        <Link href='/'>{t('goHome')}</Link>
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() => router.back()}
                        className='w-full rounded-full px-8 py-6 text-base font-medium sm:w-auto'>
                        {t('goBack')}
                    </Button>
                </div>

                {/* Nav Links */}
                <nav
                    className='flex flex-col items-center gap-3 text-sm font-medium text-gray-600 sm:flex-row sm:gap-8 sm:text-base'
                    aria-label='Footer Navigation'>
                    <Link
                        href='/about/profile-infid'
                        className='hover:text-primary-500 focus:outline-primary-500 transition-colors'>
                        {t('links.about')}
                    </Link>
                    <Link
                        href='/news-from-us'
                        className='hover:text-primary-500 focus:outline-primary-500 transition-colors'>
                        {t('links.news')}
                    </Link>
                    <Link
                        href='/contact-us'
                        className='hover:text-primary-500 focus:outline-primary-500 transition-colors'>
                        {t('links.contact')}
                    </Link>
                </nav>
            </div>
        </section>
    );
}
