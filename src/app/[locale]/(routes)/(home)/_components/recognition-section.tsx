import React from 'react';

import Image from 'next/image';

const RecognitionSection = () => {
    const recognitions = [
        {
            title: 'Penghargaan Ormas 2017',
            organization: 'KEMENTERIAN DALAM NEGERI RI',
            description:
                'Penerima penghargaan Bidang Sosial Kemanusiaan atas kontribusi nyata dalam pembangunan masyarakat.',
            logo: '/icons/ic-rekognisi-1.png',
            alt: 'Logo Kemendagri'
        },
        {
            title: 'Special Consultative Status',
            organization: 'DEWAN EKONOMI & SOSIAL PBB',
            description:
                'Status konsultatif resmi sejak 2004 (Ref. No: D1035), membawa suara Indonesia ke forum global.',
            logo: '/icons/ic-rekognisi-2.png',
            alt: 'Logo ECOSOC PBB'
        }
    ];

    return (
        <section className='bg-secondary-300 relative overflow-hidden py-24'>
            <div
                className='pointer-events-none absolute top-0 left-0 h-64 w-full bg-top bg-no-repeat brightness-70'
                style={{ backgroundImage: 'url(/images/bg-futuristic.png)', backgroundSize: 'cover' }}
            />
            <div className='relative container'>
                {/* Header */}
                <div className='mb-16 text-center'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='mb-4 flex items-center gap-2 text-sm font-medium tracking-widest text-white'>
                            <span className='h-px w-4 bg-white'></span>
                            Pengakuan Nasional & Internasional
                            <span className='h-px w-4 bg-white'></span>
                        </div>
                    </div>
                    <h2 className='text-5xl font-bold tracking-wide text-white'>Pengakuan dan Kolaborasi Global</h2>
                </div>

                {/* Recognition Cards */}
                <div className='mx-auto grid gap-8 md:grid-cols-2'>
                    {recognitions.map((item, index) => (
                        <div
                            key={index}
                            className='rounded-3xl bg-[#F7F5F2] px-5 py-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-teal-500/20'>
                            <div className='flex items-center gap-5 md:gap-8'>
                                {/* Logo */}
                                <div className='shrink-0'>
                                    <Image src={item.logo} alt={item.alt} width={42} height={42} />
                                </div>

                                {/* Content */}
                                <div className='flex-1'>
                                    <div>
                                        <h3 className='mb-1 text-xl font-bold md:text-2xl'>{item.title}</h3>
                                        <p className='mb-3 text-xs font-medium tracking-wide text-slate-900 uppercase md:text-sm'>
                                            {item.organization}
                                        </p>
                                    </div>
                                    <p className='text-xs leading-relaxed text-slate-700 md:text-sm'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecognitionSection;
