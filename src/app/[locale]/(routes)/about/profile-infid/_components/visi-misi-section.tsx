import Image from 'next/image';

import SectionBadge from '@/components/common/section-badge';

import { useTranslations } from 'next-intl';

const VisiMisiInfidSection = () => {
    const t = useTranslations('profile.vision_mission_section');

    const missionIds = ['01', '02', '03', '04'] as const;

    const misiItems = missionIds.map((id) => ({
        number: id,
        text: t(`mission.items.${id}`)
    }));

    return (
        <section
            className='relative w-full bg-gray-50 bg-repeat py-24'
            style={{
                backgroundImage: "url('/logo/bg-pattern-word.png')"
            }}>
            <Image
                src='/images/decoration-about.png'
                alt='images'
                width={150}
                height={150}
                className='absolute top-5 right-5 hidden -rotate-180 xl:block'
            />
            <div className='container'>
                {/* Header */}
                <div className='mb-12'>
                    <SectionBadge textColor='text-slate-500' lineColor='bg-slate-400'>
                        {t('header.badge')}
                    </SectionBadge>
                    <h2 className='text-4xl font-bold text-gray-900 lg:text-5xl'>{t('header.title')}</h2>
                </div>

                {/* Content Grid */}
                <div className='grid gap-12 lg:grid-cols-2'>
                    {/* Visi */}
                    <div>
                        <h3 className='text-primary-500 mb-6 text-2xl font-bold'>{t('vision.title')}</h3>
                        <p className='mb-8 text-sm leading-relaxed text-gray-500 md:text-base'>{t('vision.content')}</p>

                        <div className='border-l-primary-500 border-l-3 pl-3'>
                            <div>
                                <h4 className='text-primary-500 mb-3 text-2xl font-bold italic md:text-3xl lg:text-4xl'>
                                    {t('vision.quote_title')}
                                </h4>
                                <p className='text-sm leading-relaxed text-gray-600 italic md:text-base'>
                                    {t('vision.quote_desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Misi */}
                    <div>
                        <h3 className='text-primary-500 mb-6 text-2xl font-bold'>Misi</h3>
                        <div className='space-y-5'>
                            {misiItems.map((item) => (
                                <div
                                    key={item.number}
                                    className='flex items-center gap-4 rounded-lg transition-colors hover:border-teal-300'>
                                    <div className='shrink-0'>
                                        <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-11 w-11 items-center justify-center rounded-xl border p-2 text-sm font-bold md:h-12 md:w-12 md:text-base'>
                                            {item.number}
                                        </div>
                                    </div>
                                    <p className='text-sm leading-relaxed text-gray-700 md:text-base'>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisiMisiInfidSection;
