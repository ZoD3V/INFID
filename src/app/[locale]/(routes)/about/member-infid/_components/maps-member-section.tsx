import React from 'react';

import Image from 'next/image';

import { Maps } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';

const MapsMemberSection = () => {
    return (
        <section className='relative w-full bg-white py-24'>
            <Image
                src='/images/decoration-map.png'
                alt='images'
                width={150}
                height={150}
                className='absolute top-10 right-10 hidden xl:block'
            />
            <div className='container flex flex-col items-center'>
                <Maps />
                <SectionBadge
                    lineColor='bg-primary-500 h-0.5 w-3 rounded-full'
                    textColor='text-primary-500'
                    className='mt-16 rounded-full bg-white px-3 py-2 font-bold shadow-sm'>
                    80 Anggota untuk perubahan
                </SectionBadge>
            </div>
        </section>
    );
};

export default MapsMemberSection;
