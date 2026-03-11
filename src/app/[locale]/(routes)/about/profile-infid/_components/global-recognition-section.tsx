'use client';
import Image from 'next/image';

import { SectionHeader } from '@/components/common/section-header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { useTranslations } from 'next-intl';

const GlobalRecognitionSection = () => {
    const t = useTranslations('profile.recognition_section');

    const itemIds = ['01', '02', '03'] as const;

    const accordionData = itemIds.map((id) => ({
        id,
        title: t(`items.${id}.title`),
        content: t(`items.${id}.content`),
        defaultOpen: id === '01'
    }));

    return (
        <div className='relative w-full pb-24'>
            <Image
                src='/images/decoration-about-us-2.png'
                alt='images'
                width={80}
                height={80}
                className='absolute -top-20 right-10 hidden xl:block'
            />
            <div className='container'>
                <div className='grid items-start gap-12 lg:grid-cols-2 lg:gap-16'>
                    {/* Left Section */}

                    <SectionHeader
                        badge={t('header.badge')}
                        badgeProps={{
                            textColor: 'text-slate-500',
                            lineColor: 'bg-primary-400'
                        }}
                        title={t('header.title')}
                        description={t('header.description')}
                        titleClassName='text-primary-900'
                        descriptionClassName='text-primary-700'
                        className='mb-0'
                    />

                    {/* Right Section - Custom Accordion */}
                    <div className='space-y-4'>
                        <Accordion type='single' collapsible defaultValue='item-01' className='space-y-4'>
                            {accordionData.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={`item-${item.id}`}
                                    className='overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 last:border-b data-[state=open]:bg-slate-50'>
                                    <AccordionTrigger className='p-5 shadow-none hover:no-underline data-[state=open]:bg-slate-50'>
                                        <div className='flex w-full items-center gap-4 text-left'>
                                            <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-11 w-11 items-center justify-center rounded-xl border p-2 text-sm font-bold md:h-12 md:w-12 md:text-base'>
                                                {item.id}
                                            </div>
                                            <div className='flex-1 pr-4'>
                                                <h3 className='text-primary-900 text-sm leading-tight font-bold md:text-base'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-5 pb-5'>
                                        <p className='text-sm leading-relaxed text-slate-600 md:text-base'>
                                            {item.content}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalRecognitionSection;
