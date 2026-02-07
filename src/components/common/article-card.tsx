import Image from 'next/image';

import { formatArticleDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';

interface BaseArticle {
    image: string;
    title: string;
    category: string;
    date: string | Date;
    author: string;
}

interface ArticleCardProps<T extends BaseArticle> {
    article: T;
    className?: string;
    imageClassName?: string;
    aspectRatio?: 'video' | 'square' | 'auto';
}

export function ArticleCard<T extends BaseArticle>({ article, className, imageClassName }: ArticleCardProps<T>) {
    return (
        <div
            className={cn(
                'group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md',
                className
            )}>
            <div className='relative w-full'>
                <Image
                    src={article.image}
                    alt={article.title}
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
                    <span className='text-secondary-300 text-xs font-medium uppercase'>{article.category}</span>
                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                    <span className='text-xs text-slate-500'>
                        {typeof article.date === 'string' || article.date instanceof Date
                            ? formatArticleDate(article.date)
                            : 'Invalid Date'}
                    </span>
                </div>

                <div className='space-y-2'>
                    <h3 className='group-hover:text-primary-500 line-clamp-2 text-base leading-snug font-bold lg:text-lg'>
                        {article.title}
                    </h3>
                    <div className='flex items-center gap-2 text-xs text-slate-500'>
                        <div className='flex items-center gap-1'>
                            <Eye className='h-3 w-3' /> 200 Dilihat
                        </div>
                        <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                        <div className='flex items-center gap-1'>
                            <MessageSquareMore className='h-3 w-3' /> 20 Komentar
                        </div>
                    </div>
                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                        <Pencil className='h-3 w-3' /> By {article.author}
                    </div>
                </div>
            </div>
        </div>
    );
}
