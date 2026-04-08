'use client';

import { useState } from 'react';

import EmptyState from '@/components/common/empty-state';
import OptimizedImage from '@/components/common/optimized-image';
import { SectionHeader } from '@/components/common/section-header';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LTPeople, LeadershipTimeline } from '@/types/leadership-timeline';

import { PeopleGrid } from './people-grid';
import { useTranslations } from 'next-intl';

const InfidTimeline = ({ initialData }: { initialData: LeadershipTimeline[] }) => {
    const t = useTranslations('profile.timeline_section');

    if (!initialData || initialData.length === 0) {
        return (
            <section className='py-24'>
                <EmptyState className='container mt-0' />
            </section>
        );
    }

    const [activeTimelineId, setActiveTimelineId] = useState<number>(initialData[0].id);
    const [selectedTimeline, setSelectedTimeline] = useState<LeadershipTimeline>(initialData[0]);
    const [selectedPerson, setSelectedPerson] = useState<LTPeople | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleTimelineClick = (item: LeadershipTimeline): void => {
        setActiveTimelineId(item.id);
        setSelectedTimeline(item);
    };

    const handlePersonClick = (person: LTPeople): void => {
        setSelectedPerson(person);
        setDialogOpen(true);
    };

    return (
        <section className='from-secondary-100 min-h-screen bg-linear-to-b to-transparent pt-24' id='history-infid'>
            <div className='container'>
                <SectionHeader
                    badge={t('header.badge')}
                    badgeProps={{ textColor: 'text-slate-500', lineColor: 'bg-primary-400' }}
                    title={t('header.title')}
                    description={t('header.description')}
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-4xl'
                />

                {/* Timeline Navigation */}
                <div className='mb-16'>
                    <div className='relative'>
                        <div className='absolute top-6 right-0 left-0 h-0.5 bg-gray-300' />
                        <div className='scrollbar-hide flex justify-start gap-6 overflow-x-auto px-2 pb-4'>
                            {initialData.map((item, index) => {
                                const isActive = item.id === activeTimelineId;
                                return (
                                    <div
                                        key={item.id}
                                        className='flex w-32 shrink-0 cursor-pointer flex-col items-center'
                                        onClick={() => handleTimelineClick(item)}>
                                        <div className='relative z-10 flex h-12 items-center'>
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white font-bold transition-all ${
                                                    isActive
                                                        ? 'text-primary-600 border-teal-600 shadow'
                                                        : 'text-primary-400 border-gray-300'
                                                }`}>
                                                {index + 1}
                                            </div>
                                        </div>
                                        <p
                                            className={`mt-4 text-center text-sm leading-snug ${isActive ? 'text-primary-500 font-semibold' : 'text-slate-900'}`}>
                                            {item.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className='mt-8'>
                    {selectedTimeline.peoples && selectedTimeline.peoples.length > 0 ? (
                        <PeopleGrid
                            title={selectedTimeline.title}
                            data={selectedTimeline.peoples}
                            onItemClick={handlePersonClick}
                        />
                    ) : (
                        <div className='max-w-full xl:max-w-4xl'>
                            <h2 className='text-primary-500 mb-6 text-2xl font-bold'>{selectedTimeline.title}</h2>
                            <div className='flex flex-col items-start gap-8'>
                                <article
                                    className='prose prose-slate w-full max-w-none'
                                    dangerouslySetInnerHTML={{ __html: selectedTimeline.description || '' }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl'>
                        {selectedPerson && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className='text-start font-bold text-gray-900'>
                                        Profil {selectedTimeline.title}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className='mt-4 flex flex-col items-center gap-6 md:flex-row md:items-start'>
                                    <div className='h-64 w-64 shrink-0 overflow-hidden rounded-xl border bg-slate-100'>
                                        <OptimizedImage
                                            src={selectedPerson.image ?? ''}
                                            alt={selectedPerson.name}
                                            fill
                                            placeholderType='square'
                                        />
                                    </div>
                                    <div className='flex flex-1 flex-col items-center text-center md:items-start md:text-left'>
                                        <h3 className='text-2xl font-bold text-gray-900'>{selectedPerson.name}</h3>
                                        <p className='text-primary-500 text-sm font-medium'>
                                            {selectedPerson.occupation}
                                        </p>
                                        <div className='prose prose-sm mt-4 text-slate-700'>
                                            {selectedPerson.description || 'Tidak ada informasi detail tersedia.'}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Background Decoration */}
            <div
                className='from-secondary-100 relative mt-12 h-115.5 bg-linear-to-t to-transparent'
                style={{
                    backgroundImage: `url('/images/bg-garden.webp'), linear-gradient(180deg, #FAF5E3 0%, rgba(250, 245, 227, 0) 100%)`,
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
        </section>
    );
};

export default InfidTimeline;
