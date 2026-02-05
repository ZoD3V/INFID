import Image from 'next/image';

import { formatArticleDate } from '@/lib/utils';

import { Article } from '../data/data';
import { Eye, MessageSquareMore, Pencil } from 'lucide-react';

export function ArticleCard({ article }: { article: Article }) {
    return (
        <div className='group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md'>
            <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                className='h-40 w-full rounded-xl object-cover'
            />
            <div className='px-1 pb-2'>
                <div className='flex items-center gap-2 py-4'>
                    <span className='text-secondary-300 text-xs font-medium uppercase'>{article.category}</span>
                    <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                    <span className='text-xs text-slate-500'>{formatArticleDate(article.date)}</span>
                </div>

                <div className='space-y-2'>
                    <h3 className='group-hover:text-primary-500 line-clamp-2 text-base leading-snug font-bold lg:text-lg'>
                        {article.title}
                    </h3>
                    <div className='flex items-center gap-2 text-xs text-slate-500'>
                        <div className='flex items-center gap-1 text-xs'>
                            <Eye className='h-3 w-3' /> 200 Dilihat
                        </div>
                        <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                        <div className='flex items-center gap-1 text-xs'>
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
