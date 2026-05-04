'use client';

import { useCallback, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import PageHeader from '@/components/common/background-section';
import EmptyState from '@/components/common/empty-state';
import { JobSkeleton } from '@/components/common/job-skeleton';
import { SingleDatePicker } from '@/components/common/single-date-picker';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { cn } from '@/lib/utils';
import { Job } from '@/types/job';

import { JobAccordion } from './_components/job-accordion';
import { isBefore, parseISO, startOfDay } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';

const CareerContent = ({ categories, initialJobs, translations }: any) => {
    const t = useTranslations('button');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState(initialJobs);
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all');
    const [deadline, setDeadline] = useState<string | undefined>(searchParams.get('deadline') || undefined);
    const [isLoading, setIsLoading] = useState(false);

    const fetchJobs = useCallback(async (category: any, date: any) => {
        setIsLoading(true);
        try {
            const res = await apiRequest.get<Job[]>(API_ENDPOINTS.jobRecruitments, {
                params: {
                    category: category === 'all' ? undefined : category,
                    closing_date: date,
                    limit: 10
                }
            });

            const today = startOfDay(new Date());

            const sortedJobs = [...res.data].sort((a, b) => {
                if (!a.closing_date) return 1;
                if (!b.closing_date) return -1;

                const dateA = startOfDay(parseISO(a.closing_date));
                const dateB = startOfDay(parseISO(b.closing_date));

                const isExpiredA = isBefore(dateA, today);
                const isExpiredB = isBefore(dateB, today);

                if (isExpiredA !== isExpiredB) {
                    return isExpiredA ? 1 : -1;
                }

                return dateA.getTime() - dateB.getTime();
            });

            setJobs(sortedJobs);
        } catch (error) {
            console.error('Error fetching jobs', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateQueryParams = (category: any, date: any) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === 'all') params.delete('category');
        else params.set('category', category.toString());

        if (date) params.set('deadline', date);
        else params.delete('deadline');

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (name: string | 'all') => {
        setActiveCategory(name);
        updateQueryParams(name, deadline);
        fetchJobs(name, deadline);
    };

    const handleDeadlineChange = (date: string | undefined) => {
        setDeadline(date);
        updateQueryParams(activeCategory, date);
        fetchJobs(activeCategory, date);
    };

    return (
        <section className='w-full bg-slate-50'>
            <PageHeader
                title={translations.title}
                showDescription={true}
                description={translations.description}
                backgroundImage='/images/background-carrer.webp'
                breadcrumbs={[
                    { label: translations.breadcrumbHome, href: '/' },
                    { label: translations.breadcrumbActive, active: true }
                ]}
                containerClassName='h-[300px] pt-8'
            />

            <div className='sticky top-16 z-20 w-full border bg-white py-4'>
                <div className='container flex flex-wrap items-center justify-between gap-4'>
                    <div
                        className='flex flex-wrap gap-2'
                        role='tablist'
                        aria-label='Filter lowongan berdasarkan kategori'>
                        <Button
                            size='sm'
                            role='tab'
                            aria-selected={activeCategory === 'all'}
                            aria-label={
                                locale === 'en' ? 'Show all job categories' : 'Tampilkan semua kategori lowongan'
                            }
                            className={cn(
                                'focus-visible:ring-primary-500 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                                activeCategory === 'all'
                                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                    : 'hover:bg-primary-500 border-none bg-slate-100 text-slate-600 shadow-none hover:text-white'
                            )}
                            variant={activeCategory === 'all' ? 'default' : 'outline'}
                            onClick={() => handleCategoryChange('all')}>
                            {locale === 'en' ? 'All' : 'Semua'}
                        </Button>

                        {categories[locale as 'id' | 'en']?.map((label: string, index: number) => {
                            const currentCategoryValue = categories[locale as 'id' | 'en'][index];

                            const isActive = activeCategory === currentCategoryValue;

                            return (
                                <Button
                                    key={index}
                                    size='sm'
                                    role='tab'
                                    id={`job-cat-${index}`}
                                    aria-selected={isActive}
                                    aria-label={locale === 'en' ? `Filter by ${label}` : `Filter berdasarkan ${label}`}
                                    className={cn(
                                        'focus-visible:ring-primary-500 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                                        isActive
                                            ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                            : 'hover:bg-primary-500 border-none bg-slate-100 text-slate-600 shadow-none hover:text-white'
                                    )}
                                    variant={isActive ? 'default' : 'outline'}
                                    onClick={() => handleCategoryChange(currentCategoryValue)}>
                                    {label}
                                </Button>
                            );
                        })}
                    </div>

                    <div className='flex items-center gap-2 text-sm'>
                        {t('deadline')}
                        <SingleDatePicker value={deadline} onChange={handleDeadlineChange} />
                        {deadline && (
                            <button
                                aria-label='Reset deadline filter'
                                type='button'
                                onClick={() => handleDeadlineChange(undefined)}
                                className='focus-visible:ring-primary-500 cursor-pointer text-xs font-semibold text-red-500 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'>
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className='relative container pt-12 pb-16'>
                {isLoading ? (
                    <JobSkeleton />
                ) : jobs.length > 0 ? (
                    <JobAccordion data={jobs} />
                ) : (
                    <EmptyState
                        className='mt-0!'
                        title='Data Not Found'
                        description='There are no publications for this category.'
                    />
                )}
            </div>
        </section>
    );
};

export default CareerContent;
