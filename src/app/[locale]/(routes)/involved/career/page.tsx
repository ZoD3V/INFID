'use client';
import React, { useState } from 'react';

import PageHeader from '@/components/common/background-section';
import { SingleDatePicker } from '@/components/common/single-date-picker';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

import { JobAccordion } from './_components/job-accordion';
import { accordionData } from './data/data';
import { Calendar, CalendarIcon } from 'lucide-react';
import { format } from 'path';

const categories = ['Semua', 'Teknologi', 'Finance', 'Admin'];

const CareerPage = () => {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [deadline, setDeadline] = useState<string | undefined>();

    const filteredJobs = accordionData
        .filter((item) => (activeCategory === 'Semua' ? true : item.category === activeCategory))
        .filter((item) => {
            if (!deadline) return true;
            return item.deadline === deadline;
        });

    console.log(filteredJobs);

    return (
        <section className='w-full bg-slate-50'>
            <PageHeader
                title='Karir'
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Ayo Terlibat', href: '/' },
                    { label: 'Karir', active: true }
                ]}
            />
            <div className='w-full bg-white py-5'>
                <div className='container flex flex-wrap items-center justify-between gap-4'>
                    {/* CATEGORY */}
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

                    {/* DEADLINE */}
                    <div className='flex items-center gap-2 text-sm'>
                        Deadline
                        <SingleDatePicker value={deadline} onChange={setDeadline} />
                    </div>
                </div>
            </div>
            <div className='relative container pt-12 pb-16'>
                <JobAccordion data={filteredJobs} />
            </div>
        </section>
    );
};

export default CareerPage;
