'use client';
import PageHeader from '@/components/common/background-section';

import ProfileCard from './profile-card';

const ResearchFellowSection = () => {
    const profiles = [
        {
            name: 'Adhita Sri Prabakusuma',
            title: 'Research Fellow on Basic Income, Community-Based Programs and Social Policies',
            image: '/images/testimoni1.png'
        },
        {
            name: 'Ravi Kumar Sharma',
            title: 'Senior Analyst in Behavioral Economics and Social Impact Assessment',
            image: '/images/testimoni2.png'
        },
        {
            name: 'Lina Zhang',
            title: 'Policy Advisor focusing on Universal Basic Income and Labor Market Dynamics',
            image: '/images/testimoni3.png'
        },
        {
            name: 'Carlos Mendes',
            title: 'Project Coordinator for Community Development and Engagement Strategies',
            image: '/images/testimoni4.png'
        },
        {
            name: 'Fatima El-Hassan',
            title: 'Research Scientist specializing in Social Safety Nets and Economic Resilience',
            image: '/images/testimoni5.png'
        },
        {
            name: 'Jasper Li',
            title: 'Consultant on Social Innovation and Poverty Alleviation Programs',
            image: '/images/testimoni6.png'
        },
        {
            name: 'Amina Jafar',
            title: 'Advocate for Youth Empowerment and Educational Equity Initiatives',
            image: '/images/testimoni7.png'
        },
        {
            name: 'Derek Thompson',
            title: 'Data Analyst on Public Policy and Economic Mobility Research',
            image: '/images/testimoni8.png'
        }
    ];

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
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {profiles.map((profile, index) => (
                        <ProfileCard key={index} name={profile.name} title={profile.title} image={profile.image} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchFellowSection;
