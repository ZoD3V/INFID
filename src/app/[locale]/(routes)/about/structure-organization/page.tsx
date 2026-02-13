'use client';
import { useState } from 'react';

import Image from 'next/image';

import PageHeader from '@/components/common/background-section';
import { SectionHeader } from '@/components/common/section-header';
import { formatLabel } from '@/lib/utils';

import OrganizationStructure from './_components/organization-section';
import { organizationStructures } from './data/organization-data';

const StructureOrganizationPage = () => {
    const [active, setActive] = useState<keyof typeof organizationStructures>('sekretariat_infid');

    return (
        <section className='overflow-hidden bg-slate-100' style={{ backgroundImage: "url('/images/bg-pattern.png')" }}>
            <PageHeader
                title='Para Penggerak Perubahan'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Tentang Kami', href: '/' },
                    { label: 'Para Penggerak Perubahan', active: true }
                ]}
            />
            <div className='relative container py-24'>
                <Image
                    src='/images/decoration-about-us-2.png'
                    alt='images'
                    width={80}
                    height={80}
                    className='absolute top-10 right-0 hidden xl:block'
                />
                {/* Header */}

                <SectionHeader
                    badge='STRUKTUR ORGANISASI'
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title='Para Penggerak Perubahan'
                    description='Kami menyebutnya #INFIDSquad, terdiri dari para penggerak perubahan yang memiliki ketertarikan dan semangat perjuangan pada isu pembangunan. Struktur organisasi INFID mencerminkan tata kelola yang kolektif, akuntabel, dan berbasis kolaborasi untuk mendukung advokasi kebijakan dan penguatan masyarakat sipil.'
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-3xl'
                    className='mb-0'
                />

                <div className='mt-12 flex justify-start gap-4 overflow-x-auto'>
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
