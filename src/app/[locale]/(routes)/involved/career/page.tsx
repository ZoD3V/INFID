'use client';
import React, { useEffect, useMemo, useState } from 'react';

import PageHeader from '@/components/common/background-section';
import { JobSkeleton } from '@/components/common/job-skeleton';
import { SingleDatePicker } from '@/components/common/single-date-picker';
import { Button } from '@/components/ui/button';

import { JobAccordion } from './_components/job-accordion';
import { accordionData } from './data/data';

const categories = ['Semua', 'Teknologi', 'Finance', 'Admin'];

const CareerPage = () => {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [deadline, setDeadline] = useState<string | undefined>();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('category');
        const dateParam = params.get('deadline');

        if (catParam) setActiveCategory(catParam);
        if (dateParam) setDeadline(dateParam);

        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const params = new URLSearchParams();
        if (activeCategory !== 'Semua') params.set('category', activeCategory);
        if (deadline) params.set('deadline', deadline);

        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        window.history.replaceState(null, '', newUrl);

        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [activeCategory, deadline, isMounted]);

    const filteredJobs = useMemo(() => {
        return accordionData
            .filter((item) => (activeCategory === 'Semua' ? true : item.category === activeCategory))
            .filter((item) => {
                if (!deadline) return true;
                return item.deadline === deadline;
            });
    }, [activeCategory, deadline]);

    return (
        <section className='w-full bg-slate-50'>
            <PageHeader
                title='Karir'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Ayo Terlibat', href: '/news-from-us' },
                    { label: 'Karir', active: true }
                ]}
            />

            <div className='sticky top-16 z-20 w-full border bg-white py-4'>
                <div className='container flex flex-wrap items-center justify-between gap-4'>
                    {/* CATEGORY FILTERS */}
                    <div className='flex flex-wrap gap-2'>
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                size='sm'
                                className={`rounded-full ${activeCategory !== cat && 'border-none bg-slate-100 shadow-none'}`}
                                variant={activeCategory === cat ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(cat)}>
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* DEADLINE FILTER */}
                    <div className='flex items-center gap-2 text-sm'>
                        Deadline
                        <SingleDatePicker value={deadline} onChange={(val) => setDeadline(val)} />
                        {deadline && (
                            <button
                                onClick={() => setDeadline(undefined)}
                                className='text-xs text-red-500 hover:underline'>
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className='relative container pt-12 pb-16'>
                {isLoading ? (
                    <JobSkeleton />
                ) : filteredJobs.length > 0 ? (
                    <JobAccordion data={filteredJobs} />
                ) : (
                    <div className='rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center'>
                        <p className='text-slate-500'>Tidak ada lowongan kerja yang sesuai dengan kriteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CareerPage;
