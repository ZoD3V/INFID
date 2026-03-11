'use client';

import PageHeader from '@/components/common/background-section';
import SectionBadge from '@/components/common/section-badge';
import { Button } from '@/components/ui/button';

import { Landmark, UserSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';

const MemberSection = () => {
    const t = useTranslations('member.member_section');
    const scrollToRequirement = () => {
        const element = document.getElementById('requirement-infid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToRegistration = () => {
        const element = document.getElementById('registration-infid');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const recognitions = [
        {
            title: t('requirement.items.recommendation.title'),
            description: t('requirement.items.recommendation.description'),
            icon: (
                <Landmark
                    className='text-secondary-300 bg-secondary-100 border-secondary-200 size-17 rounded-full border p-5'
                    strokeWidth={1.5}
                />
            ),
            alt: 'Landmark Icon'
        },
        {
            title: t('requirement.items.legality.title'),
            description: t('requirement.items.legality.description'),
            icon: (
                <UserSearch
                    className='text-secondary-300 bg-secondary-100 border-secondary-200 size-17 rounded-full border p-5'
                    strokeWidth={1.5}
                />
            ),
            alt: 'User Search Icon'
        }
    ];

    return (
        <div>
            <PageHeader
                title={t('header.title')}
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: t('header.breadcrumb.home'), href: '/' },
                    { label: t('header.breadcrumb.about'), href: '/' },
                    { label: t('header.breadcrumb.active'), active: true }
                ]}
            />

            <section className='bg-secondary-100 flex flex-col items-center justify-center px-4 py-24'>
                <SectionBadge textColor='text-slate-500' lineColor='bg-slate-400'>
                    {t('hero.badge')}
                </SectionBadge>
                <h2 className='mb-4 max-w-3xl text-center text-4xl font-bold text-gray-900 lg:text-5xl'>
                    {t('hero.title')}
                </h2>
                <p className='mb-6 max-w-2xl text-center text-sm text-slate-600 md:text-base'>
                    {t('hero.description')}
                </p>
                <div className='grid grid-cols-2 gap-4 md:flex'>
                    <Button className='rounded-full' onClick={scrollToRequirement}>
                        {t('hero.buttons.requirement')}
                    </Button>
                    <Button variant='outline' className='rounded-full bg-white' onClick={scrollToRegistration}>
                        {t('hero.buttons.registration')}
                    </Button>
                </div>
            </section>

            <section className='container flex flex-col items-center gap-18 py-24' id='requirement-infid'>
                <div className='space-y-4'>
                    <h2 className='max-w-3xl text-center text-4xl font-bold text-gray-900 lg:text-5xl'>
                        {t('requirement.title')}
                    </h2>
                    <p className='max-w-2xl text-center text-sm text-slate-600 md:text-base'>
                        {t('requirement.items.recommendation.title')}
                    </p>
                </div>
                <div className='grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2'>
                    {recognitions.map((item, index) => (
                        <div
                            key={index}
                            className='flex h-full cursor-default items-center rounded-xl border px-5 py-6 transition-all duration-300'>
                            <div className='flex items-center gap-5 md:gap-8'>
                                {/* icon */}
                                <div className='shrink-0'>{item.icon}</div>

                                {/* Content */}
                                <div className='flex-1'>
                                    <h3 className='text-primary-500 mb-2 text-xl font-bold md:text-2xl'>
                                        {item.title}
                                    </h3>
                                    <p className='text-sm leading-relaxed text-slate-700'>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MemberSection;
