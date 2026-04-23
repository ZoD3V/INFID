'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import CardContent from '@/components/common/card-content';
import OptimizedImage from '@/components/common/optimized-image';
import { SectionHeader } from '@/components/common/section-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Link, useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatArticleDate, getShortDescription } from '@/lib/utils';
import { Post, PostTranslation } from '@/types/posts';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Eye, Pencil, Play } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const RealImpactSection = ({ programData }: { programData: Post[] }) => {
    const t = useTranslations('home.hero_section');
    const b = useTranslations('button');
    const c = useTranslations('card');
    const videoId = '6KJBSilT76k';
    const startTime = 10;
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const locale = useLocale();
    const router = useRouter();

    const getTranslation = (item: Post, targetLang: string) => {
        if (!item?.translations) return null;
        return item.translations.find((t) => t.language === targetLang) || item.translations[0];
    };

    const firstTranslation = getTranslation(programData[0], locale);
    const secondTranslation = getTranslation(programData[1], locale);
    const thirdTranslation = getTranslation(programData[2], locale);

    const handleArticleClick = async (article: Post) => {
        try {
            await apiRequest.get<Post>(`${API_ENDPOINTS.posts}/${article.id}/view`);
        } catch (error) {
            console.error('Failed to track view:', error);
        }

        router.push(`/knowledge/${article.id}-${article.translations[0]?.slug}`);
    };

    return (
        <section
            className='bg-primary relative overflow-hidden py-24'
            style={{ backgroundImage: "url('/images/bg-pattern.png')" }}>
            <div className='container'>
                {/* Header */}
                <SectionHeader
                    badge={t('impactTag')}
                    title={t('impactTitle')}
                    description={t('impactDescription')}
                    descriptionClassName='max-w-3xl'
                />

                {/* Bento Grid */}
                <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
                    {/* 1. Rekomendasi Kebijakan  */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <div
                                role='button'
                                tabIndex={0}
                                aria-labelledby='video-title-1'
                                className='group col-span-1 cursor-pointer rounded-xl border border-slate-200 bg-white p-2 transition-all duration-300 outline-none focus:ring-0 md:col-span-12 lg:col-span-7'>
                                {/* Image Container */}
                                <div className='relative mb-4 h-70 overflow-hidden rounded-lg lg:h-80 xl:h-87'>
                                    <Image
                                        src={thumbnailUrl}
                                        alt=''
                                        aria-hidden='true'
                                        fill
                                        sizes='50vw'
                                        className='object-cover transition-all duration-300'
                                    />

                                    <div className='absolute inset-0 flex items-center justify-center bg-black/20 transition-all'>
                                        <div className='rounded-full bg-white/90 p-3 transition-transform group-hover:scale-110 md:p-4'>
                                            <Play
                                                className='text-secondary-200 h-8 w-8 md:h-12 md:w-12'
                                                fill='currentColor'
                                            />
                                        </div>
                                    </div>

                                    <div className='absolute top-3 left-3'>
                                        <span className='bg-secondary-300 rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-sm'>
                                            Video
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='flex items-start gap-4 px-1 pb-2 lg:px-4'>
                                    <div className='mb-4 hidden flex-col items-center lg:flex' aria-hidden='true'>
                                        <div className='text-primary-900 text-5xl font-bold'>24</div>
                                        <div className='text-xs font-semibold text-slate-600 uppercase'>OKT 23</div>
                                    </div>

                                    <div className='flex flex-col pb-2 lg:pb-0'>
                                        <h3
                                            id='video-title-1'
                                            className='group-hover:text-primary-500 decoration-primary-500 -ml-1 line-clamp-2 rounded-sm px-1 text-xl leading-snug font-bold underline-offset-4 transition-all group-focus:bg-blue-100 group-focus:underline lg:text-2xl'>
                                            Perjalanan SDGs Tangerang - INFID
                                        </h3>

                                        <p className='mb-2 text-sm leading-relaxed text-slate-600'>
                                            Memastikan ketersediaan dan pengelolaan air bersih dan sanitasi yang
                                            berkelanjutan merupakan tujuan ke-6 dari Tujuan Pembangunan Berkelanjutan
                                            (TPB/SDGs). Sayangnya, penyediaan akses terhadap air bersih dan fasilitas
                                            sanitasi di Indonesia dalam praktiknya belum optimal, salah satunya yang
                                            ditemukan di pesantren.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>

                        {/* Video Popup Modal */}
                        <DialogContent className='max-w-[calc(100%-2rem)] overflow-hidden border-none bg-black p-0 md:max-w-184 [&>button]:hidden'>
                            <VisuallyHidden>
                                <DialogHeader>
                                    <DialogTitle>Video Perjalanan SDGs Tangerang - INFID</DialogTitle>
                                </DialogHeader>
                            </VisuallyHidden>
                            <div className='aspect-video w-full'>
                                <iframe
                                    width='100%'
                                    height='100%'
                                    src={videoSrc}
                                    title='YouTube video player'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                    allowFullScreen
                                    className='border-none'></iframe>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* 2. Kartu Artikel (HARMONI) - Index 0 */}
                    {!programData[0] ? (
                        <CardSkeleton className='col-span-1 md:col-span-6 lg:col-span-5 lg:min-h-112.5' />
                    ) : (
                        <div
                            role='button'
                            tabIndex={0}
                            aria-labelledby='card-title-harmoni'
                            onClick={() => handleArticleClick(programData[0])}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleArticleClick(programData[0]);
                            }}
                            className='group col-span-1 flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2 transition-all duration-300 outline-none hover:shadow-md md:col-span-6 lg:col-span-5 lg:min-h-112.5'>
                            <Image
                                src={programData[0]?.cover ?? '/images/placeholder.jpg'}
                                alt=''
                                aria-hidden='true'
                                width={600}
                                height={400}
                                className='h-40 w-full rounded-xl object-cover transition-transform duration-500 lg:h-87'
                            />
                            <div className='px-1 pb-2'>
                                <div className='flex items-center gap-2 py-4' aria-hidden='true'>
                                    <span className='text-secondary-300 text-xs font-medium uppercase'>
                                        {programData[0]?.category?.name ?? 'Category'}
                                    </span>
                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                    <span className='text-xs text-slate-500'>
                                        {programData[0]?.created_at
                                            ? formatArticleDate(programData[0]?.created_at)
                                            : 'No Date'}
                                    </span>
                                </div>

                                <div className='space-y-3 overflow-hidden'>
                                    <h3
                                        id='card-title-harmoni'
                                        className='group-hover:text-primary-500 decoration-primary-500 -ml-1 line-clamp-2 rounded-sm px-1 text-xl leading-snug font-bold underline-offset-4 transition-all group-focus:bg-blue-100 group-focus:underline lg:text-2xl'>
                                        {firstTranslation?.title ?? 'Untitled'}
                                    </h3>
                                    <CardContent content={getShortDescription(firstTranslation?.content ?? '')} />

                                    <div className='flex items-center gap-3 text-xs text-slate-500'>
                                        <div className='flex items-center gap-1'>
                                            <Pencil size={14} /> By {programData[0]?.author?.name || 'Admin'}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Eye size={14} /> {programData[0]?.views ?? 0}{' '}
                                            {locale === 'id' ? 'Dilihat' : 'Seen'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Riset Statistik  */}
                    {!programData[1] ? (
                        <CardSkeleton className='col-span-1 md:col-span-6 lg:col-span-4' />
                    ) : (
                        <div
                            role='button'
                            tabIndex={0}
                            aria-labelledby='card-title-riset'
                            onClick={() => handleArticleClick(programData[1])}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleArticleClick(programData[1]);
                            }}
                            className='group col-span-1 flex cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-2 backdrop-blur-sm transition-all duration-300 outline-none hover:shadow-md md:col-span-6 lg:col-span-4'>
                            <Image
                                src={programData[1]?.cover ?? '/images/placeholder.jpg'}
                                alt=''
                                aria-hidden='true'
                                width={600}
                                height={400}
                                className='h-40 w-full rounded-xl object-cover transition-transform duration-500 lg:h-57'
                            />
                            <div className='px-1 pb-2'>
                                <div className='flex items-center gap-2 py-4' aria-hidden='true'>
                                    <span className='text-secondary-300 text-xs font-medium uppercase'>
                                        {programData[1]?.category?.name ?? 'Category'}
                                    </span>
                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                    <span className='text-xs text-slate-500'>
                                        {programData[1]?.created_at
                                            ? formatArticleDate(programData[1]?.created_at)
                                            : 'No Date'}
                                    </span>
                                </div>
                                <div className='space-y-3'>
                                    <h3
                                        id='card-title-riset'
                                        className='group-hover:text-primary-500 line-clamp-2 text-base font-bold group-focus:bg-blue-100 group-focus:underline lg:text-lg'>
                                        {secondTranslation?.title ?? 'Untitled'}
                                    </h3>
                                    <div className='flex items-center gap-3 text-xs text-slate-500'>
                                        <div className='flex items-center gap-1'>
                                            <Pencil size={14} /> By {programData[1]?.author?.name || 'Admin'}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Eye size={14} /> {programData[1]?.views ?? 0}{' '}
                                            {locale === 'id' ? 'Dilihat' : 'Seen'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. Provinsi Dijangkau */}
                    {!programData[2] ? (
                        <CardSkeleton className='col-span-1 md:col-span-6 lg:col-span-4' />
                    ) : (
                        <div
                            role='button'
                            tabIndex={0}
                            aria-labelledby='card-title-jangkau'
                            onClick={() => handleArticleClick(programData[2])}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleArticleClick(programData[2]);
                            }}
                            className='group col-span-1 flex cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-2 backdrop-blur-sm transition-all duration-300 outline-none hover:shadow-md md:col-span-6 lg:col-span-4'>
                            <Image
                                src={programData[2]?.cover ?? '/images/placeholder.jpg'}
                                alt=''
                                aria-hidden='true'
                                width={600}
                                height={400}
                                className='h-40 w-full rounded-xl object-cover transition-transform duration-500 lg:h-57'
                            />
                            <div className='px-1 pb-2'>
                                <div className='flex items-center gap-2 py-4' aria-hidden='true'>
                                    <span className='text-secondary-300 text-xs font-medium uppercase'>
                                        {programData[2]?.category?.name ?? 'Category'}
                                    </span>
                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                    <span className='text-xs text-slate-500'>
                                        {programData[2]?.created_at
                                            ? formatArticleDate(programData[2]?.created_at)
                                            : 'No Date'}
                                    </span>
                                </div>
                                <div className='space-y-3'>
                                    <h3
                                        id='card-title-jangkau'
                                        className='group-hover:text-primary-500 line-clamp-2 text-base font-bold group-focus:bg-blue-100 group-focus:underline lg:text-lg'>
                                        {thirdTranslation?.title ?? 'Untitled'}
                                    </h3>
                                    <div className='flex items-center gap-3 text-xs text-slate-500'>
                                        <div className='flex items-center gap-1'>
                                            <Pencil size={14} /> By {programData[2]?.author?.name || 'Admin'}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Eye size={14} /> {programData[2]?.views ?? 0}{' '}
                                            {locale === 'id' ? 'Dilihat' : 'Seen'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. Organisasi Anggota (Statik/Cta Card) */}
                    <div className='order bg-secondary-100 col-span-1 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-xl border border-slate-200 backdrop-blur-sm transition-all duration-300 group-focus:bg-blue-100 group-focus:underline hover:shadow-md md:col-span-6 lg:col-span-4'>
                        <Image
                            src='/images/decoration-footer-1.png'
                            alt=''
                            aria-hidden='true'
                            width={175}
                            height={175}
                            className='ml-24 h-auto w-auto rounded-xl pt-4'
                        />
                        <div className='px-5 pb-5 lg:pt-0'>
                            <div className='space-y-2 lg:space-y-4'>
                                <h3 className='group-hover:text-primary-500 line-clamp-2 text-xl leading-snug font-bold transition-colors lg:text-2xl'>
                                    {c('impactCardTitle')}
                                </h3>
                                <p className='max-w-3xl text-sm text-slate-700'>{c('impactCardDescription')}</p>
                                <Button className='bg-primary-600 hover:bg-primary-700 w-full rounded-full text-white'>
                                    {b('readAllStories')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CardSkeleton = ({ className }: { className?: string }) => (
    <div className={`rounded-xl border border-slate-200 bg-slate-50 p-4 ${className}`}>
        <div className='h-40 w-full rounded-xl bg-slate-200 lg:h-57' />
        <div className='mt-4 space-y-3'>
            <div className='h-4 w-1/4 rounded bg-slate-200' />
            <div className='h-6 w-full rounded bg-slate-200' />
            <div className='h-4 w-3/4 rounded bg-slate-200' />
        </div>
    </div>
);

export default RealImpactSection;
