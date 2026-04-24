import React from 'react';

import { formatFullDate, getLangText } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';

interface LatestArticleCardProps {
    article: Post;
}

export const LatestArticleCard: React.FC<LatestArticleCardProps> = ({ article }) => {
    const locale = useLocale();

    const translation =
        article?.translations?.find((t) => t.language === locale) ||
        article?.translations?.find((t) => t.language === 'id') ||
        article?.translations?.[0];

    const title = translation?.title || 'No Title';
    const categoryName = getLangText(article.category.name, locale);
    const authorName = article.author?.name || 'Admin';
    const publishedDate = article.published_at || article.created_at;

    return (
        <div className='cursor-pointer overflow-hidden rounded-lg transition-shadow'>
            <div className='flex h-full flex-row items-start gap-4'>
                {/* Image */}
                <div className='h-32.5 w-32.5 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
                    <img
                        src={article.cover || '/images/placeholder-square.png'}
                        alt={title}
                        className='h-full w-full object-cover transition-transform duration-300'
                    />
                </div>

                {/* Content */}
                <div className='flex h-32.5 flex-col justify-evenly py-1'>
                    <div className='flex items-center gap-2'>
                        <span className='text-secondary-300 text-xs font-medium tracking-wide uppercase lg:text-sm'>
                            {categoryName}
                        </span>
                        <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                        <span className='text-xs text-slate-500'>
                            {publishedDate ? formatFullDate(publishedDate, locale) : '-'}
                        </span>
                    </div>

                    <div className='flex flex-col items-start justify-start gap-2'>
                        <h3 className='text-primary-900 group-hover:text-primary-500 line-clamp-2 text-base leading-tight font-bold transition-colors'>
                            {title}
                        </h3>

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
