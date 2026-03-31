import Image from 'next/image';

import { formatArticleDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';

export interface BaseArticle {
    id: number;
    cover: string;
    category: {
        name: string;
    };
    published_at: string;
    comments: any;
    author: {
        name: string | null;
    };
    translations: {
        title: string;
        slug: string;
    }[];
}

interface ArticleCardProps<T extends BaseArticle> {
    article: T;
    className?: string;
    imageClassName?: string;
    aspectRatio?: 'video' | 'square' | 'auto';
}

export function ArticleCard<T extends BaseArticle>({ article, className, imageClassName }: ArticleCardProps<T>) {
    const locale = useLocale();

    const langIndex = locale === 'id' ? 0 : 1;
    const translation = article.translations?.[langIndex] || article.translations?.[0];

    const title = translation?.title || 'No Title';
    const categoryName = article.category?.name || 'Uncategorized';
    const authorName = article.author?.name || 'Admin';
    const publishedDate = article.published_at;
    const comments = article.comments;

    return (
        <div
            className={cn(
                'group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md',
                className
            )}>
            <div className='relative w-full'>
                <Image
                    src={article.cover || '/images/placeholder-potrait.png'}
                    alt={title}
                    width={600}
                    height={400}
                    className={cn(
                        'h-40 w-full rounded-xl object-cover transition-transform duration-300',
                        imageClassName
                    )}
                />
            </div>

            <div className='px-1 pb-2'>
                <div className='flex items-center gap-2 py-4'>
                    <span className='text-secondary-300 text-xs font-medium uppercase'>{categoryName}</span>
                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                    <span className='text-xs text-slate-500'>
                        {publishedDate ? formatArticleDate(publishedDate) : 'Invalid Date'}
                    </span>
                </div>

                <div className='space-y-2'>
                    <h3 className='group-hover:text-primary-500 line-clamp-2 text-base leading-snug font-bold lg:text-lg'>
                        {title}
                    </h3>

                    <div className='flex items-center gap-2 text-xs text-slate-500'>
                        <div className='flex items-center gap-1'>
                            <Eye className='h-3 w-3' /> 0 Dilihat
                        </div>
                        <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                        <div className='flex items-center gap-1'>
                            <MessageSquareMore className='h-3 w-3' /> {comments?.length ?? 0} Komentar
                        </div>
                    </div>

                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                        <Pencil className='h-3 w-3' /> By {authorName}
                    </div>
                </div>
            </div>
        </div>
    );
}
