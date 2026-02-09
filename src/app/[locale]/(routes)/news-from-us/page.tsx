'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArticleCard } from '@/components/common/article-card';
import { ArticleCardSkeleton } from '@/components/common/article-card-skeleton';
import { ArticleFilters } from '@/components/common/article-filters';
import { PageHeaderSearch } from '@/components/common/background-news-section';
import { FeaturedNewsSkeleton } from '@/components/common/featured-news-skeleton';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

import { FeaturedNews } from './_components/featured-news';
import { articles, authorsNews, categoriesNews, yearsNews } from './data/data';
import { featuredNews } from './data/featured-news';

const PAGE_SIZE = 8;
const MAX_PAGES = 3;

export default function NewsFromUsPage() {
    const [filters, setFilters] = useState({
        category: 'Semua',
        year: 'all',
        author: 'all',
        search: ''
    });
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFilters({
            category: params.get('category') || 'Semua',
            year: params.get('year') || 'all',
            author: params.get('author') || 'all',
            search: params.get('search') || ''
        });
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const params = new URLSearchParams();
        if (filters.category !== 'Semua') params.set('category', filters.category);
        if (filters.year !== 'all') params.set('year', filters.year);
        if (filters.author !== 'all') params.set('author', filters.author);
        if (filters.search) params.set('search', filters.search);

        window.history.replaceState(null, '', `?${params.toString()}`);

        setIsLoading(true);
        setCurrentPage(1);
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [filters, isMounted]);

    const handleCardClick = (id: number | string) => {
        router.push(`/news-from-us/${id}`);
    };

    const filteredArticles = useMemo(() => {
        return articles.filter((a) => {
            const matchSearch = a.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchCategory = filters.category === 'Semua' || a.category === filters.category;
            const matchYear = filters.year === 'all' || a.date.startsWith(filters.year);
            const matchAuthor = filters.author === 'all' || a.author === filters.author;
            return matchSearch && matchCategory && matchYear && matchAuthor;
        });
    }, [filters]);

    const visibleArticles = filteredArticles.slice(0, currentPage * PAGE_SIZE);

    const handleLoadMore = () => {
        if (currentPage < MAX_PAGES) {
            setIsLoading(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev + 1);
                setIsLoading(false);
            }, 500);
        }
    };

    return (
        <section className='w-full bg-slate-50'>
            <PageHeaderSearch
                defaultValue={filters.search}
                onSearch={(val) => setFilters((f) => ({ ...f, search: val }))}
                badge='Berita Terhangat'
                title='Dapatkan kabar'
                highlight='terbaru'
                endTitle='dari kami'
                description='Temukan artikel blog terkini, analisis mendalam, dan wawasan ahli tentang pembangunan Indonesia yang berkelanjutan.'
            />

            <div className='w-full border-b bg-white py-5'>
                <ArticleFilters
                    categories={categoriesNews}
                    years={yearsNews}
                    authors={authorsNews}
                    selectedCategory={filters.category}
                    onCategoryChange={(v) => setFilters((f) => ({ ...f, category: v }))}
                    selectedYear={filters.year}
                    onYearChange={(v) => setFilters((f) => ({ ...f, year: v }))}
                    selectedAuthor={filters.author}
                    onAuthorChange={(v) => setFilters((f) => ({ ...f, author: v }))}
                />
            </div>

            <div className='container pt-12 pb-16'>
                <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>Artikel Terbaru</h3>

                {/* Featured */}
                {isLoading && currentPage === 1 ? <FeaturedNewsSkeleton /> : <FeaturedNews items={featuredNews} />}

                {/* Grid Artikel */}
                <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>Semua Artikel</h3>
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {isLoading && currentPage === 1 ? (
                        Array.from({ length: PAGE_SIZE }).map((_, i) => <ArticleCardSkeleton key={i} />)
                    ) : (
                        <>
                            {visibleArticles.map((article) => (
                                <Link key={article.id} href={`/news-from-us/${article.id}`}>
                                    <ArticleCard key={article.id} article={article} />
                                </Link>
                            ))}
                            {isLoading &&
                                currentPage > 1 &&
                                Array.from({ length: PAGE_SIZE }).map((_, i) => <ArticleCardSkeleton key={i} />)}
                        </>
                    )}
                </div>

                {!isLoading && currentPage < MAX_PAGES && visibleArticles.length < filteredArticles.length && (
                    <div className='mt-6 flex justify-center'>
                        <Button variant='outline' className='rounded-full bg-white px-8' onClick={handleLoadMore}>
                            Muat Lebih Banyak
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
