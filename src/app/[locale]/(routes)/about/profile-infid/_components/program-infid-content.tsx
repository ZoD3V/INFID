'use client';

import Image from 'next/image';

import CardContent from '@/components/common/card-content';
import EmptyState from '@/components/common/empty-state';
import OptimizedImage from '@/components/common/optimized-image';
import { SectionHeader } from '@/components/common/section-header';
import { Post } from '@/types/posts';

import { useLocale, useTranslations } from 'next-intl';

export const ProgramInfidContent = ({ programData }: { programData: Post[] }) => {
    const t = useTranslations('profile.program_section');
    const locale = useLocale();

    return (
        <div className='bg-secondary-100 relative min-h-screen py-24' id='program-infid'>
            <Image
                src='/images/decoration-program-1.png'
                alt='decoration'
                width={200}
                height={200}
                sizes='100%'
                className='absolute top-0 left-0 hidden h-auto w-auto xl:block'
            />
            <div className='container'>
                {/* Header */}
                <SectionHeader
                    badge={t('header.badge')}
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title={t('header.title')}
                    description={t('header.description')}
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-4xl'
                />

                {/* Program Cards */}
                {programData.length > 0 ? (
                    <div className='relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                        <Image
                            src='/images/decoration-program-2.png'
                            alt='images'
                            width={100}
                            height={100}
                            className='absolute -right-15 -bottom-5 z-30 hidden xl:block'
                        />
                        {programData.map((program, index) => {
                            const translation =
                                program?.translations?.find((t) => t.language === locale) ||
                                program?.translations?.find((t) => t.language === 'id') ||
                                program?.translations?.[0];

                            const title = translation?.title || 'No Title';

                            return (
                                <div
                                    key={index}
                                    role='button'
                                    tabIndex={0}
                                    aria-labelledby={`prog-card-title-${index}`}
                                    className='group relative cursor-pointer overflow-hidden rounded-2xl border bg-slate-100 p-2 outline-none'>
                                    <div className='relative flex min-h-125 flex-col overflow-hidden rounded-xl md:min-h-139.5'>
                                        <div className='absolute inset-0 z-0'>
                                            <OptimizedImage
                                                src={program.cover}
                                                alt=''
                                                aria-hidden='true'
                                                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                                placeholderType='portrait'
                                            />
                                            <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />
                                        </div>

                                        <div className='relative z-10 mt-auto flex h-full flex-col justify-end p-5 text-white'>
                                            <h3
                                                id={`prog-card-title-${index}`}
                                                className='group-focus:text-primary-900 mb-3 -ml-1 rounded-sm px-1 text-xl leading-tight font-bold decoration-white underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline lg:text-2xl'>
                                                {title}
                                            </h3>

                                            <CardContent
                                                className='line-clamp-3 text-gray-200'
                                                content={translation?.content}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className='relative'>
                        <Image
                            src='/images/decoration-program-2.png'
                            alt='images'
                            width={100}
                            height={100}
                            className='absolute -right-15 -bottom-5 z-30 hidden xl:block'
                        />
                        <EmptyState />
                    </div>
                )}
            </div>
        </div>
    );
};
