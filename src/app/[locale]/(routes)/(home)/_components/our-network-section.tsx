import Image from 'next/image';

import { Maps } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';

const OurNetworkSection = () => {
    return (
        <section className='relative w-full bg-white py-24'>
            <Image
                src='/images/decoration-map.png'
                alt='images'
                width={150}
                height={150}
                className='absolute top-[20%] right-10 hidden xl:block'
            />
            <div className='container flex flex-col items-center'>
                {/* Header */}
                <SectionHeader
                    badge='JARINGAN KAMI'
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title='Kekuatan Pada Anggota'
                    description='INFID membuka pintu bagi organisasi dan individu yang memiliki fokus ketertarikan dan upaya dalam pembangunan Indonesia'
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-2xl'
                    className='mb-20'
                    align='center'
                />
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

export default OurNetworkSection;
