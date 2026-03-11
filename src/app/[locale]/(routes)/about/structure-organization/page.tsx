'use client';
import { useState } from 'react';

import Image from 'next/image';

import PageHeader from '@/components/common/background-section';
import { SectionHeader } from '@/components/common/section-header';
import { formatLabel } from '@/lib/utils';

import OrganizationStructure from './_components/organization-section';
import { organizationStructures } from './data/organization-data';
import { useTranslations } from 'next-intl';

const StructureOrganizationPage = () => {
    const t = useTranslations('structure');
    const [active, setActive] = useState<keyof typeof organizationStructures>('sekretariat_infid');

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
                backgroundImage='/images/background-about-us.webp'
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
                    className='absolute top-10 right-0 hidden xl:block'
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
                <div className='relative mt-12 flex justify-start gap-4 overflow-x-auto'>
                    {Object.keys(organizationStructures).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActive(key as keyof typeof organizationStructures)}
                            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${
                                active === key ? 'bg-primary-500 text-white' : 'text-primary-500 bg-white'
                            }`}>
                            {formatLabel(key)}
                        </button>
                    ))}
                </div>

                <OrganizationStructure data={organizationStructures[active]} activeTitle={active} />
            </div>
        </section>
    );
};

export default StructureOrganizationPage;
