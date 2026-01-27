'use client';
import React, { useState } from 'react';

import CommunitySection from './community-section';
import { ArrowRight, Eye, MessageSquareMore, Pencil } from 'lucide-react';

const PublicationsSection = () => {
    const [activeTab, setActiveTab] = useState('semua');

    const newsData = {
        featured: {
            id: 1,
            title: 'Menakar Masa Depan Demokrasi Indonesia Pasca 2024',
            description:
                'Analisis komprehensif mengenai peta politik, tantangan elektoral, dan peran masyarakat sipil dalam menjaga integritas pemilu.',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
            date: '15 JAN 25',
            seen: 23,
            comments: 10,
            badge: 'Populer',
            createdBy: 'Samantha'
        },
        articles: [
            {
                id: 2,
                title: 'Transisi Energi yang Berkeadilan untuk Semua',
                type: 'KERTAS KEBIJAKAN',
                image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                seen: 23,
                comments: 10,
                createdBy: 'Samantha'
            },
            {
                id: 3,
                title: 'Urgensi Perlindungan Pembela HAM',
                type: 'ARTIKEL',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                seen: 23,
                comments: 10,
                createdBy: 'Samantha'
            },
            {
                id: 4,
                title: 'Indeks Kinerja HAM 2023',
                type: 'RISET',
                image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                seen: 23,
                comments: 10,
                createdBy: 'Samantha'
            }
        ]
    };

    const tabs = [
        { id: 'semua', label: 'Semua' },
        { id: 'riset', label: 'Riset' },
        { id: 'artikel', label: 'Artikel' },
        { id: 'kertas-kebijakan', label: 'Kertas Kebijakan' }
    ];

    return (
        <section className='relative bg-slate-50 pt-16 pb-24 lg:pt-24 lg:pb-58'>
            <div className='container pb-16 lg:pb-0'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-primary-900 mb-8 text-4xl font-bold lg:text-5xl'>
                        PUBLIKASI
                        <br />& RISET
                    </h1>

                    <div className='flex flex-col items-start justify-between lg:flex-row lg:items-center'>
                        {/* Tabs */}
                        <div className='flex flex-wrap gap-3'>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                    }`}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Link */}
                        <div className='flex justify-end'>
                            <button className='group mt-6 inline-flex cursor-pointer items-center gap-2 border-b border-slate-900 pb-2 text-sm font-semibold lg:mt-8'>
                                Lihat Semua Publikasi
                                <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {/* Featured Article */}
                    <div className='group cursor-pointer'>
                        {/* Image */}
                        <div className='relative mb-6 h-80 overflow-hidden rounded-lg lg:h-96'>
                            <img
                                src={newsData.featured.image}
                                alt={newsData.featured.title}
                                className='h-full w-full object-cover'
                            />

                            {/* Badge */}
                            <div className='absolute top-3 left-3'>
                                <span className='rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white'>
                                    {newsData.featured.badge}
                                </span>
                            </div>
                        </div>

                        {/* Content Below Image */}
                        <div className='flex items-start gap-4'>
                            <div className='mb-4 hidden flex-col items-center lg:flex'>
                                <div className='text-primary-900 text-5xl font-bold'>
                                    {newsData.featured.date.split(' ')[0]}
                                </div>
                                <div className='text-xs font-normal text-slate-600 uppercase'>
                                    {newsData.featured.date.split(' ')[1]} {newsData.featured.date.split(' ')[2]}
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-primary-900 mb-2 text-xl font-bold lg:text-2xl'>
                                    {newsData.featured.title}
                                </h2>
                                <p className='mb-2 text-sm leading-relaxed text-slate-600'>
                                    {newsData.featured.description}
                                </p>
                                <div className='mt-1 flex items-center gap-2 text-xs text-slate-500 xl:text-xs'>
                                    <div className='flex items-center gap-1'>
                                        <Pencil className='h-3 w-3' /> By {newsData.featured.createdBy}
                                    </div>
                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                    <div className='flex items-center gap-1'>
                                        <Eye className='h-3 w-3' /> {newsData.featured.seen} Dilihat
                                    </div>
                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                    <div className='flex items-center gap-1'>
                                        <MessageSquareMore className='h-3 w-3' /> {newsData.featured.comments} Komentar
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Articles */}
                    <div className='grid grid-rows-3 gap-5 lg:gap-6'>
                        {newsData.articles.map((article) => (
                            <div
                                key={article.id}
                                className='cursor-pointer overflow-hidden rounded-lg transition-shadow'>
                                <div className='flex h-full flex-col items-start gap-3 md:flex-row md:items-center lg:gap-5'>
                                    {/* Image */}
                                    <div className='h-52 w-full shrink-0 overflow-hidden rounded-lg md:h-38 md:w-42 lg:h-full'>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className='h-full w-full object-cover transition-transform duration-300'
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className='flex h-full flex-1 flex-col justify-evenly'>
                                        <div className='flex items-center gap-2'>
                                            <span
                                                className={`text-xs font-medium lg:text-sm ${
                                                    article.type === 'KERTAS KEBIJAKAN'
                                                        ? 'text-secondary-300'
                                                        : article.type === 'ARTIKEL'
                                                          ? 'text-secondary-300'
                                                          : 'text-teal-500'
                                                }`}>
                                                {article.type}
                                            </span>
                                            <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                            <span className='text-xs text-slate-500'>{article.date}</span>
                                        </div>
                                        <div className='flex flex-col items-start justify-start gap-2'>
                                            <h3 className='text-primary-900 text-lg leading-tight font-bold transition-colors group-hover:text-teal-600 lg:text-xl'>
                                                {article.title}
                                            </h3>
                                            <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                <Pencil className='h-3 w-3' /> By {newsData.featured.createdBy}
                                            </div>
                                            <div className='flex items-center gap-2 text-xs text-slate-500'>
                                                <div className='flex items-center gap-1'>
                                                    <Eye className='h-4 w-4' /> {article.seen} Dilihat
                                                </div>
                                                <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                                <div className='flex items-center gap-1'>
                                                    <MessageSquareMore className='h-4 w-4' /> {article.comments}{' '}
                                                    Komentar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <CommunitySection />
        </section>
    );
};

export default PublicationsSection;
