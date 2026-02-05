import Image from 'next/image';

import { formatDateShort } from '@/lib/utils';

import { FeaturedNewsItem } from '../data/data';
import { Eye, MessageSquareMore, Pencil } from 'lucide-react';

interface FeaturedNewsProps {
    items: FeaturedNewsItem[];
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ items }) => {
    return (
        <div className='mb-8 grid gap-4 md:grid-cols-2'>
            {items.slice(0, 2).map((item) => (
                <div key={item.id} className='group cursor-pointer rounded-xl border border-slate-200 bg-white p-3'>
                    {/* Image */}
                    <div className='relative mb-6 h-70 overflow-hidden rounded-lg lg:h-80 xl:h-88'>
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className='object-cover transition-transform duration-500'
                        />

                        {/* Badge */}
                        <div className='absolute top-3 left-3'>
                            <span className='bg-secondary-300 rounded-full px-3 py-1.5 text-xs font-medium text-white'>
                                {item.badge}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='flex items-start gap-4 px-1 pb-2 lg:px-4'>
                        {/* Date */}
                        <div className='mb-4 hidden flex-col items-center lg:flex'>
                            <div className='text-primary-900 text-5xl font-bold'>
                                {formatDateShort(item.date).split(' ')[0]}
                            </div>
                            <div className='text-xs text-slate-600 uppercase'>
                                {formatDateShort(item.date).split(' ')[1]} {formatDateShort(item.date).split(' ')[2]}
                            </div>
                        </div>

                        {/* Text */}
                        <div className='flex flex-col pb-2 lg:pb-0'>
                            <h2 className='text-primary-900 group-hover:text-primary-500 mb-2 line-clamp-2 text-xl font-bold lg:text-2xl'>
                                {item.title}
                            </h2>

                            <p className='mb-2 line-clamp-2 text-sm leading-relaxed text-slate-600'>
                                {item.description}
                            </p>

                            {/* Meta */}
                            <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
                                <div className='flex items-center gap-1'>
                                    <Pencil className='h-3 w-3' />
                                    By {item.createdBy}
                                </div>

                                <span className='h-1 w-1 rounded-full bg-slate-500' />

                                <div className='flex items-center gap-1'>
                                    <Eye className='h-3 w-3' />
                                    {item.seen} Dilihat
                                </div>

                                <span className='h-1 w-1 rounded-full bg-slate-500' />

                                <div className='flex items-center gap-1'>
                                    <MessageSquareMore className='h-3 w-3' />
                                    {item.comments} Komentar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
