import React from 'react';

import { useRouter } from 'next/navigation';

import { formatFullDate, getDisplayCategoryName, getLangText } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';

interface LatestArticleCardProps {
    article: Post;
    basePath: '/news-from-us' | '/knowledge';
}

export const LatestArticleCard: React.FC<LatestArticleCardProps> = ({ article, basePath }) => {
    const locale = useLocale();
    const router = useRouter();

    const translation =
        article?.translations?.find((t) => t.language === locale) ||
        article?.translations?.find((t) => t.language === 'id') ||
        article?.translations?.[0];

    const title = translation?.title || 'No Title';
    const slug = translation?.slug || '';
    const translatedName = getLangText(article?.category.name, locale);
    const categoryName = getDisplayCategoryName(translatedName);

    const authorName = article.author?.name || 'Admin';
    const publishedDate = article.published_at || article.created_at;

    const handleArticleClick = async () => {
        try {
            await fetch(`/api/posts/${article.id}/view`);
        } catch (error) {
            console.error('Failed to track view:', error);
        }
        router.push(`${basePath}/${article.id}-${slug}`);
    };

    return (
        <div
            onClick={handleArticleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleArticleClick()}
            role='button'
            tabIndex={0}
            aria-labelledby={`title-${article.id}`}
            className='group cursor-pointer overflow-hidden rounded-lg transition-shadow outline-none'>
            <div className='flex h-32.5 flex-row items-start gap-4'>
                <div className='h-full w-32.5 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
                    <img
                        src={article.cover || '/images/placeholder-square.png'}
                        alt=''
                        className='h-full w-full object-cover transition-transform duration-300'
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder-square.png';
                        }}
                    />
                </div>

                <div className='flex h-full flex-col justify-between py-0.5'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <span className='text-secondary-300 text-xs font-medium tracking-wide uppercase lg:text-sm'>
                                {categoryName}
                            </span>
                            <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                            <span className='text-xs text-slate-500'>
                                {publishedDate ? formatFullDate(publishedDate, locale) : '-'}
                            </span>
                        </div>

                        <h3
                            id={`title-${article.id}`}
                            className='text-primary-900 group-hover:text-primary-500 decoration-primary-500 mt-1 -ml-1 line-clamp-2 rounded-sm px-1 text-base leading-snug font-bold underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline lg:text-lg'>
                            {title}
                        </h3>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <div className='flex items-center gap-2 text-xs text-slate-500'>
                            <div className='flex items-center gap-1'>
                                <Eye className='h-3.5 w-3.5' /> {article.views || 0}{' '}
                                {locale == 'id' ? 'Dilihat' : 'Seen'}
                            </div>
                            <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                            <div className='flex items-center gap-1'>
                                <MessageSquareMore className='h-3.5 w-3.5' /> {article.comments?.length || 0}{' '}
                                {locale == 'id' ? 'Komentar' : 'Comment'}
                            </div>
                        </div>

                        <div className='flex items-center gap-1 text-[10px] text-gray-500'>
                            <Pencil className='h-3 w-3' /> By{' '}
                            <span className='font-medium text-slate-700'>{authorName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
