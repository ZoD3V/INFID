'use client';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { ArrowDown, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Home = () => {
    const t = useTranslations('hero');

    const scrollToAbout = () => {
        const element = document.getElementById('about-us');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className='relative min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: "url('/images/background-home.webp')" }}>
            <div className='absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(16,123,134,0)_0%,rgba(16,123,134,0.8)_100%)]'></div>{' '}
            <div
                onClick={scrollToAbout}
                className='absolute bottom-5 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform animate-bounce cursor-pointer'>
                <Image src='/icons/ic-arrow-down.png' alt='icon' width={15} height={15} />
            </div>
            <div className='relative z-20 container flex min-h-screen items-center pt-12'>
                <div className='grid w-full gap-12 py-20 lg:grid-cols-2'>
                    {/* Left Content */}
                    <div className='flex flex-col justify-center space-y-8'>
                        {/* Tag */}
                        <div className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm'>
                            <span className='h-2 w-2 animate-pulse rounded-full bg-orange-500'></span>
                            <p className='text-xs font-medium tracking-wide text-white'>{t('tagline')}</p>
                        </div>

                        {/* Main Heading */}
                        <div className='space-y-5 leading-[0.95]'>
                            <h1 className='text-3xl font-extrabold text-white lg:text-4xl'>{t('title')}</h1>

                            <h1 className='text-xl font-extrabold text-white lg:text-2xl'>{t('subtitle')}</h1>
                        </div>

                        {/* Description */}
                        <p className='max-w-xl border-l border-white pl-4 text-base leading-relaxed text-slate-200'>
                            {t('description')}
                        </p>

                        {/* CTA Buttons */}
                        <div className='grid grid-cols-2 gap-4 md:flex'>
                            <Button variant='secondary' className='rounded-full font-semibold'>
                                Jelajahi Program
                                <ArrowRight />
                            </Button>
                            <Button
                                variant='outline'
                                className='rounded-full border-white/30 bg-slate-500/10 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-slate-100'>
                                Pelajari Sejarah
                            </Button>
                        </div>
                    </div>

                    {/* Right Stats Card */}
                    <div className='flex w-full items-end lg:justify-end'>
                        <div className='w-full space-y-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md lg:w-xs'>
                            {/* Header */}
                            <div className='flex items-center justify-between gap-2 border-b border-white/10 pb-8 lg:pb-4'>
                                <h3 className='text-sm font-semibold tracking-wide text-white lg:text-xs'>
                                    {t('titleImpact')}
                                </h3>
                                <span className='h-2 w-2 rounded-full bg-orange-500'></span>
                            </div>

                            {/* Stats */}
                            <div className='space-y-6'>
                                {/* Stat 1 */}
                                <div className='space-y-2'>
                                    <div className='text-3xl font-bold text-white'>80</div>
                                    <div className='text-sm text-gray-400 lg:text-base'>{t('memberOrganizations')}</div>
                                </div>

                                {/* Stat 2 */}
                                <div className='space-y-2'>
                                    <div className='text-3xl font-bold text-white'>200+</div>
                                    <div className='text-sm text-gray-400 lg:text-base'>
                                        {t('policyRecommendations')}
                                    </div>
                                </div>

                                {/* Stat 3 */}
                                <div className='space-y-2'>
                                    <div className='text-3xl font-bold text-white'>ECOSOC</div>
                                    <div className='text-sm text-gray-400 lg:text-base'>{t('consultativeStatus')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
