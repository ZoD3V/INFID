import Image from 'next/image';

import { formatArticleDate, getDisplayCategoryName, getLangText } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ArticleCardProps<T extends Post> {
    article: T;
    className?: string;
    imageClassName?: string;
    aspectRatio?: 'video' | 'square' | 'auto';
    onClick?: () => void;
}
export function ArticleCard<T extends Post>({ article, className, imageClassName, onClick }: ArticleCardProps<T>) {
    const locale = useLocale();

    const translation =
        article?.translations?.find((t) => t.language === locale) ||
        article?.translations?.find((t) => t.language === 'id') ||
        article?.translations?.[0];

    const title = translation?.title || 'No Title';
    const translatedName = getLangText(article?.category.name, locale);
    const categoryName = getDisplayCategoryName(translatedName);
    const authorName = article.author?.name || 'Admin';
    const publishedDate = article.published_at;
    const comments = article.comments;
    const seen = article.views;

    const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            role='button'
            tabIndex={0}
            aria-labelledby={`title-${article.id}`}
            onClick={handleInteraction}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleInteraction(e);
                }
            }}
            className={cn(
                'group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-shadow duration-200 outline-none hover:shadow-md',
                className
            )}>
            <div className='relative w-full'>
                <img
                    src={article.cover || '/images/placeholder-potrait.png'}
                    alt=''
                    aria-hidden='true'
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-square.png';
                    }}
                    className={cn(
                        'h-40 w-full rounded-xl object-cover transition-transform duration-300',
                        imageClassName
                    )}
                />
            </div>

            <div className='px-1 pb-2'>
                <div className='flex items-center gap-2 py-4' aria-hidden='true'>
                    <span className='text-secondary-300 text-xs font-medium uppercase'>{categoryName}</span>
                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                    <span className='text-xs text-slate-500'>
                        {publishedDate ? formatArticleDate(publishedDate) : 'Invalid Date'}
                    </span>
                </div>

                <div className='space-y-2'>
                    <h3
                        id={`title-${article.id}`}
                        className='text-primary-900 group-hover:text-primary-500 decoration-primary-500 -ml-1 line-clamp-2 rounded-sm px-1 text-base leading-snug font-bold underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline lg:text-lg'>
                        {title}
                    </h3>

                    <div className='flex items-center gap-2 text-xs text-slate-500'>
                        <div className='flex items-center gap-1' aria-label={`${seen ?? 0} dilihat`}>
                            <Eye className='h-3 w-3' aria-hidden='true' /> {seen ?? 0}{' '}
                            {locale == 'id' ? 'Dilihat' : 'Seen'}
                        </div>
                        <span className='h-1 w-1 rounded-full bg-slate-500' aria-hidden='true'></span>
                        <div className='flex items-center gap-1' aria-label={`${comments?.length ?? 0} komentar`}>
                            <MessageSquareMore className='h-3 w-3' aria-hidden='true' /> {comments?.length ?? 0}{' '}
                            {locale == 'id' ? 'Komentar' : 'Comment'}
                        </div>
                    </div>

                    <div
                        className='flex items-center gap-1 text-xs text-gray-500'
                        aria-label={`Penulis: ${authorName}`}>
                        <Pencil className='h-3 w-3' aria-hidden='true' /> By {authorName}
                    </div>
                </div>
            </div>
        </div>
    );
}
