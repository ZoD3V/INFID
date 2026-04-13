'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

const AboutInfid = () => {
    const t = useTranslations('profile.about_section');
    const scrollToProgram = () => {
        const element = document.getElementById('program-infid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToHistory = () => {
        const element = document.getElementById('history-infid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className='bg-hero relative z-20 h-127.5 bg-cover bg-center bg-no-repeat py-24'
            style={{
                backgroundImage: `url('/images/background-section.webp')`
            }}>
            <div className='from-primary-500/80 via-primary-500/80 to-primary-500/20 absolute inset-0 bg-linear-to-b' />

            <div className='relative container'>
                <Breadcrumb className='text-secondary-200 mb-8'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/' className='text-secondary-200 hover:text-secondary-300'>
                                {t('breadcrumb.home')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-secondary-200 hover:text-secondary-300' />
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-secondary-200 hover:text-secondary-300 cursor-default'>
                                {t('breadcrumb.about')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-secondary-200 hover:text-secondary-300' />
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-secondary-200 hover:text-secondary-300 cursor-default font-bold'>
                                {t('breadcrumb.struggle')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex flex-col justify-between gap-y-5 lg:flex-row xl:gap-5'>
                    <div className='flex-1.5 space-y-6'>
                        <div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/10 px-3 py-1 text-xs text-white'>
                            <span className='bg-secondary-200 h-2 w-2 rounded-full' />
                            {t('badge')}
                        </div>

                        <h1 className='text-secondary-200 text-3xl leading-tight font-bold whitespace-pre-line md:text-4xl'>
                            {t('title')}
                        </h1>

                        <p className='max-w-xl text-sm leading-relaxed text-white opacity-90 sm:text-base'>
                            {t('description')}
                        </p>

                        <div className='mt-7 flex flex-col gap-5 sm:mt-17.5 md:gap-8'>
                            <div className='flex w-full flex-col items-center gap-2 md:flex-row md:gap-4'>
                                <div className='w-full rounded-xl border border-slate-200 bg-white'>
                                    <div className='px-4 py-4'>
                                        <div className='text-primary-900 mb-2 text-xs font-normal tracking-wider uppercase'>
                                            {t('stats.status_label')}
                                        </div>
                                        <div className='flex items-center justify-between gap-4 md:items-start'>
                                            <div>
                                                <h3 className='text-primary-800 text-base font-bold'>
                                                    {t('stats.status_title')}
                                                </h3>
                                                <p className='text-xs text-gray-500'>{t('stats.status_sub')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full rounded-xl border border-slate-200 bg-white'>
                                    <div className='px-4 py-4'>
                                        <div className='text-primary-900 mb-2 text-xs font-normal tracking-wider uppercase'>
                                            {t('stats.since_label')}
                                        </div>
                                        <div className='flex items-center justify-between gap-4 md:items-start'>
                                            <div>
                                                <h3 className='text-primary-800 text-base font-bold'>
                                                    {t('stats.since_title')}
                                                </h3>
                                                <p className='text-xs text-gray-500'>{t('stats.since_sub')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-2 sm:flex sm:items-center'>
                                <Button className='rounded-full font-semibold' onClick={scrollToProgram}>
                                    {t('buttons.explore')}
                                </Button>
                                <Button variant='outline' className='rounded-full' onClick={scrollToHistory}>
                                    {t('buttons.history')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='flex-[0.9]'>
                        <div className='overflow-clip rounded-xl border border-slate-200 bg-white'>
                            <div className='p-4 lg:p-5'>
                                <div className='relative h-55 w-full lg:h-72.75'>
                                    <Image
                                        src='/images/background-section.webp'
                                        alt='Focus Discussion'
                                        fill
                                        className='rounded-xl object-cover'
                                    />
                                </div>
                                <div className='flex flex-col gap-5 pt-5 xl:flex-row'>
                                    <div className='space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4'>
                                        <div className='text-primary-900 mb-2 text-xs font-normal tracking-wider uppercase'>
                                            {t('card.focus_label')}
                                        </div>
                                        <h4 className='text-primary-500 text-lg font-bold'>{t('card.focus_title')}</h4>
                                        <p className='text-sm leading-relaxed text-gray-500'>{t('card.focus_desc')}</p>
                                    </div>
                                    <div className='bg-secondary-100 border-secondary-200 flex flex-col items-start justify-between space-y-3 rounded-lg border p-4'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-primary-900 text-xs font-normal tracking-wider uppercase'>
                                                {t('card.access_label')}
                                            </div>
                                            <h4 className='text-lg font-bold text-slate-800'>
                                                {t('card.access_title')}
                                            </h4>
                                            <p className='text-sm text-slate-500'>{t('card.access_sub')}</p>
                                        </div>

                                        <Button
                                            variant='link'
                                            asChild
                                            className='text-primary-500 h-auto p-0 text-xs font-semibold tracking-widest uppercase'>
                                            <Link
                                                href={
                                                    'https://esango.un.org/civilsociety/consultativeStatusSummary.do?profileCode=2443'
                                                }>
                                                {t('card.access_link')}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutInfid;
