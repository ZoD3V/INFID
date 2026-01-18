'use client';

import Image from 'next/image';

const LogoSection = () => {
    const logos = [
        { name: 'Partner 1', icon: '/images/patner-1.png' },
        { name: 'Ford Foundation', icon: '/images/patner-2.png' },
        { name: 'Global Center', icon: '/images/patner-3.png' },
        { name: 'USAID', icon: '/images/patner-4.png' },
        { name: 'GIZ', icon: '/images/patner-5.png' },
        { name: 'UNDP', icon: '/images/patner-6.png' },
        { name: 'EU', icon: '/images/patner-7.png' },
        { name: 'Partner 8', icon: '/images/patner-8.png' }
    ];

    return (
        <section className='w-full overflow-hidden bg-slate-900 py-8'>
            <div className='mx-auto pl-4 md:px-4'>
                <div className='flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] md:grid md:grid-cols-8 md:overflow-visible'>
                    {logos.map((logo, index) => (
                        <div
                            key={`logo-${index}`}
                            className='flex shrink-0 snap-start items-center justify-center grayscale transition-all duration-300 hover:grayscale-0'>
                            <Image
                                src={logo.icon}
                                alt={logo.name ?? 'logo'}
                                width={120}
                                height={60}
                                className='h-7 w-auto object-contain opacity-90'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoSection;
