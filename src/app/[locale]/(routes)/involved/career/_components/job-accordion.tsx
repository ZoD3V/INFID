'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { format } from 'date-fns';
import { FileText } from 'lucide-react';

type Job = {
    id: number;
    title: string;
    status: string;
    deadline: string;
    jobType: string;
    location: string;
    image: string;
    background: string;
    features: string[];
    about: string;
    expectations: string[];
};

export function JobAccordion({ data }: { data: Job[] }) {
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
                {data.map((item) => (
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
                                            {item.status}
                                        </Badge>
                                        <span className='text-sm text-slate-500'>
                                            Batas Waktu: {format(new Date(item.deadline), 'dd MMM yyyy')}
                                        </span>
                                    </div>

                                    <h3 className='group-data-[state=open]:text-primary-500 text-base font-bold text-slate-900 transition-all duration-300 lg:text-lg'>
                                        {item.title}
                                    </h3>
                                </div>

                                <div className='hidden text-right text-sm md:block'>
                                    <div className='font-semibold'>{item.jobType}</div>
                                    <div className='text-slate-600'>{item.location}</div>
                                </div>
                            </div>
                        </AccordionTrigger>

                        {/* CONTENT */}
                        <AccordionContent className='px-6 pb-6'>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
                                {/* IMAGE */}
                                <div className='md:col-span-4'>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className='w-full rounded-xl border object-cover'
                                    />
                                </div>

                                {/* DETAIL */}
                                <div className='space-y-6 md:col-span-8'>
                                    <Section title='Latar Belakang'>{item.background}</Section>

                                    <Section title='Fitur Tambahan'>
                                        <ol className='list-decimal space-y-1 pl-4'>
                                            {item.features.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            ))}
                                        </ol>
                                    </Section>

                                    <Section title={`Tentang ${item.title.split(' ')[0]}`}>{item.about}</Section>

                                    <Section title='Karakter dan Ekspektasi'>
                                        <ol className='list-decimal space-y-1 pl-4'>
                                            {item.expectations.map((e, i) => (
                                                <li key={i}>{e}</li>
                                            ))}
                                        </ol>
                                    </Section>

                                    {/* ACTION */}
                                    <div className='flex flex-col items-start justify-between border-t border-t-slate-200 pt-4 lg:flex-row lg:items-center'>
                                        <h3 className='text-base font-bold md:text-lg'>Apply Sekarang!</h3>
                                        <div className='flex flex-wrap gap-3 pt-4'>
                                            <Button variant='outline' className='rounded-full'>
                                                <FileText />
                                                PDF
                                            </Button>
                                            <Button variant='outline' className='rounded-full'>
                                                Kirim Email
                                            </Button>
                                            <Button className='rounded-full'>Submit via Link</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

/* 🔹 HELPER COMPONENT */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h4 className='text-base font-bold text-slate-900'>{title}</h4>
            <div className='mt-2 text-sm leading-relaxed text-slate-600'>{children}</div>
        </section>
    );
}
