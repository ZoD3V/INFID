'use client';
import PageHeader from '@/components/common/background-section';
import EmptyState from '@/components/common/empty-state';
import { SectionHeader } from '@/components/common/section-header';
import { Research } from '@/types/research';

import ProfileCard from './profile-card';
import { useTranslations } from 'next-intl';

const ResearchFellowSection = ({ initialData }: { initialData: Research[] }) => {
    const t = useTranslations('research-fellow.fellow_section');

    return (
        <section className='w-full bg-gray-50'>
            <PageHeader
                title={t('header.title')}
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: t('header.breadcrumb.home'), href: '/' },
                    { label: t('header.breadcrumb.about'), href: '/' },
                    { label: t('header.breadcrumb.active'), active: true }
                ]}
            />
            <div className='relative container py-24'>
                <SectionHeader
                    badge={t('content.badge')}
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title={t('content.title')}
                    description={t('content.description')}
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-3xl'
                    className='mb-0'
                />

                {initialData.length > 0 ? (
                    <div className='grid grid-cols-1 gap-4 py-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {initialData.map((profile, index) => (
                            <ProfileCard
                                key={profile.id || index}
                                name={profile.name}
                                title={profile.name}
                                image={profile.image ?? ''}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState className='mt-0' />
                )}
            </div>
        </section>
    );
};

export default ResearchFellowSection;
