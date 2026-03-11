import Image from 'next/image';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const AboutUsSection = () => {
    const t = useTranslations('home.hero_section');

    const b = useTranslations('button');
    const videoId = 'U0t1MvVi-9I';
    const startTime = 74;
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;

    return (
        <section className='bg-secondary-100 relative py-24' id='about-us'>
            <Image
                src='/images/decoration-about-us-2.png'
                alt='images'
                width={90}
                height={90}
                className='absolute top-10 right-10 hidden h-auto w-auto xl:block'
            />
            <div className='container'>
                <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-12'>
                    {/* Left Side - Images */}
                    <div className='relative'>
                        {/* Main Image */}
                        <Image
                            src='/images/decoration-program-2.png'
                            alt='images'
                            width={100}
                            height={100}
                            className='absolute -top-10 left-10 hidden xl:block'
                        />
                        <Image
                            src='/images/about-us.webp'
                            alt='images'
                            width={500}
                            height={500}
                            className='z-1 h-auto w-full'
                        />

                        <Dialog>
                            <DialogTrigger asChild>
                                {/* Play Button */}
                                <div className='group absolute bottom-10 left-10 z-0 h-50 w-50 cursor-pointer sm:bottom-15 sm:left-15 md:bottom-15 md:left-25 xl:bottom-15 xl:left-25'></div>
                            </DialogTrigger>

                            {/* Video Popup Modal */}
                            <DialogContent className='max-w-[calc(100%-2rem)] overflow-hidden border-none bg-black p-0 md:max-w-184 [&>button]:hidden'>
                                <VisuallyHidden>
                                    <DialogHeader>
                                        <DialogTitle>Video Perjalanan SDGs Tangerang - INFID</DialogTitle>
                                    </DialogHeader>
                                </VisuallyHidden>
                                <div className='aspect-video w-full'>
                                    <iframe
                                        width='100%'
                                        height='100%'
                                        src={videoSrc}
                                        title='YouTube video player'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                        allowFullScreen
                                        className='border-none'></iframe>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Decorative Logo */}
                        <div className='pointer-events-none absolute -bottom-20 -left-20 z-0 hidden xl:block'>
                            <Image
                                src='/images/decoration-about.png'
                                alt='images'
                                width={200}
                                height={200}
                                className='z-1 h-auto w-45'
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div>
                        <div className='text-primary mb-4 flex items-center gap-2 text-xs font-medium tracking-wider'>
                            <span className='bg-primary h-px w-4'></span>
                            {t('aboutUsTag')}
                            <span className='bg-primary h-px w-4'></span>
                        </div>

                        <h2 className='text-primary mb-6 text-4xl leading-tight font-bold lg:text-5xl'>
                            {t('aboutUsTitle')}
                        </h2>

                        <div className='space-y-4 text-left text-base leading-relaxed text-slate-600'>
                            <p>{t('aboutUsDescription1')}</p>

                            <p>{t('aboutUsDescription2')}</p>

                            <p>{t('aboutUsDescription3')}</p>
                        </div>

                        {/* Info Box */}
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex items-center gap-4'>
                                <Image src='/icons/ic-user-signal.png' alt='icon' width={50} height={50} />
                                <div>
                                    <h3 className='mb-1 text-base font-bold text-gray-900 lg:mb-2 lg:text-lg'>
                                        {t('aboutUsOrganizationTitle')}
                                    </h3>
                                    <p className='text-sm leading-relaxed text-gray-600 md:text-base'>
                                        {t('aboutUsOrganizationDescription')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className='group mt-6 inline-flex cursor-pointer items-center gap-2 border-b border-slate-900 pb-2 text-sm font-semibold lg:mt-8'>
                            {b('readMore')}
                            <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
