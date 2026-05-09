import React from 'react';

import { formatFullDate } from '@/lib/utils';
import { Post, PostTranslation } from '@/types/posts';

import { Calendar, Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ArticleHeaderProps {
    data: Post | null;
    translation: PostTranslation | undefined;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ data, translation }) => {
    const locale = useLocale();

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='scroll-m-20 py-2 text-start text-3xl font-bold tracking-tight xl:text-4xl'>
                {translation?.title}
            </h1>

            <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
                {/* Author */}
                <div className='flex items-center gap-1'>
                    <Pencil className='h-3 w-3' />
                    By
                    <span className='font-semibold text-slate-900'>{data?.author?.name || 'Admin'}</span>
                </div>

                <span className='h-1 w-1 rounded-full bg-slate-500' />

                {/* Date */}
                <div className='flex items-center gap-2 truncate' suppressHydrationWarning>
                    <Calendar className='h-3 w-3' />
                    {data?.published_at ? formatFullDate(data.published_at, locale) : '-'}
                </div>

                <span className='h-1 w-1 rounded-full bg-slate-500' />

                {/* Views */}
                <div className='flex items-center gap-1'>
                    <Eye className='h-3 w-3' />
                    {data?.views || 0} {locale == 'id' ? 'Dilihat' : 'Seen'}
                </div>

                <span className='h-1 w-1 rounded-full bg-slate-500' />

                {/* Comments */}
                <div className='flex items-center gap-1'>
                    <MessageSquareMore className='h-3 w-3' />
                    {data?.comments?.length || 0} {locale == 'id' ? 'Komentar' : 'Comments'}
                </div>
            </div>
        </div>
    );
};
