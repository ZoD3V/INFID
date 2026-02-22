'use client';

import PageHeader from '@/components/common/background-section';
import SectionBadge from '@/components/common/section-badge';
import { Button } from '@/components/ui/button';

import RegistrationProcess from './registration-process';
import { ArrowRight, Landmark, UserSearch } from 'lucide-react';

const MemberSection = () => {
    const scrollToRequirement = () => {
        const element = document.getElementById('requirement-infid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToRegistration = () => {
        const element = document.getElementById('registration-infid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const recognitions = [
        {
            title: 'Rekomendasi',
            description: 'Mendapat rekomendasi dari 2 (dua) lembaga anggota INFID yang berada di wilayah/Pulau Jawa',
            icon: (
                <Landmark
                    className='text-secondary-300 bg-secondary-100 border-secondary-200 size-17 rounded-full border p-5'
                    strokeWidth={1.5}
                />
            ),
            alt: 'Logo Kemendagri'
        },
        {
            title: 'Legalitas',
            description:
                'Menerima Anggaran Dasar INFID, khususnya kewajiban anggota INFID yang terdapat dalam BAB VI tentang Keanggotaan dan Anggaran Rumah Tangga INFID dalam BAB II tentang Keanggotaan',
            icon: (
                <UserSearch
                    className='text-secondary-300 bg-secondary-100 border-secondary-200 size-17 rounded-full border p-5'
                    strokeWidth={1.5}
                />
            ),
            alt: 'Logo ECOSOC PBB'
        }
    ];

    return (
        <div>
            <PageHeader
                title='Anggota INFID'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Tentang Kami', href: '/' },
                    { label: 'Anggota INFID', active: true }
                ]}
            />

            <section className='bg-secondary-100 flex flex-col items-center justify-center px-4 py-24'>
                <SectionBadge textColor='text-slate-500' lineColor='bg-slate-400'>
                    KEANGGOTAAN
                </SectionBadge>
                <h2 className='mb-4 max-w-3xl text-center text-4xl font-bold text-gray-900 lg:text-5xl'>
                    Bergabung dalam Gerakan Masyarakat Sipil
                </h2>
                <p className='mb-6 max-w-2xl text-center text-sm text-slate-600 md:text-base'>
                    INFID adalah wadah kolaborasi organisasi masyarakat sipil yang berjuang untuk pembangunan Indonesia
                    yang inklusif, demokratis, dan berkeadilan.
                </p>
                <div className='grid grid-cols-2 gap-4 md:flex'>
                    <Button className='rounded-full' onClick={scrollToRequirement}>
                        Lihat Persyaratan
                    </Button>
                    <Button variant='outline' className='rounded-full bg-white' onClick={scrollToRegistration}>
                        Alur Pendaftaran
                    </Button>
                </div>
            </section>

            <section className='container flex flex-col items-center gap-18 py-24' id='requirement-infid'>
                <div className='space-y-4'>
                    <h2 className='max-w-3xl text-center text-4xl font-bold text-gray-900 lg:text-5xl'>
                        Persyaratan Anggota
                    </h2>
                    <p className='max-w-2xl text-center text-sm text-slate-600 md:text-base'>
                        INFID adalah wadah kolaborasi organisasi masyarakat sipil yang berjuang untuk pembangunan
                        Indonesia yang inklusif, demokratis, dan berkeadilan.
                    </p>
                </div>
                <div className='grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2'>
                    {recognitions.map((item, index) => (
                        <div
                            key={index}
                            className='flex h-full cursor-default items-center rounded-xl border px-5 py-6 transition-all duration-300'>
                            <div className='flex items-center gap-5 md:gap-8'>
                                {/* icon */}
                                <div className='shrink-0'>{item.icon}</div>

                                {/* Content */}
                                <div className='flex-1'>
                                    <h3 className='text-primary-500 mb-2 text-xl font-bold md:text-2xl'>
                                        {item.title}
                                    </h3>
                                    <p className='text-sm leading-relaxed text-slate-700'>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <RegistrationProcess />
        </div>
    );
};

export default MemberSection;
