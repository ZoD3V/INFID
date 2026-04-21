'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import CardContent from '@/components/common/card-content';
import EmptyState from '@/components/common/empty-state';
import OptimizedImage from '@/components/common/optimized-image';
import { SectionHeader } from '@/components/common/section-header';
import { Post } from '@/types/posts';

import { useLocale, useTranslations } from 'next-intl';

const ProgramContent = ({ programData }: { programData: Post[] }) => {
    const t = useTranslations('home.program_us');
    const locale = useLocale();

    return (
        <section id='program-us' className='bg-secondary-100 relative py-24'>
            <Image
                src='/images/decoration-program-1.png'
                alt='decoration'
                width={200}
                height={200}
                className='absolute top-0 left-0 hidden h-auto w-auto xl:block'
            />
            <Image
                src='/images/decoration-about.png'
                alt='images'
                width={180}
                height={180}
                className='absolute -bottom-10 -left-10 hidden h-auto w-auto xl:block'
            />
            <Image
                src='/images/decoration-program-2.png'
                alt='images'
                width={100}
                height={100}
                className='absolute right-20 bottom-5 hidden xl:block'
            />

            <div className='container'>
                <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
                    {/* Sticky Text Section */}
                    <div className='h-fit lg:sticky lg:top-25'>
                        <SectionHeader
                            badge={t('section.badge')}
                            title={t('section.title')}
                            description={t('section.description')}
                            badgeProps={{ textColor: 'text-slate-500', lineColor: 'bg-primary-400' }}
                            titleClassName='text-primary-900'
                            descriptionClassName='text-primary-700'
                            className='mb-20'
                        />
                    </div>

                    {/* Program Cards */}
                    {programData && programData.length > 0 ? (
                        <div className='space-y-6'>
                            {programData.map((program, index) => {
                                const translation =
                                    program?.translations?.find((t) => t.language === locale) ||
                                    program?.translations?.find((t) => t.language === 'id') ||
                                    program?.translations?.[0];

                                return (
                                    <div
                                        key={index}
                                        className='group relative overflow-hidden rounded-2xl border bg-slate-100 p-2'>
                                        <div className='relative h-100 overflow-hidden rounded-xl bg-slate-900'>
                                            <OptimizedImage
                                                src={program.cover}
                                                alt={translation?.title}
                                                className='h-full w-full object-cover'
                                                placeholderType='square'
                                            />

                                            <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />
                                            <div className='absolute right-0 bottom-0 left-0 p-5 text-white lg:p-6'>
                                                <h3 className='mb-3 text-xl leading-tight font-bold lg:text-2xl'>
                                                    {translation?.title}
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
                        <EmptyState />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProgramContent;
