'use client';
import { useState } from 'react';

import Image from 'next/image';

import PageHeader from '@/components/common/background-section';
import { formatLabel } from '@/lib/utils';

import OrganizationStructure from './_components/organization-section';
import { organizationStructures } from './data/organization-data';

const StructureOrganizationPage = () => {
    const [active, setActive] = useState<keyof typeof organizationStructures>('sekretariat_infid');

    return (
        <section className='w-full'>
            <PageHeader
                title='Struktur Organisasi'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Tentang Kami', href: '/' },
                    { label: 'Struktur Organisasi', active: true }
                ]}
            />
            <div className='relative container py-16'>
                <Image
                    src='/images/decoration-about-us-2.png'
                    alt='images'
                    width={80}
                    height={80}
                    className='absolute top-10 right-0 hidden xl:block'
                />
                {/* Header */}
                <div className='mb-4 flex items-center gap-2 text-xs font-medium tracking-wider text-gray-500'>
                    <span className='h-px w-4 bg-slate-400'></span>
                    ORGANISASI
                    <span className='h-px w-4 bg-slate-400'></span>
                </div>

                <h1 className='mb-4 text-4xl leading-tight font-bold text-slate-900 lg:text-5xl'>
                    Struktur Organisasi
                </h1>

                <p className='max-w-3xl text-sm text-slate-900 md:text-base'>
                    Struktur organisasi INFID mencerminkan tata kelola yang kolektif, akuntabel, dan berbasis kolaborasi
                    untuk mendukung advokasi kebijakan dan penguatan masyarakat sipil.
                </p>

                <div className='mt-12 flex justify-start gap-4 overflow-x-auto'>
                    {Object.keys(organizationStructures).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActive(key as keyof typeof organizationStructures)}
                            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${
                                active === key ? 'bg-primary-500 text-white' : 'text-primary500 bg-slate-100'
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
