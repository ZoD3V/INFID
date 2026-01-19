'use client';
import React, { useState } from 'react';

import CommunitySection from './community-section';
import { ArrowRight } from 'lucide-react';

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
            likes: 23,
            comments: 10,
            badge: 'Populer'
        },
        articles: [
            {
                id: 2,
                title: 'Transisi Energi yang Berkeadilan untuk Semua',
                type: 'KERTAS KEBIJAKAN',
                image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                likes: 23,
                comments: 10
            },
            {
                id: 3,
                title: 'Urgensi Perlindungan Pembela HAM',
                type: 'ARTIKEL',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                likes: 23,
                comments: 10
            },
            {
                id: 4,
                title: 'Indeks Kinerja HAM 2023',
                type: 'RISET',
                image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                likes: 23,
                comments: 10
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
        <section className='bg-slate-50 pt-16 pb-24 lg:pt-24 lg:pb-58'>
            <div className='container'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='mb-8 text-4xl font-bold text-slate-900 lg:text-5xl'>
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
                                <div className='text-5xl font-bold text-slate-900'>
                                    {newsData.featured.date.split(' ')[0]}
                                </div>
                                <div className='text-xs font-normal text-slate-600 uppercase'>
                                    {newsData.featured.date.split(' ')[1]} {newsData.featured.date.split(' ')[2]}
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='mb-2 text-xl font-bold text-slate-900 lg:text-2xl'>
                                    {newsData.featured.title}
                                </h2>
                                <p className='mb-2 text-sm leading-relaxed text-slate-600'>
                                    {newsData.featured.description}
                                </p>
                                <div className='flex items-center gap-2 text-sm text-slate-500'>
                                    <span>{newsData.featured.likes} Likes</span>
                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                    <span>{newsData.featured.comments} Komentar</span>
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
                                <div className='flex h-full items-center gap-3 lg:gap-5'>
                                    {/* Image */}
                                    <div className='h-38 w-42 shrink-0 overflow-hidden rounded-lg lg:h-full'>
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
                                                        ? 'text-orange-500'
                                                        : article.type === 'ARTIKEL'
                                                          ? 'text-orange-500'
                                                          : 'text-teal-600'
                                                }`}>
                                                {article.type}
                                            </span>
                                            <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                            <span className='text-xs text-slate-500 lg:text-sm'>{article.date}</span>
                                        </div>
                                        <h3 className='text-lg leading-tight font-bold text-slate-900 transition-colors group-hover:text-teal-600 lg:text-xl'>
                                            {article.title}
                                        </h3>
                                        <div className='flex items-center gap-4 text-xs text-slate-500 lg:text-sm'>
                                            <span>{article.likes} Likes</span>
                                            <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                            <span>{article.comments} Komentar</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublicationsSection;
