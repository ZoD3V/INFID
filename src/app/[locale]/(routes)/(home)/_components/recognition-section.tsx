import Image from 'next/image';

import SectionBadge from '@/components/common/section-badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import CommunitySection from './community-section';
import { useTranslations } from 'next-intl';

const RecognitionSection = () => {
    const t = useTranslations('home.recognition');

    const recognitions = [
        {
            title: t('items.award_2017.title'),
            organization: t('items.award_2017.organization'),
            description: t.rich('items.award_2017.description', {
                i: (chunks) => <i>{chunks}</i>
            }),
            logo: '/icons/ic-rekognisi-1.png',
            alt: t('items.award_2017.alt')
        },
        {
            title: t('items.ecosoc.title'),
            organization: t('items.ecosoc.organization'),
            description: t.rich('items.ecosoc.description', {
                i: (chunks) => <i>{chunks}</i>
            }),
            logo: '/icons/ic-rekognisi-2.png',
            alt: t('items.ecosoc.alt')
        },
        {
            title: t('items.ran_pe_awards_2024.title'),
            organization: t('items.ran_pe_awards_2024.organization'),
            description: t.rich('items.ran_pe_awards_2024.description', {
                i: (chunks) => <i>{chunks}</i>
            }),
            logo: '/icons/ic-bnpt.png',
            alt: t('items.ran_pe_awards_2024.alt')
        }
    ];

    return (
        <section
            className='bg-secondary-300 relative pt-16 lg:pt-24 lg:pb-58'
            style={{ backgroundImage: "url('/images/bg-pattern.png')" }}>
            <div className='relative container'>
                {/* Header */}
                <div className='mb-16 flex flex-col items-center'>
                    <SectionBadge className='text-center' textColor='text-white' lineColor='bg-white'>
                        {t('section.badge')}
                    </SectionBadge>
                    <h2 className='text-4xl font-bold tracking-wide text-white lg:text-5xl'>{t('section.title')}</h2>
                </div>

                {/* Recognition Cards */}
                <Carousel
                    opts={{
                        align: 'start',
                        slidesToScroll: 1
                    }}
                    className='w-full overflow-visible pb-8 md:pb-5'>
                    <CarouselContent className='-ml-6'>
                        {recognitions.map((item, index) => (
                            <CarouselItem key={index} className='basis-full pl-6 lg:basis-1/2'>
                                <div className='flex h-full cursor-default items-center rounded-3xl bg-slate-100 px-5 py-6 transition-all duration-300 hover:shadow-teal-500/20'>
                                    <div className='flex items-center gap-5 md:gap-8'>
                                        {/* Logo */}
                                        <div className='shrink-0'>
                                            <Image
                                                src={item.logo}
                                                alt={item.alt}
                                                width={0}
                                                height={0}
                                                sizes='100vw'
                                                className='h-auto w-10.5'
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className='flex-1'>
                                            <h3 className='mb-1 text-xl font-bold md:text-2xl'>{item.title}</h3>
                                            <p className='mb-3 text-xs font-medium tracking-wide text-slate-900 uppercase md:text-sm'>
                                                {item.organization}
                                            </p>
                                            <p className='text-sm leading-relaxed text-slate-700'>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='absolute top-1/2 left-0 -translate-y-1/2 bg-white/80 hover:bg-white md:-left-5' />
                    <CarouselNext className='absolute top-1/2 right-0 -translate-y-1/2 bg-white/80 hover:bg-white md:-right-5' />
                </Carousel>
            </div>
            <CommunitySection />
        </section>
    );
};

export default RecognitionSection;
