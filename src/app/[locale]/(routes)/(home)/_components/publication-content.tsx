'use client';

import { useState } from 'react';

import EmptyState from '@/components/common/empty-state';
import PublicationsSkeleton from '@/components/common/publication-skeleton';
import { Link } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatDateShort, formatFullDate } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface Article {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export const PublicationContent = ({
    initialData,
    categoriesData
}: {
    initialData: Post[];
    categoriesData: Article[];
}) => {
    const t = useTranslations('home.publications');
    const [activeTab, setActiveTab] = useState('');
    const [publications, setPublications] = useState<Post[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);

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

            setPublications(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const locale = useLocale();
    const langIndex = locale === 'id' ? 0 : 1;

    const featured = publications[0];
    const sideArticles = publications.slice(1, 4);

    return (
        <>
            <h1 className='text-primary-900 mb-8 max-w-sm text-4xl font-bold lg:text-5xl'>{t('title')}</h1>

            {categoriesData.length > 0 && (
                <div className='flex flex-col items-start justify-between lg:flex-row lg:items-center'>
                    <div className='flex flex-wrap gap-3'>
                        {categoriesData.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.name)}
                                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                                    activeTab === tab.name
                                        ? 'bg-teal-600 text-white shadow-md'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 disabled:opacity-50'
                                }`}>
                                {tab.name}
                            </button>
                        ))}
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
                            const translation = featured.translations?.[langIndex] || featured.translations?.[0];
                            const dateParts = featured.published_at
                                ? formatDateShort(featured.published_at).split(' ')
                                : ['01', 'Jan', '2026'];

                            return (
                                <Link
                                    href={`/news-from-us/${featured.id}-${featured.translations[0]?.slug}`}
                                    className='group cursor-pointer'>
                                    <div className='relative mb-6 h-80 overflow-hidden rounded-lg lg:h-96'>
                                        <img
                                            src={featured.cover || '/images/placeholder-square.jpg'}
                                            alt={translation?.title}
                                            className='h-full w-full object-cover'
                                        />

                                        <div className='absolute top-3 left-3'>
                                            <span className='rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white'>
                                                {featured.category?.name || 'Featured'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-4'>
                                        <div className='mb-4 hidden flex-col items-center lg:flex'>
                                            <div className='text-primary-900 text-5xl font-bold'>{dateParts[0]}</div>
                                            <div className='text-xs font-normal text-slate-600 uppercase'>
                                                {dateParts[1]} {dateParts[2]}
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <h2 className='text-primary-900 mb-2 text-xl font-bold lg:text-2xl'>
                                                {translation?.title}
                                            </h2>

                                            <p className='mb-2 line-clamp-2 text-sm leading-relaxed text-slate-600'>
                                                {translation?.content?.replace(/[#*`]/g, '')}
                                            </p>

                                            <div className='mt-1 flex items-center gap-2 text-xs text-slate-500'>
                                                <div className='flex items-center gap-1'>
                                                    <Pencil className='h-3 w-3' /> By {featured.author?.name || 'Admin'}
                                                </div>

                                                <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                                <div className='flex items-center gap-1'>
                                                    <Eye className='h-3 w-3' /> {featured.seen ?? 0} Dilihat
                                                </div>

                                                <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                                <div className='flex items-center gap-1'>
                                                    <MessageSquareMore className='h-3 w-3' />{' '}
                                                    {featured.comments?.length || 0} Komentar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()}

                    {/* Side Articles */}
                    <div className='grid grid-rows-3 gap-5'>
                        {sideArticles.map((article) => {
                            const translation = article.translations?.[langIndex] || article.translations?.[0];

                            return (
                                <Link
                                    key={article.id}
                                    href={`/news-from-us/${article.id}-${article.translations[0]?.slug}`}>
                                    <div className='cursor-pointer overflow-hidden rounded-lg transition-shadow'>
                                        <div className='flex h-full flex-col items-start gap-3 md:flex-row md:items-center lg:gap-5'>
                                            <div className='h-52 w-full shrink-0 overflow-hidden rounded-lg md:h-38 md:w-42 lg:h-48'>
                                                <img
                                                    src={article.cover || '/images/placeholder-square.png'}
                                                    alt={translation?.title}
                                                    className='h-full w-full object-cover transition-transform duration-300'
                                                />
                                            </div>

                                            <div className='flex h-full flex-1 flex-col justify-evenly'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-secondary-300 text-xs font-medium uppercase lg:text-sm'>
                                                        {article.category?.name}
                                                    </span>

                                                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                                    <span className='text-xs text-slate-500'>
                                                        {article.published_at
                                                            ? formatFullDate(article.published_at, locale)
                                                            : '-'}
                                                    </span>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <h3 className='text-primary-900 line-clamp-2 text-lg leading-tight font-bold lg:text-xl'>
                                                        {translation?.title}
                                                    </h3>

                                                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                        <Pencil className='h-3 w-3' /> By{' '}
                                                        {article.author?.name || 'Admin'}
                                                    </div>

                                                    <div className='flex items-center gap-2 text-xs text-slate-500'>
                                                        <div className='flex items-center gap-1'>
                                                            <Eye className='h-4 w-4' /> 200 Dilihat
                                                        </div>

                                                        <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                                        <div className='flex items-center gap-1'>
                                                            <MessageSquareMore className='h-4 w-4' />{' '}
                                                            {article.comments?.length || 0} Komentar
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <EmptyState title='Data Not Found' description='There are no publications for this category.' />
            )}
        </>
    );
};
