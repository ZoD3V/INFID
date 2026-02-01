'use client';

import { useMemo, useState } from 'react';

import { PageHeaderSearch } from '@/components/common/background-news-section';
import { Button } from '@/components/ui/button';

import { ArticleCard } from './_components/article-card';
import { ArticleFilters } from './_components/article-filters';
import { FeaturedNews } from './_components/featured-news';
import { articles } from './data/data';
import { featuredNews } from './data/featured-news';

const PAGE_SIZE = 8;

export default function NewsFromUsPage() {
    const [category, setCategory] = useState('Semua');
    const [year, setYear] = useState('all');
    const [author, setAuthor] = useState('all');
    const [visible, setVisible] = useState(PAGE_SIZE);

    const filteredArticles = useMemo(() => {
        return articles.filter((a) => {
            const matchCategory = category === 'Semua' || a.category === category;
            const matchYear = year === 'all' || new Date(a.date).getFullYear().toString() === year;
            const matchAuthor = author === 'all' || a.author === author;

            return matchCategory && matchYear && matchAuthor;
        });
    }, [category, year, author]);

    const visibleArticles = useMemo(() => articles.slice(0, visible), [visible]);

    return (
        <section className='w-full bg-slate-50'>
            <PageHeaderSearch
                badge='Berita Terhangat'
                title='Dapatkan kabar'
                highlight='terbaru'
                description='Temukan artikel blog terkini, analisis mendalam, dan wawasan ahli tentang pembangunan Indonesia yang berkelanjutan.'
                onSearch={(value) => {
                    console.log('Search:', value);
                }}
            />
            <div className='w-full bg-white py-5'>
                <ArticleFilters
                    category={category}
                    setCategory={(v) => {
                        setCategory(v);
                        setVisible(PAGE_SIZE);
                    }}
                    year={year}
                    setYear={(v) => {
                        setYear(v);
                        setVisible(PAGE_SIZE);
                    }}
                    author={author}
                    setAuthor={(v) => {
                        setAuthor(v);
                        setVisible(PAGE_SIZE);
                    }}
                />
            </div>
            <div className='container pt-12 pb-16'>
                <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>Artikel Terbaru</h3>

                {/* Featured */}
                <FeaturedNews items={featuredNews} />

                {/* Grid Artikel */}
                <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>Semua Artikel</h3>

                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {visibleArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Load More */}
                {visible < filteredArticles.length && (
                    <div className='mt-6 flex justify-center'>
                        <Button
                            variant='outline'
                            className='rounded-full px-8'
                            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, filteredArticles.length))}>
                            Muat Lebih Banyak
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
