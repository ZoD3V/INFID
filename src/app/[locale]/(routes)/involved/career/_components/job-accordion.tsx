'use client';

import { useEffect, useState } from 'react';

import { ArticleContent } from '@/components/common/article-content';
import EmptyState from '@/components/common/empty-state';
import OptimizedImage from '@/components/common/optimized-image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';

import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { FileText } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export function JobAccordion({ data }: { data: Job[] }) {
    const t = useTranslations('button');
    const j = useTranslations('job');
    const locale = useLocale();

    if (!data.length) {
        return <EmptyState />;
    }

    return (
        <div className='space-y-6'>
            <Accordion type='single' collapsible className='space-y-4'>
                {data.map((item) => {
                    const translation =
                        item?.description?.find((t) => t.language === locale) ||
                        item?.description?.find((t) => t.language === 'id') ||
                        item?.description?.[0];
                    return (
                        <AccordionItem
                            key={item.id}
                            value={`item-${item.id}`}
                            className='relative overflow-hidden rounded-xl border bg-white last:border-b'>
                            <AccordionTrigger
                                aria-label={`View details for ${item.title}`}
                                className='group focus-visible:ring-primary-500 rounded-b-none p-5 transition-all hover:no-underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=open]:mb-5 data-[state=open]:bg-slate-50'>
                                <div className='flex w-full items-center justify-between gap-4'>
                                    <div className='space-y-1 text-left'>
                                        <div className='flex items-center gap-2'>
                                            <Badge className='bg-secondary-300 rounded-full text-xs font-medium'>
                                                {item?.employment_type ?? '-'}
                                            </Badge>
                                            <span className='text-sm text-slate-500'>
                                                {t('deadline')}{' '}
                                                {item.closing_date
                                                    ? format(parseISO(item.closing_date), 'dd MMM yyyy', {
                                                          locale: id
                                                      })
                                                    : '-'}
                                            </span>
                                        </div>

                                        <h3 className='group-data-[state=open]:text-primary-500 text-base font-bold text-slate-900 transition-all duration-300 lg:text-lg'>
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className='hidden text-right text-sm md:block'>
                                        <div className='font-semibold text-slate-900'>{item.work_location_type}</div>
                                        <div className='text-slate-600'>{item.location}</div>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className='px-6 pb-6'>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
                                    <div className='relative h-80 md:col-span-4'>
                                        <OptimizedImage
                                            src={item.image}
                                            alt={`Banner image for ${item.title}`}
                                            className='h-full w-full rounded-xl border object-cover'
                                            placeholderType='square'
                                        />
                                    </div>

                                    <div className='space-y-6 md:col-span-8'>
                                        <Section title={j('description_work')}>
                                            <ArticleContent content={translation.text} />
                                        </Section>

                                        {item.position && <Section title={j('position')}>{item.position}</Section>}

                                        <div className='flex flex-col items-start justify-between border-t border-t-slate-200 pt-4 lg:flex-row lg:items-center'>
                                            <h3 className='text-base font-bold md:text-lg'>{j('cta')}</h3>
                                            <div className='flex flex-wrap gap-3 pt-4'>
                                                {item.attachment && (
                                                    <Button
                                                        asChild
                                                        variant='outline'
                                                        className='focus-visible:ring-primary-500 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2'
                                                        aria-label={`Download job description for ${item.title} as PDF`}>
                                                        <a
                                                            href={item.attachment}
                                                            download
                                                            target='_blank'
                                                            rel='noopener noreferrer'>
                                                            <FileText className='mr-2 h-4 w-4' />
                                                            PDF
                                                        </a>
                                                    </Button>
                                                )}

                                                {item.link && (
                                                    <Button
                                                        className='bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-500 rounded-full text-white focus-visible:ring-2 focus-visible:ring-offset-2'
                                                        asChild>
                                                        <a
                                                            href={item.link}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            aria-label={`Submit application for ${item.title} via external link`}>
                                                            {locale == 'id' ? 'Info Lebih Lanjut' : 'Find Out More'}
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h4 className='text-base font-bold text-slate-900'>{title}</h4>
            <div className='mt-2 text-sm leading-relaxed text-slate-600'>{children}</div>
        </section>
    );
}
