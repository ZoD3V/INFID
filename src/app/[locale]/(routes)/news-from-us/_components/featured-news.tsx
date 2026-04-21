'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import CardContent from '@/components/common/card-content';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatDateShort } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';

interface FeaturedNewsProps {
    items: Post[];
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ items }) => {
    const router = useRouter();
    const locale = useLocale();

    const handleNavigation = (e: React.SyntheticEvent | React.MouseEvent | React.KeyboardEvent, item: any) => {
        e.preventDefault();

        try {
            apiRequest.get(`${API_ENDPOINTS.posts}/${item.id}/view`);
        } catch (error) {
            console.error('Tracking error:', error);
        }

        router.push(`/news-from-us/${item.id}-${item.translations[0]?.slug}`);
    };

    return (
        <div className='w-full'>
            <Carousel
                opts={{
                    align: 'start',
                    loop: true
                }}
                className='w-full'>
                <CarouselContent className='-ml-4'>
                    {items.map((item, index) => {
                        const translation =
                            item?.translations?.find((t) => t.language === locale) ||
                            item?.translations?.find((t) => t.language === 'id') ||
                            item?.translations?.[0];

                        const title = translation?.title || 'No Title';
                        const description = translation?.content || '';
                        const categoryName = item.category?.name || 'Featured';
                        const authorName = item.author?.name || 'Admin';
                        const seen = item?.views || 0;
                        const comments = item.comments?.length || 0;
                        const dateRaw = item.published_at || item.created_at;

                        const formattedDate = formatDateShort(dateRaw);
                        const dateParts = formattedDate.split(' ');

                        return (
                            <CarouselItem key={index} className='pl-4 md:basis-1/2 lg:basis-1/2'>
                                <div
                                    onClick={(e) => handleNavigation(e, item)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleNavigation(e, item);
                                        }
                                    }}
                                    className='group h-full focus:outline-none'
                                    role='button'
                                    tabIndex={0}
                                    aria-labelledby={`title-${index}`}>
                                    <div className='h-full cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition-all hover:shadow-md'>
                                        {/* Image Section */}
                                        <div className='relative mb-6 h-64 overflow-hidden rounded-lg lg:h-72 xl:h-80'>
                                            <Image
                                                src={item.cover || '/images/placeholder-square.png'}
                                                alt={`Cover for ${title}`}
                                                fill
                                                sizes='(max-width: 768px) 100vw, 50vw'
                                                className='object-cover transition-transform duration-500'
                                            />
                                            <div className='absolute top-3 left-3'>
                                                <span className='bg-secondary-300 rounded-full px-3 py-1.5 text-xs font-medium text-white'>
                                                    {categoryName}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className='flex items-start gap-4 px-1 pb-2 lg:px-4'>
                                            {/* Date Box */}
                                            <div
                                                className='mb-4 hidden flex-col items-center lg:flex'
                                                aria-hidden='true'>
                                                <div className='text-primary-900 text-5xl font-bold'>
                                                    {dateParts[0]}
                                                </div>
                                                <div className='text-center text-xs whitespace-nowrap text-slate-600 uppercase'>
                                                    {dateParts[1]} <br /> {dateParts[2]}
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div className='flex flex-col pb-2 lg:pb-0'>
                                                <h2
                                                    id={`title-${index}`}
                                                    className='text-primary-900 decoration-primary-500 mb-2 -ml-1 line-clamp-2 rounded-sm px-1 text-xl font-bold underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline lg:text-2xl'>
                                                    {title}
                                                </h2>

                                                <CardContent content={description} />

                                                {/* Meta Information */}
                                                <div className='mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
                                                    <div
                                                        className='flex items-center gap-1'
                                                        aria-label={`Penulis: ${authorName}`}>
                                                        <Pencil className='h-3 w-3' aria-hidden='true' />
                                                        By {authorName}
                                                    </div>
                                                    <span
                                                        className='h-1 w-1 rounded-full bg-slate-500'
                                                        aria-hidden='true'
                                                    />
                                                    <div
                                                        className='flex items-center gap-1'
                                                        aria-label={`${seen} tampilan`}>
                                                        <Eye className='h-3 w-3' aria-hidden='true' />
                                                        {seen} {locale == 'id' ? 'Dilihat' : 'Seen'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className='-left-1 md:-left-5' />
                <CarouselNext className='-right-1 md:-right-5' />
            </Carousel>
        </div>
    );
};
