'use client';
import { useState } from 'react';

import PageHeader from '@/components/common/background-section';
import CardContent from '@/components/common/card-content';
import EmptyState from '@/components/common/empty-state';
import OptimizedImage from '@/components/common/optimized-image';
import { SectionHeader } from '@/components/common/section-header';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Research, ResearchPerson } from '@/types/research';

import ProfileCard from './profile-card';
import { Linkedin, Mail } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const ResearchFellowSection = ({ initialData }: { initialData: Research[] }) => {
    const t = useTranslations('research-fellow.fellow_section');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedPerson, setSelectedPerson] = useState<ResearchPerson | null>(null);
    const locale = useLocale();

    const handlePersonClick = async (person: Research): Promise<void> => {
        const res = await apiRequest.get<ResearchPerson>(`${API_ENDPOINTS.people}/${person.id}`);
        if (res.status_code == 200) {
            setSelectedPerson(res.data);
        } else {
            setSelectedPerson(null);
        }

        setDialogOpen(true);
    };

    return (
        <section className='w-full bg-gray-50'>
            <PageHeader
                title={t('header.title')}
                backgroundImage='/images/background-meeting.webp'
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
                                onItemClick={() => handlePersonClick(profile)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl'>
                        {selectedPerson && (
                            <>
                                {(() => {
                                    const translation =
                                        selectedPerson.description?.find((t) => t.language === locale) ||
                                        selectedPerson.description?.find((t) => t.language === 'id') ||
                                        selectedPerson.description?.[0];

                                    return (
                                        <>
                                            <DialogHeader>
                                                <DialogTitle className='text-start font-bold text-gray-900'>
                                                    Research Fellow
                                                </DialogTitle>
                                                <DialogDescription />
                                            </DialogHeader>

                                            <div className='mt-4 flex flex-col items-center gap-6 md:flex-row md:items-start'>
                                                <div className='relative h-64 w-64 shrink-0 overflow-hidden rounded-xl border bg-slate-100'>
                                                    <OptimizedImage
                                                        src={selectedPerson.image ?? ''}
                                                        alt={selectedPerson.name ?? 'Person Image'}
                                                        fill
                                                        className='object-cover'
                                                        sizes='(max-width: 768px) 100vw, 256px'
                                                        placeholderType='square'
                                                    />
                                                </div>

                                                <div className='flex flex-1 flex-col items-center text-center md:items-start md:text-left'>
                                                    <h3 className='text-2xl font-bold text-gray-900'>
                                                        {selectedPerson.name}
                                                    </h3>
                                                    <p className='text-primary-500 text-sm font-medium'>
                                                        {selectedPerson.occupation ?? '-'}
                                                    </p>

                                                    <nav
                                                        className='mt-4 flex flex-wrap justify-center gap-4 md:justify-start'
                                                        aria-label='Contact information'>
                                                        {selectedPerson.social_media && (
                                                            <a
                                                                href={selectedPerson.social_media}
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                className='flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                                                                aria-label={`Visit ${selectedPerson.name}'s LinkedIn profile`}>
                                                                <Linkedin className='h-4 w-4' aria-hidden='true' />
                                                                <span>LinkedIn</span>
                                                            </a>
                                                        )}

                                                        {selectedPerson.email && (
                                                            <a
                                                                href={`mailto:${selectedPerson.email}`}
                                                                className='flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none'
                                                                aria-label={`Send an email to ${selectedPerson.name}`}>
                                                                <Mail className='h-4 w-4' aria-hidden='true' />
                                                                <span>Email</span>
                                                            </a>
                                                        )}
                                                    </nav>

                                                    <hr className='my-5 w-full border-gray-100' aria-hidden='true' />

                                                    <CardContent
                                                        className='mt-4 text-gray-700'
                                                        content={translation.text ?? ''}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

export default ResearchFellowSection;
