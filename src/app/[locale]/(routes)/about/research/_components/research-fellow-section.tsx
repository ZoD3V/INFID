'use client';
import PageHeader from '@/components/common/background-section';
import EmptyState from '@/components/common/empty-state';
import { Research } from '@/types/research';

import ProfileCard from './profile-card';

const ResearchFellowSection = ({ initialData }: { initialData: Research[] }) => {
    return (
        <section className='w-full bg-gray-50'>
            <PageHeader
                title='INFID Research Fellow'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Tentang Kami', href: '/' },
                    { label: 'INFID Research Fellow', active: true }
                ]}
            />
            <div className='relative container py-24'>
                {initialData.length > 0 ? (
                    initialData.map((profile, index) => (
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            <ProfileCard
                                key={index}
                                name={profile.name}
                                title={profile.name}
                                image={profile.image ?? ''}
                            />
                        </div>
                    ))
                ) : (
                    <EmptyState className='mt-0' />
                )}
            </div>
        </section>
    );
};

export default ResearchFellowSection;
