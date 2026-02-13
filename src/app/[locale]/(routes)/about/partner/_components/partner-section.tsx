'use client';

import Image from 'next/image';

import PageHeader from '@/components/common/background-section';
import { Partner, PartnerCard } from '@/components/common/partner-card';
import { SectionHeader } from '@/components/common/section-header';

const PartnersSection = () => {
    const nationalPartners: Partner[] = [
        { name: 'Kantor Staf Presiden', logo: '/logo/logo-mitra-nasional-1.png' },
        { name: 'Kemnaker', logo: '/logo/logo-mitra-nasional-2.png' },
        { name: 'Kementerian PPN/Bappenas', logo: '/logo/logo-mitra-nasional-3.png' },
        { name: 'Kemenko Polhukam', logo: '/logo/logo-mitra-nasional-4.png' },
        { name: 'Universitas Indonesia', logo: '/logo/logo-mitra-nasional-5.png' },
        { name: 'BPS', logo: '/logo/logo-mitra-nasional-6.png' },
        { name: 'BPIP', logo: '/logo/logo-mitra-nasional-7.png' },
        { name: 'Kementerian Dalam Negeri', logo: '/logo/logo-mitra-nasional-8.png' },
        { name: 'Ansor', logo: '/logo/logo-mitra-nasional-9.png' },
        { name: 'Pemkot Yogyakarta', logo: '/logo/logo-mitra-nasional-10.png' }
    ];

    const internationalPartners: Partner[] = [
        { name: 'Ford Foundation', logo: '/logo/logo-mitra-internasional-1.png' },
        { name: 'European Union', logo: '/logo/logo-mitra-internasional-2.png' },
        { name: 'NED', logo: '/logo/logo-mitra-internasional-3.png' },
        { name: 'CIC', logo: '/logo/logo-mitra-internasional-4.png' },
        { name: 'Mennonite Central Committee', logo: '/logo/logo-mitra-internasional-5.png' },
        { name: 'Global Center', logo: '/logo/logo-mitra-internasional-6.png' },
        { name: 'KOICA', logo: '/logo/logo-mitra-internasional-7.png' },
        { name: 'UNDP', logo: '/logo/logo-mitra-internasional-8.png' }
    ];

    return (
        <section className='bg-gray-50'>
            <PageHeader
                title='Mitra Pembangunan'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Tentang Kami', href: '/' },
                    { label: 'Mitra Pembangunan', active: true }
                ]}
            />
            <div className='relative container py-24'>
                <Image
                    src='/images/decoration-about-us-2.png'
                    alt='images'
                    width={80}
                    height={80}
                    className='absolute top-10 right-0 z-20 hidden xl:block'
                />
                {/* Header */}

                <SectionHeader
                    badge='JARINGAN & KOLABORASI'
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title='Mitra Pembangunan'
                    description='Kami bekerja sama dengan berbagai organisasi nasional dan internasional untuk mewujudkan pembangunan
                    yang inklusif dan berkelanjutan.'
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-3xl'
                    className='mb-0'
                />

                {/* National Partners */}
                <div>
                    <div className='flex items-center py-24'>
                        <div className='grow border-t border-gray-200'></div>

                        <h3 className='text-primary-500 mx-4 text-center text-xl font-semibold md:text-2xl'>
                            Mitra Nasional
                        </h3>

                        <div className='grow border-t border-gray-200'></div>
                    </div>

                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5'>
                        {nationalPartners.map((partner, index) => (
                            <PartnerCard key={index} partner={partner} />
                        ))}
                    </div>
                </div>

                {/* International Partners */}
                <div>
                    <div className='flex items-center py-24'>
                        <div className='grow border-t border-gray-200'></div>

                        <h3 className='text-primary-500 mx-4 text-center text-xl font-semibold md:text-2xl'>
                            Mitra Internasional
                        </h3>

                        <div className='grow border-t border-gray-200'></div>
                    </div>
                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-5'>
                        {internationalPartners.map((partner, index) => (
                            <PartnerCard key={index} partner={partner} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
