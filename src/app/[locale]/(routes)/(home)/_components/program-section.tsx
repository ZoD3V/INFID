import Image from 'next/image';

import { SectionHeader } from '@/components/common/section-header';

import { useTranslations } from 'next-intl';

const ProgramSection = () => {
    const t = useTranslations('home.program_us');

    const programs = [
        {
            title: t('programs.human_rights.title'),
            description: t('programs.human_rights.description'),
            image: '/images/bg-program-1.webp'
        },
        {
            title: t('programs.climate_governance.title'),
            description: t('programs.climate_governance.description'),
            image: '/images/bg-program-1.webp'
        },
        {
            title: t('programs.inclusive_development.title'),
            description: t('programs.inclusive_development.description'),
            image: '/images/bg-program-1.webp'
        }
    ];

    return (
        <section className='bg-secondary-100 relative py-24'>
            <Image
                src='/images/decoration-program-1.png'
                alt='decoration'
                width={200}
                height={200}
                className='absolute top-0 left-0 hidden h-auto w-auto xl:block'
            />
            <Image
                src='/images/decoration-about.png'
                alt='images'
                width={180}
                height={180}
                className='absolute -bottom-10 -left-10 hidden h-auto w-auto xl:block'
            />
            <Image
                src='/images/decoration-program-2.png'
                alt='images'
                width={100}
                height={100}
                className='absolute right-20 bottom-5 hidden xl:block'
            />
            <div className='container'>
                <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
                    {/* Sticky Text Section */}
                    <div className='h-fit lg:sticky lg:top-25'>
                        <SectionHeader
                            badge={t('section.badge')}
                            title={t('section.title')}
                            description={t('section.description')}
                            badgeProps={{
                                textColor: 'text-slate-500',
                                lineColor: 'bg-primary-400'
                            }}
                            titleClassName='text-primary-900'
                            descriptionClassName='text-primary-700'
                            className='mb-20'
                        />
                    </div>

                    {/* Program Cards */}
                    <div className='space-y-6'>
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className='group relative overflow-hidden rounded-2xl border bg-slate-100 p-2'>
                                <div className='relative h-100 overflow-hidden rounded-xl bg-slate-900'>
                                    <Image
                                        src={program.image}
                                        alt={program.title}
                                        width={500}
                                        height={500}
                                        className='h-full w-full object-cover'
                                    />
                                    <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />
                                    <div className='absolute right-0 bottom-0 left-0 p-5 text-white lg:p-6'>
                                        <h3 className='mb-3 text-xl leading-tight font-bold lg:text-2xl'>
                                            {program.title}
                                        </h3>
                                        <p className='mb-4 text-sm leading-relaxed text-gray-200'>
                                            {program.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ProgramSection;
