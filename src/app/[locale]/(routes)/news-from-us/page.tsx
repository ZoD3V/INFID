'use client';

import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ArticleCard } from '@/components/common/article-card';
import { ArticleCardSkeleton } from '@/components/common/article-card-skeleton';
import { ArticleFilters } from '@/components/common/article-filters';
import { PageHeaderSearch } from '@/components/common/background-news-section';
import { FeaturedNewsSkeleton } from '@/components/common/featured-news-skeleton';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Post } from '@/types/posts';

import { FeaturedNews } from './_components/featured-news';
import { authorsNews, yearsNews } from './data/data';
import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PAGE_SIZE = 8;

export default function NewsFromUsPage() {
    const t = useTranslations('news');
    const [filters, setFilters] = useState({
        category: 'Semua',
        year: 'all',
        author: 'all',
        search: ''
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    // --- API States ---
    const [articles, setArticles] = useState<Post[]>([]);
    const [featuredArticles, setFeaturedArticles] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [categoriesNews, setCategoriesNews] = useState<any[]>(['Semua']);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsCategoriesLoading(true);
                const res = await apiRequest.get<any>(API_ENDPOINTS.categories);
                const allowedCategories = ['Kegiatan', 'Bergerak', 'Berdampak', 'Siaran Pers', 'Laporan Tahunan'];
                const data = res.data || res;
                const filteredNames = data
                    .filter((cat: any) => allowedCategories.includes(cat.name))
                    .map((cat: any) => cat.name);
                setCategoriesNews(['Semua', ...filteredNames]);
            } catch (error) {
                setCategoriesNews(['Semua']);
            } finally {
                setIsCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category') || 'Semua';
        const yearFromUrl = searchParams.get('year') || 'all';
        const authorFromUrl = searchParams.get('author') || 'all';
        const searchFromUrl = searchParams.get('search') || '';

        const isActuallyDifferent =
            filters.category !== categoryFromUrl ||
            filters.year !== yearFromUrl ||
            filters.author !== authorFromUrl ||
            filters.search !== searchFromUrl;

        if (isActuallyDifferent) {
            setFilters({
                category: categoryFromUrl,
                year: yearFromUrl,
                author: authorFromUrl,
                search: searchFromUrl
            });
        }
        setCurrentPage(1);

        if (!isMounted) setIsMounted(true);
    }, [searchParams]);

    useEffect(() => {
        const fetchFeatured = async () => {
            if (!isMounted) return;
            setIsFeaturedLoading(true);
            try {
                const res = await apiRequest.get<any>(API_ENDPOINTS.posts, {
                    params: {
                        featured: true,
                        limit: 2,
                        category: filters.category === 'Semua' ? '' : filters.category,
                        search: filters.search,
                        year: filters.year === 'all' ? '' : filters.year,
                        author: filters.author === 'all' ? '' : filters.author,
                        tags: ''
                    }
                });

                const data = res.data || res;
                setFeaturedArticles(data);
            } catch (error) {
                console.error('Gagal load featured:', error);
            } finally {
                setIsFeaturedLoading(false);
            }
        };

        fetchFeatured();
    }, [filters.category, filters.year, filters.author, filters.search, isMounted]);

    useEffect(() => {
        if (!isMounted) return;

        const syncAndFetch = async () => {
            const params = new URLSearchParams();
            if (filters.category !== 'Semua') params.set('category', filters.category);
            if (filters.year !== 'all') params.set('year', filters.year);
            if (filters.author !== 'all') params.set('author', filters.author);
            if (filters.search) params.set('search', filters.search);

            const newQueryString = params.toString();
            const currentQueryString = searchParams.toString();

            if (newQueryString !== currentQueryString) {
                router.replace(`${pathname}?${newQueryString}`, { scroll: false });
            }

            setIsLoading(true);
            if (currentPage === 1) {
                setArticles([]);
            }

            try {
                const res = await apiRequest.get<Post[]>(API_ENDPOINTS.posts, {
                    params: {
                        category: filters.category === 'Semua' ? '' : filters.category,
                        search: filters.search,
                        year: filters.year === 'all' ? '' : filters.year,
                        author: filters.author === 'all' ? '' : filters.author,
                        tags: '',
                        limit: 8,
                        page: currentPage
                    }
                });

                const data = res.data || res;
                if (currentPage === 1) {
                    setArticles(data);
                } else {
                    setArticles((prev) => [...prev, ...data]);
                }

                setHasMore(data.length === 8);
            } catch (error) {
                console.error(error);
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        syncAndFetch();
    }, [filters.category, filters.year, filters.author, filters.search, currentPage, isMounted]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    return (
        <section className='w-full bg-slate-50'>
            <PageHeaderSearch
                defaultValue={filters.search}
                onSearch={(val) => setFilters((f) => ({ ...f, search: val }))}
                badge={t('header.badge')}
                title={t('header.title')}
                highlight={t('header.highlight')}
                endTitle={t('header.endTitle')}
                placeholder={t('header.placeholder')}
                description={t('header.description')}
            />

            <div className='sticky top-16 z-20 w-full border bg-white py-5'>
                <ArticleFilters
                    categories={isCategoriesLoading ? ['Semua'] : categoriesNews}
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
                {isFeaturedLoading ? (
                    <FeaturedNewsSkeleton />
                ) : featuredArticles.length > 0 ? (
                    <FeaturedNews items={featuredArticles} />
                ) : (
                    isMounted && (
                        <div className='mb-8 flex h-40 w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50'>
                            <p className='text-sm text-slate-500'>Belum ada artikel terbaru.</p>
                        </div>
                    )
                )}

                {/* Grid Artikel */}
                <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>Semua Artikel</h3>
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {isLoading && articles.length === 0 ? (
                        Array.from({ length: PAGE_SIZE }).map((_, i) => <ArticleCardSkeleton key={i} />)
                    ) : (
                        <>
                            {articles.map((article, index) => (
                                <Link key={index} href={`/news-from-us/${article.translations[0]?.slug}`}>
                                    <ArticleCard article={article} imageClassName='h-67' />
                                </Link>
                            ))}

                            {isLoading &&
                                articles.length > 0 &&
                                Array.from({ length: 4 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
                        </>
                    )}
                </div>

                {!isLoading && isMounted && articles.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-20 text-center'>
                        <div className='mb-4 rounded-full bg-slate-100 p-6'>
                            <SearchX className='h-12 w-12 text-slate-400' />
                        </div>
                        <h4 className='text-lg font-bold text-slate-900'>Data Tidak Ditemukan</h4>
                        <p className='mx-auto mt-2 max-w-xs text-slate-500'>
                            Maaf, kami tidak dapat menemukan artikel yang sesuai dengan filter atau pencarian Anda.
                        </p>
                        <Button
                            variant='link'
                            className='text-primary-500 mt-4'
                            onClick={() => setFilters({ category: 'Semua', year: 'all', author: 'all', search: '' })}>
                            Reset Semua Filter
                        </Button>
                    </div>
                )}

                {!isLoading && hasMore && articles.length > 0 && (
                    <div className='mt-10 flex justify-center'>
                        <Button variant='outline' className='rounded-full bg-white px-8' onClick={handleLoadMore}>
                            Muat Lebih Banyak
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
