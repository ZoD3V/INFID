'use client';

import { useState } from 'react';

import CardContent from '@/components/common/card-content';
import EmptyState from '@/components/common/empty-state';
import PublicationsSkeleton from '@/components/common/publication-skeleton';
import { useCategories } from '@/context/category-context';
import { STORIES_OF_CHANGE_KEYS } from '@/data/stories-change';
import { useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatDateShort, formatFullDate, getDisplayCategoryName, getLangText } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export const PublicationContent = ({ initialData }: { initialData: Post[] }) => {
    const locale = useLocale();
    const { categories } = useCategories();

    const t = useTranslations('home.publications');
    const [activeTab, setActiveTab] = useState('');
    const [publications, setPublications] = useState<Post[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleTabChange = async (tabId: string) => {
        setActiveTab(tabId);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        try {
            const res = await apiRequest.get<Post[]>(API_ENDPOINTS.posts, {
                params: {
                    featured: '',
                    category: tabId === '' ? undefined : tabId,
                    search: '',
                    author: '',
                    tags: '',
                    year: '',
                    random: '',
                    limit: ''
                }
            });

            setPublications(
                res.data.filter(
                    (item) =>
                        (item.status.toLowerCase() == 'published' &&
                            getLangText(item.category.name) !== 'Infografis') ||
                        getLangText(item.category.name) !== 'Infograhic'
                ) || []
            );
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
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

    const featured = publications[0];
    const sideArticles = publications.slice(1, 4);

    const getCategoryDisplay = (item: any, locale: string) => {
        const originalText = getLangText(item.name, locale);

        const isSpecial = STORIES_OF_CHANGE_KEYS.includes(originalText?.toLowerCase());

        return isSpecial ? 'Bergerak, Berdampak!' : originalText;
    };

    return (
        <section>
            <h1 className='text-primary-900 mb-8 max-w-sm text-3xl font-bold md:text-4xl lg:text-5xl'>{t('title')}</h1>

            {categories.length > 0 && (
                <div className='flex flex-col items-start justify-between lg:flex-row lg:items-center'>
                    <div className='flex flex-wrap gap-3' role='tablist' aria-label='Kategori Program'>
                        {categories.map((tab) => {
                            const categoryValue = getLangText(tab.name, locale);

                            const displayText = getCategoryDisplay(tab, locale);

                            const isActive = activeTab === categoryValue;

                            return (
                                <button
                                    key={tab.id}
                                    id={`tab-${tab.id}`}
                                    type='button'
                                    role='tab'
                                    aria-selected={isActive}
                                    aria-label={
                                        locale === 'en'
                                            ? `Filter by ${displayText}`
                                            : `Filter berdasarkan ${displayText}`
                                    }
                                    onClick={() => handleTabChange(categoryValue)}
                                    className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                                        isActive ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                                    }`}>
                                    {displayText || 'Category'}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {isLoading ? (
                <PublicationsSkeleton />
            ) : publications && publications.length > 0 ? (
                <div className='mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
                    {/* Featured Article */}
                    {featured &&
                        (() => {
                            const translation =
                                featured?.translations?.find((t) => t.language === locale) ||
                                featured?.translations?.find((t) => t.language === 'id') ||
                                featured?.translations?.[0];
                            const translatedName = getLangText(featured?.category.name, locale);
                            const categoryName = getDisplayCategoryName(translatedName);
                            // const dateParts = featured.published_at
                            //     ? formatDateShort(featured.published_at).split(' ')
                            //     : ['01', 'Jan', '2026'];

                            return (
                                <div
                                    onClick={() => handleArticleClick(featured)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleArticleClick(featured);
                                        }
                                    }}
                                    role='button'
                                    tabIndex={0}
                                    aria-labelledby='featured-title'
                                    className='group cursor-pointer outline-none'>
                                    <div className='relative mb-6 h-80 overflow-hidden rounded-lg lg:h-96'>
                                        <img
                                            src={featured.cover || '/images/placeholder-square.png'}
                                            alt=''
                                            aria-hidden='true'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/placeholder-square.png';
                                            }}
                                            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                        />
                                        <div className='absolute top-3 left-3'>
                                            <span className='rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white'>
                                                {categoryName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-4'>
                                        <div className='mb-4 hidden flex-col items-center lg:flex' aria-hidden='true'>
                                            {/* <div className='text-primary-900 text-5xl font-bold'>{dateParts[0]}</div> */}
                                            <div className='text-xs whitespace-nowrap text-slate-600 uppercase'>
                                                {/* {dateParts[1]} {dateParts[2]} */}
                                            </div>
                                        </div>

                                        <div className='flex min-w-0 flex-1 flex-col'>
                                            <h2
                                                id='featured-title'
                                                className='text-primary-900 decoration-primary-500 mb-2 -ml-1 line-clamp-3 rounded-sm px-1 text-xl leading-snug font-bold underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline lg:text-2xl'>
                                                {translation?.title}
                                            </h2>

                                            <CardContent content={translation?.content} />

                                            <div className='mt-1 flex items-center gap-2 text-xs text-slate-500'>
                                                <div
                                                    className='flex items-center gap-1'
                                                    aria-label={`Penulis: ${featured.author?.name || 'Admin'}`}>
                                                    <Pencil className='h-3 w-3' aria-hidden='true' /> By{' '}
                                                    {featured.author?.name || 'Admin'}
                                                </div>
                                                <span
                                                    className='h-1 w-1 rounded-full bg-slate-500'
                                                    aria-hidden='true'></span>
                                                <div
                                                    className='flex items-center gap-1'
                                                    aria-label={`${featured.views ?? 0} dilihat`}>
                                                    <Eye className='h-3 w-3' aria-hidden='true' /> {featured.views ?? 0}{' '}
                                                    {locale == 'id' ? 'Dilihat' : 'Seen'}
                                                </div>
                                                <span
                                                    className='h-1 w-1 rounded-full bg-slate-500'
                                                    aria-hidden='true'></span>
                                                <div
                                                    className='flex items-center gap-1'
                                                    aria-label={`${featured.comments?.length || 0} komentar`}>
                                                    <MessageSquareMore className='h-3 w-3' aria-hidden='true' />{' '}
                                                    {featured.comments?.length || 0}{' '}
                                                    {locale == 'id' ? 'Komentar' : 'Comment'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                    {/* Side Articles */}
                    <div className='grid grid-rows-3 gap-5'>
                        {sideArticles.map((article, index) => {
                            const translation =
                                article?.translations?.find((t) => t.language === locale) ||
                                article?.translations?.find((t) => t.language === 'id') ||
                                article?.translations?.[0];
                            const translatedName = getLangText(article?.category?.name, locale);
                            const categoryName = getDisplayCategoryName(translatedName);
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleArticleClick(article)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleArticleClick(article);
                                        }
                                    }}
                                    role='button'
                                    tabIndex={0}
                                    aria-labelledby={`side-title-${index}`}
                                    className='group cursor-pointer outline-none'>
                                    <div className='overflow-hidden rounded-lg transition-shadow'>
                                        <div className='flex h-full flex-col items-start gap-3 md:flex-row md:items-center lg:gap-5'>
                                            <div className='h-52 w-full shrink-0 overflow-hidden rounded-lg md:h-38 md:w-42 lg:h-48'>
                                                <img
                                                    src={article.cover || '/images/placeholder-square.png'}
                                                    alt=''
                                                    aria-hidden='true'
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            '/images/placeholder-square.png';
                                                    }}
                                                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                                />
                                            </div>

                                            <div className='flex h-full flex-1 flex-col justify-evenly'>
                                                <div className='flex items-center gap-2' aria-hidden='true'>
                                                    <span className='text-secondary-300 text-xs font-medium uppercase lg:text-sm'>
                                                        {categoryName}
                                                    </span>
                                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                                    <span className='text-xs text-slate-500'>
                                                        {/* {article.published_at
                                                            ? formatFullDate(article.published_at, locale)
                                                            : '-'} */}
                                                    </span>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <h3
                                                        id={`side-title-${index}`}
                                                        className='text-primary-900 decoration-primary-500 -ml-1 line-clamp-2 rounded-sm px-1 text-lg leading-tight font-bold underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline lg:text-xl'>
                                                        {translation?.title}
                                                    </h3>

                                                    <div
                                                        className='flex items-center gap-1 text-xs text-gray-500'
                                                        aria-label={`Penulis: ${article.author?.name || 'Admin'}`}>
                                                        <Pencil className='h-3 w-3' aria-hidden='true' /> By{' '}
                                                        {article.author?.name || 'Admin'}
                                                    </div>

                                                    <div className='flex items-center gap-2 text-xs text-slate-500'>
                                                        <div
                                                            className='flex items-center gap-1'
                                                            aria-label={`${article.views ?? 0} dilihat`}>
                                                            <Eye className='h-4 w-4' aria-hidden='true' />{' '}
                                                            {article.views ?? 0} {locale == 'id' ? 'Dilihat' : 'Seen'}
                                                        </div>
                                                        <span
                                                            className='h-1 w-1 rounded-full bg-slate-500'
                                                            aria-hidden='true'></span>
                                                        <div
                                                            className='flex items-center gap-1'
                                                            aria-label={`${article.comments?.length || 0} komentar`}>
                                                            <MessageSquareMore className='h-4 w-4' aria-hidden='true' />{' '}
                                                            {article.comments?.length || 0}{' '}
                                                            {locale == 'id' ? 'Komentar' : 'Comment'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <EmptyState title='Data Not Found' description='There are no publications for this category.' />
            )}
        </section>
    );
};
