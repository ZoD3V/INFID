'use client';

import { useState } from 'react';

import Image from 'next/image';

import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Founder, PeopleGrid } from './people-grid';

type ContentType = 'timeline' | 'founders' | 'leaders';

// Timeline item
export interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
    active: boolean;
    isFounder?: boolean;
    isLeader?: boolean;
}

export interface Person {
    id: number;
    name: string;
    image: string;
    role: string;
    description: string;
}

const timelineData: TimelineItem[] = [
    {
        id: '07',
        year: '2019 - Saat Ini',
        title: 'Tonggak Sejarah Global',
        description:
            'Kerja keras INFID bersama berbagai elemen masyarakat dalam mendorong pengesahan Undang-Undang Tindak Pidana Kekerasan Seksual (UU TPKS) berujung pada pengesahan UU tersebut tahun 2022. INFID memproduksi lima dokumen penguat advokasi, yaitu satu kertas kebijakan, dua briefing paper, satu kertas posisi, dan satu rekomendasi kebijakan. Upaya INFID dalam tidak berhenti sampai pengesahan, advokasi terus berlanjut untuk memastikan implementasi UU TPKS sesuai dengan mandat yang tertuang dalam UU.',
        active: true
    },
    {
        id: '06',
        year: '2016 - 2018',
        title: '',
        description: '',
        active: false
    },
    {
        id: '05',
        year: '2016 - 2018',
        title: '',
        description: '',
        active: false
    },
    {
        id: '04',
        year: '2016 - 2018',
        title: '',
        description: '',
        active: false
    },
    {
        id: '03',
        year: '2016 - 2018',
        title: '',
        description: '',
        active: false
    },
    {
        id: '02',
        year: 'Pendiri',
        title: '',
        description: '',
        active: false,
        isFounder: true
    },
    {
        id: '01',
        year: 'Pemimpin Terdahulu',
        title: '',
        description: '',
        active: false,
        isLeader: true
    }
];

const foundersData: Founder[] = [
    {
        id: 1,
        name: 'Dr. Ahmad Suaedy',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        role: 'Founder & Aktivis HAM',
        description:
            'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
    },
    {
        id: 2,
        name: 'Lies Marcoes',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        role: 'Founder & Gender Specialist',
        description: 'Lies Marcoes adalah seorang peneliti...'
    },
    {
        id: 3,
        name: 'Kamala Chandrakirana',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        role: "Founder & Women's Rights Advocate",
        description: 'Kamala Chandrakirana merupakan advokat...'
    },
    {
        id: 4,
        name: 'Musdah Mulia',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        role: 'Founder & Islamic Scholar',
        description: 'Prof. Dr. Musdah Mulia adalah seorang cendekiawan...'
    }
];

export const InfidTimeline = () => {
    const [contentType, setContentType] = useState<ContentType>('timeline');
    const [activeTimelineId, setActiveTimelineId] = useState<string>(timelineData[0].id);
    const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem>(timelineData[0]);

    const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleTimelineClick = (item: TimelineItem): void => {
        setActiveTimelineId(item.id);

        if (item.isFounder) {
            setContentType('founders');
            return;
        }

        if (item.isLeader) {
            setContentType('leaders');
            return;
        }

        setSelectedTimeline(item);
        setContentType('timeline');
    };

    const handlePersonClick = (person: Person): void => {
        setSelectedPerson(person);
        setDialogOpen(true);
    };

    return (
        <div className='from-secondary-100 min-h-screen bg-linear-to-b to-transparent pt-24' id='history-infid'>
            <div className='container'>
                {/* Header */}
                <SectionHeader
                    badge='JEJAK PERJALANAN'
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title='Perjalanan INFID'
                    description='Tonggak perjalanan INFID dalam memperjuangkan demokrasi, keadilan sosial, dan hak asasi manusia
                        di tingkat nasional dan global.'
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-3xl'
                />

                {/* Timeline */}
                <div className='mb-16'>
                    <div className='relative'>
                        {/* Timeline line */}
                        <div className='absolute top-6 right-0 left-0 h-0.5 bg-gray-300' />

                        <div className='flex justify-between gap-6 overflow-x-auto px-2'>
                            {timelineData.map((item) => {
                                const isActive = item.id === activeTimelineId;

                                return (
                                    <div
                                        key={item.id}
                                        className='flex w-32 shrink-0 cursor-pointer flex-col items-center'
                                        onClick={() => handleTimelineClick(item)}>
                                        <div className='relative z-10 flex h-12 items-center'>
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white font-bold ${
                                                    isActive
                                                        ? 'text-primary-600 border-teal-600'
                                                        : 'text-primary-400 border-gray-300'
                                                }`}>
                                                {item.id}
                                            </div>
                                        </div>

                                        <p
                                            className={`mt-4 text-center text-sm leading-snug ${
                                                isActive ? 'text-primary-500 font-semibold' : 'text-slate-900'
                                            }`}>
                                            {item.year}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {contentType === 'timeline' && (
                    // Timeline Detail
                    <div className='max-w-full xl:max-w-3xl'>
                        <h2 className='text-primary-500 mb-6 text-2xl font-bold'>
                            {selectedTimeline.year} | {selectedTimeline.title}
                        </h2>
                        <p className='leading-relaxed font-semibold text-gray-900'>{selectedTimeline.description}</p>
                        <p className='mt-3 leading-relaxed text-gray-700'>
                            Selain itu, dalam G20 Indonesia 2022, INFID ditunjuk sebagai Chair of Civil 20 (C20) yang
                            mengkoordinir ratusan civil society organisations (CSOs) dari seluruh dunia untuk mendesak
                            pemimpin negara G20 menciptakan solusi atas tujuh isu; tujuan pembangunan berkelanjutan &
                            kemanusiaan; akses vaksin & kesehatan global; kesetaraan gender & disabilitas; perpajakan &
                            keuangan berkelanjutan; lingkungan, lingkungan, keadilan iklim, dan transisi energi;
                            edukasi, digitalisasi, dan civic space; antikorupsi.
                        </p>
                    </div>
                )}

                {contentType === 'founders' && (
                    <PeopleGrid title='Pendiri INFID' data={foundersData} onItemClick={handlePersonClick} />
                )}

                {contentType === 'leaders' && (
                    <PeopleGrid title='Pemimpin Terdahulu' data={foundersData} onItemClick={handlePersonClick} />
                )}

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        {selectedPerson && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className='text-start font-bold text-gray-900'>
                                        {contentType === 'founders'
                                            ? 'Pendiri'
                                            : contentType === 'leaders'
                                              ? 'Pemimpin Terdahulu'
                                              : 'Profil'}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className='mt-4 space-y-6'>
                                    <div className='flex flex-col items-center'>
                                        <div className='mb-4 h-62 w-62 overflow-hidden rounded-lg'>
                                            <img
                                                src={selectedPerson.image}
                                                alt={selectedPerson.name}
                                                className='h-full w-full object-cover'
                                            />
                                        </div>

                                        <h3 className='text-2xl font-bold text-gray-900'>{selectedPerson.name}</h3>

                                        <p className='text-primary-500 text-sm font-medium'>{selectedPerson.role}</p>
                                    </div>

                                    <p className='leading-relaxed text-gray-700'>{selectedPerson.description}</p>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div
                className='from-secondary-100 relative mt-12 h-115.5 bg-linear-to-t to-transparent'
                style={{
                    backgroundImage: `url('/images/bg-garden.webp'), linear-gradient(180deg, #FAF5E3 0%, rgba(250, 245, 227, 0) 100%)`,
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <Image
                    src='/images/decoration-about.png'
                    alt='decoration'
                    width={180}
                    height={180}
                    className='absolute top-0 right-0 hidden rotate-265 xl:block'
                />
            </div>
        </div>
    );
};
