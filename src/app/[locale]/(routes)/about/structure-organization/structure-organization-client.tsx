'use client';

import { useState } from 'react';

import Image from 'next/image';

import PageHeader from '@/components/common/background-section';
import EmptyState from '@/components/common/empty-state';
import { SectionHeader } from '@/components/common/section-header';
import { OrganizationStructureData } from '@/types/organization';

import OrganizationStructure from './_components/organization-section';
import { useTranslations } from 'next-intl';

const StructureOrganizationPage = ({ initialData }: { initialData: OrganizationStructureData[] }) => {
    const t = useTranslations('structure');

    const [activeId, setActiveId] = useState<number | null>(initialData[0]?.id || null);

    const activeStructure = initialData.find((item) => item.id === activeId);

    return (
        <section className='relative overflow-hidden bg-stone-50'>
            <div
                className='absolute inset-0'
                style={{
                    backgroundImage: "url('/logo/bg-pattern-word-black.png')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '80px 80px',
                    opacity: 0.2,
                    pointerEvents: 'none'
                }}
            />
            <PageHeader
                title={t('header.title')}
                backgroundImage='/images/background-meeting.webp'
                breadcrumbs={[
                    { label: t('header.breadcrumb.home'), href: '/' },
                    { label: t('header.breadcrumb.about'), href: '/' },
                    { label: t('header.breadcrumb.active'), active: true }
                ]}
            />

            <div className='relative container py-24'>
                <Image
                    src='/images/decoration-about-us-2.png'
                    alt='decoration'
                    width={80}
                    height={80}
                    sizes='100%'
                    className='absolute top-10 right-0 hidden h-auto w-auto xl:block'
                />

                <SectionHeader
                    badge={t('content.badge')}
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title={t('content.title')}
                    description={t('content.description')}
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-5xl'
                    className='mb-0'
                />

                <div className='scrollbar-hide relative mt-12 flex justify-start gap-4 overflow-x-auto pb-4'>
                    {initialData.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`shrink-0 cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                activeId === item.id
                                    ? 'bg-primary-500 text-white shadow-md'
                                    : 'text-primary-500 bg-white hover:bg-slate-100'
                            }`}>
                            {item.title}
                        </button>
                    ))}
                </div>

                {activeStructure ? (
                    <OrganizationStructure data={activeStructure.peoples} activeTitle={activeStructure.title} />
                ) : (
                    <EmptyState className='bg-white' />
                )}
            </div>
        </section>
    );
};

export default StructureOrganizationPage;
