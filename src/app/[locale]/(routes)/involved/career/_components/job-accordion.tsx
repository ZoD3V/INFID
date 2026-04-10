'use client';

import { useEffect, useState } from 'react';

import OptimizedImage from '@/components/common/optimized-image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';

import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import Cookies from 'js-cookie';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function JobAccordion({ data }: { data: Job[] }) {
    const t = useTranslations('button');
    const [langIndex, setLangIndex] = useState(0);

    useEffect(() => {
        const locale = Cookies.get('NEXT_LOCALE') || 'id';
        setLangIndex(locale === 'id' ? 0 : 1);
    }, []);

    if (!data.length) {
        return (
            <div className='rounded-xl border p-6 text-center text-slate-500'>
                Tidak ada lowongan yang sesuai filter
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {/* ACCORDION */}
            <Accordion type='single' collapsible className='space-y-4'>
                {data.map((item) => {
                    const translation = item?.description?.[langIndex] || item?.description?.[0];
                    return (
                        <AccordionItem
                            key={item.id}
                            value={`item-${item.id}`}
                            className='overflow-hidden rounded-xl border bg-white last:border-b'>
                            {/* HEADER */}
                            <AccordionTrigger className='group rounded-b-none p-5 hover:no-underline data-[state=open]:mb-5 data-[state=open]:bg-slate-50'>
                                <div className='flex w-full items-center justify-between gap-4'>
                                    <div className='space-y-1 text-left'>
                                        <div className='flex items-center gap-2'>
                                            <Badge className='bg-secondary-300 rounded-full text-xs font-medium'>
                                                {item.employment_type}
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
                                        <div className='font-semibold'>{item.work_location_type}</div>
                                        <div className='text-slate-600'>{item.location}</div>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            {/* CONTENT */}
                            <AccordionContent className='px-6 pb-6'>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
                                    {/* IMAGE */}
                                    <div className='relative md:col-span-4'>
                                        <OptimizedImage
                                            src={item.image}
                                            alt={item.title}
                                            className='h-full w-full rounded-xl border object-cover'
                                            placeholderType='portrait'
                                        />
                                    </div>

                                    {/* DETAIL */}
                                    <div className='space-y-6 md:col-span-8'>
                                        <Section title='Deskripsi Pekerjaan'>
                                            <div className='whitespace-pre-line'>{translation.text}</div>
                                        </Section>

                                        {item.position && <Section title='Posisi'>{item.position}</Section>}

                                        {/* ACTION */}
                                        <div className='flex flex-col items-start justify-between border-t border-t-slate-200 pt-4 lg:flex-row lg:items-center'>
                                            <h3 className='text-base font-bold md:text-lg'>Apply Sekarang!</h3>
                                            <div className='flex flex-wrap gap-3 pt-4'>
                                                <Button variant='outline' className='rounded-full'>
                                                    <FileText className='mr-2 h-4 w-4' />
                                                    PDF
                                                </Button>

                                                {item.link ? (
                                                    <Button className='rounded-full' asChild>
                                                        <a href={item.link} target='_blank' rel='noopener noreferrer'>
                                                            Submit via Link
                                                        </a>
                                                    </Button>
                                                ) : (
                                                    <Button className='rounded-full'>Kirim Email</Button>
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
