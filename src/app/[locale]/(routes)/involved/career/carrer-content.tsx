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

import { JobAccordion } from './_components/job-accordion';

const CareerContent = ({ categories, initialJobs, translations }: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState(initialJobs);
    const [activeCategory, setActiveCategory] = useState<number | 'all'>(
        searchParams.get('category') ? Number(searchParams.get('category')) : 'all'
    );
    const [deadline, setDeadline] = useState<string | undefined>(searchParams.get('deadline') || undefined);
    const [isLoading, setIsLoading] = useState(false);

    const fetchJobs = useCallback(async (category: any, date: any) => {
        setIsLoading(true);
        try {
            const res = await apiRequest.get<any[]>(API_ENDPOINTS.jobRecruitments, {
                params: {
                    category: category === 'all' ? undefined : category,
                    closing_date: date,
                    limit: 10
                }
            });

            setJobs(res.data);
        } catch (error) {
            console.error('Error fetching jobs');
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

    const handleCategoryChange = (id: number | 'all') => {
        setActiveCategory(id);
        updateQueryParams(id, deadline);
        fetchJobs(id, deadline);
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
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: translations.breadcrumbHome, href: '/' },
                    { label: translations.breadcrumbActive, active: true }
                ]}
                containerClassName='h-[300px] pt-8'
            />

            <div className='sticky top-16 z-20 w-full border bg-white py-4'>
                <div className='container flex flex-wrap items-center justify-between gap-4'>
                    <div className='flex flex-wrap gap-2'>
                        <Button
                            size='sm'
                            className={`rounded-full ${activeCategory !== 'all' && 'border-none bg-slate-100 shadow-none'}`}
                            variant={activeCategory === 'all' ? 'default' : 'outline'}
                            onClick={() => handleCategoryChange('all')}>
                            Semua
                        </Button>
                        {categories.map((cat: any) => (
                            <Button
                                key={cat.id}
                                size='sm'
                                className={`rounded-full ${activeCategory !== cat.id && 'border-none bg-slate-100 shadow-none'}`}
                                variant={activeCategory === cat.id ? 'default' : 'outline'}
                                onClick={() => handleCategoryChange(cat.id)}>
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    <div className='flex items-center gap-2 text-sm'>
                        Batas Waktu
                        <SingleDatePicker value={deadline} onChange={handleDeadlineChange} />
                        {deadline && (
                            <button
                                onClick={() => handleDeadlineChange(undefined)}
                                className='cursor-pointer text-xs font-semibold text-red-500 hover:underline'>
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
