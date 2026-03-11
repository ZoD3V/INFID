import Image from 'next/image';

import { SectionHeader } from '@/components/common/section-header';

import { useTranslations } from 'next-intl';

export const ProgramINFIDSection = () => {
    const t = useTranslations('profile.program_section');

    const programItems = [
        { image: '/images/news-1.webp' },
        { image: '/images/news-2.webp' },
        { image: '/images/news-3.webp' }
    ];

    return (
        <div className='bg-secondary-100 relative min-h-screen py-24' id='program-infid'>
            <Image
                src='/images/decoration-program-1.png'
                alt='decoration'
                width={200}
                height={200}
                className='absolute top-0 left-0 hidden xl:block'
            />
            <div className='container'>
                {/* Header */}
                <SectionHeader
                    badge={t('header.badge')}
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title={t('header.title')}
                    description={t('header.description')}
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-4xl'
                />

                {/* Program Cards */}
                <div className='relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    <Image
                        src='/images/decoration-program-2.png'
                        alt='images'
                        width={100}
                        height={100}
                        className='absolute -right-10 bottom-0 z-30 hidden xl:block'
                    />
                    {programItems.map((program, index) => (
                        <div key={index} className='group relative overflow-hidden rounded-2xl border bg-slate-100 p-2'>
                            <div className='relative h-125 overflow-hidden rounded-xl md:h-139.5'>
                                <Image
                                    src={program.image}
                                    alt={t(`items.${index}.title`)}
                                    width={500}
                                    height={500}
                                    className='h-full w-full object-cover'
                                />
                                <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />
                                <div className='absolute right-0 bottom-0 left-0 p-5 text-white'>
                                    <h3 className='mb-3 text-xl leading-tight font-bold lg:text-2xl'>
                                        {t(`items.${index}.title`)}
                                    </h3>
                                    <p className='mb-4 text-sm leading-relaxed text-gray-200'>
                                        {t(`items.${index}.description`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
