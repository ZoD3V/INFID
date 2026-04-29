'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { ArticleCard } from '@/components/common/article-card';
import { ArticleCardSkeleton } from '@/components/common/article-card-skeleton';
import { ArticleFilters } from '@/components/common/article-filters';
import { PageHeaderSearch } from '@/components/common/background-news-section';
import EmptyState from '@/components/common/empty-state';
import { FeaturedNewsSkeleton } from '@/components/common/featured-news-skeleton';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/routing';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { allowedKnowledgeCategories } from '@/types/categories';
import { Category, Post } from '@/types/posts';
import { yearArticle } from '@/types/years';

import { ArticleCarousel } from './_components/carousel-knowledge';
import { useLocale, useTranslations } from 'next-intl';

const PAGE_SIZE = 8;

export default function KnowledgePage() {
    const t = useTranslations('knowledge');
    const locale = useLocale();
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
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [categoriesNews, setCategoriesNews] = useState<Category[]>([]);
    const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await apiRequest.get<Category[]>(API_ENDPOINTS.categories);

                const data = res.data || res;

                const filteredData = data.filter((cat: Category) => {
                    return cat.name.some((translation) =>
                        allowedKnowledgeCategories.some((c) => c.id === translation.text || c.en === translation.text)
                    );
                });

                const allCategory: Category = {
                    id: 0,
                    slug: 'all',
                    name: [
                        { language: 'id', text: 'Semua' },
                        { language: 'en', text: 'All' }
                    ],
                    description: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                setCategoriesNews([allCategory, ...filteredData]);
            } catch (error) {
                const allCategory: Category = {
                    id: 0,
                    slug: 'all',
                    name: [
                        { language: 'id', text: 'Semua' },
                        { language: 'en', text: 'All' }
                    ],
                    description: null,
                    created_at: '',
                    updated_at: ''
                };
                setCategoriesNews([allCategory]);
            }
        };
        fetchCategories();
    }, [locale]);

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
                const res = await apiRequest.get<Post[]>(API_ENDPOINTS.posts, {
                    params: {
                        limit: '',
                        category: filters.category === 'Semua' || filters.category === 'all' ? '' : filters.category,
                        search: filters.search,
                        year: filters.year === 'all' ? '' : filters.year,
                        author: filters.author === 'all' ? '' : filters.author,
                        tags: '',
                        featured: true
                    }
                });

                const data = res.data.filter((item) => item.status.toLowerCase() == 'published') || [];
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

    const handleArticleClick = async (article: Post) => {
        try {
            await apiRequest.get<Post>(`${API_ENDPOINTS.posts}/${article.id}/view`);
        } catch (error) {
            console.error('Failed to track view:', error);
        }

        router.push(`/knowledge/${article.id}-${article.translations[0]?.slug}`);
    };

    return (
        <section className='relative w-full bg-stone-50'>
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
                    categories={categoriesNews}
                    years={yearArticle}
                    selectedCategory={filters.category}
                    onCategoryChange={(v) => setFilters((f) => ({ ...f, category: v }))}
                    selectedYear={filters.year}
                    onYearChange={(v) => setFilters((f) => ({ ...f, year: v }))}
                />
            </div>

            <div className='container pt-12 pb-16'>
                {/* Featured */}
                {isFeaturedLoading ? (
                    <FeaturedNewsSkeleton />
                ) : (
                    featuredArticles.length > 0 && (
                        <>
                            <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>
                                {filters.category == 'Semua'
                                    ? `Highlight ${t('content.publish')}`
                                    : `Highlight ${filters.category}`}
                            </h3>

                            <ArticleCarousel items={featuredArticles} />
                        </>
                    )
                )}

                {/* Grid Artikel */}
                <h3 className='text-primary-500 mb-4 text-xl font-bold md:text-2xl'>
                    {filters.category == 'Semua' ? t('content.all_article') : `${t('content.all')} ${filters.category}`}
                </h3>
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                    {isLoading && articles.length === 0 ? (
                        Array.from({ length: PAGE_SIZE }).map((_, i) => <ArticleCardSkeleton key={i} />)
                    ) : (
                        <>
                            {articles.map((article, index) => (
                                <ArticleCard
                                    key={article.id || index}
                                    article={article}
                                    imageClassName='h-67'
                                    onClick={() => handleArticleClick(article)}
                                />
                            ))}

                            {isLoading &&
                                articles.length > 0 &&
                                Array.from({ length: 4 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
                        </>
                    )}
                </div>

                {!isLoading && isMounted && articles.length === 0 && <EmptyState />}

                {!isLoading && hasMore && articles.length > 0 && (
                    <div className='mt-10 flex justify-center'>
                        <Button variant='outline' className='rounded-full bg-white px-8' onClick={handleLoadMore}>
                            {t('content.load_more')}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
