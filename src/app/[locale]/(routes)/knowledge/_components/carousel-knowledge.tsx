'use client';

import Image from 'next/image';

import CardContent from '@/components/common/card-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatArticleDate } from '@/lib/utils';
import { Post } from '@/types/posts';

import { ArrowRight, Eye, MessageSquareMore, Pencil } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface FeaturedNewsProps {
    items: Post[];
}

export const ArticleCarousel: React.FC<FeaturedNewsProps> = ({ items }) => {
    const router = useRouter();
    const locale = useLocale();
    const b = useTranslations('button');

    const handleNavigation = async (e: React.MouseEvent | React.KeyboardEvent, item: any) => {
        if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;

        e.preventDefault();

        try {
            apiRequest.get(`${API_ENDPOINTS.posts}/${item.id}/view`);
        } catch (error) {
            console.error('Tracking error:', error);
        }

        router.push(`/knowledge/${item.id}-${item.translations[0]?.slug}`);
    };

    return (
        <Carousel
            opts={{
                align: 'start',
                slidesToScroll: 1
            }}
            className='relative mb-5 w-full overflow-visible'>
            <CarouselContent className='-ml-4'>
                {items.map((item) => {
                    const translation =
                        item?.translations?.find((t) => t.language === locale) ||
                        item?.translations?.find((t) => t.language === 'id') ||
                        item?.translations?.[0];

                    const title = translation?.title || 'No Title';
                    const seen = item.views || 0;
                    const comments = item.comments.length || 0;
                    const description = translation?.content || '';
                    const categoryName = item.category?.name || 'Featured';
                    const authorName = item.author?.name || 'Admin';
                    const publishedDate = item.published_at || item.created_at;

                    return (
                        <CarouselItem key={item.id} className='basis-[80%] pl-4 lg:basis-[70%]'>
                            <article
                                role='button'
                                tabIndex={0}
                                aria-labelledby={`carousel-title-${item.id}`}
                                onClick={(e) => handleNavigation(e, item)}
                                onKeyDown={(e) => handleNavigation(e, item)}
                                className='group flex h-full flex-col overflow-hidden rounded-xl border bg-white p-3 transition-all outline-none focus-within:ring-0 lg:flex-row lg:items-center'>
                                <div className='relative h-60 w-full shrink-0 md:h-87.5 lg:w-61.75'>
                                    <Image
                                        src={item.cover || '/images/placeholder-potrait.png'}
                                        alt=''
                                        aria-hidden='true'
                                        fill
                                        sizes='(max-width: 1024px) 100vw, 250px'
                                        className='rounded-lg object-cover'
                                    />
                                </div>

                                {/* Content */}
                                <div className='flex min-w-0 flex-1 flex-col py-3 lg:p-5'>
                                    <div>
                                        <div className='mb-3 flex items-center gap-2' aria-hidden='true'>
                                            <Badge variant='secondary'>{categoryName}</Badge>
                                            <span className='text-sm text-slate-500'>
                                                {publishedDate ? formatArticleDate(publishedDate) : 'No Date'}
                                            </span>
                                        </div>

                                        <div className='mb-4 min-h-0 space-y-2'>
                                            <h3
                                                id={`carousel-title-${item.id}`}
                                                className='decoration-primary-500 -ml-1 line-clamp-2 rounded-sm px-1 text-xl font-bold underline-offset-4 transition-all duration-200 group-focus:bg-blue-100 group-focus:underline md:text-2xl'>
                                                {title}
                                            </h3>

                                            <CardContent content={description} />
                                        </div>
                                    </div>

                                    <div className='mt-auto space-y-4'>
                                        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500'>
                                            <div
                                                className='flex items-center gap-1'
                                                aria-label={`Penulis: ${authorName}`}>
                                                <Pencil className='h-3 w-3' aria-hidden='true' />
                                                By {authorName}
                                            </div>
                                            <div
                                                className='flex items-center gap-1'
                                                aria-label={`${seen} kali dilihat`}>
                                                <Eye className='h-3 w-3' aria-hidden='true' />
                                                {seen} {locale == 'id' ? 'Dilihat' : 'Seen'}
                                            </div>
                                            <div
                                                className='flex items-center gap-1'
                                                aria-label={`${comments} komentar`}>
                                                <MessageSquareMore className='h-3 w-3' aria-hidden='true' />
                                                {comments} {locale == 'id' ? 'Komentar' : 'Comment'}
                                            </div>
                                        </div>

                                        {/* Button sekarang bersifat visual saja karena parent sudah interaktif, 
                                            atau kita bisa biarkan Button menangani kliknya.
                                         */}
                                        <div>
                                            <Button
                                                size='sm'
                                                className='pointer-events-none w-fit rounded-full'
                                                tabIndex={-1}
                                                aria-hidden='true'>
                                                {b('readMore')}
                                                <ArrowRight className='ml-2 h-4 w-4' />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>

            <div className='pointer-events-none absolute top-0 right-0 h-full w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(247,245,242,1)_100%)]' />

            <CarouselPrevious className='left-0 md:-left-5' />
            <CarouselNext className='right-0 md:-right-5' />
        </Carousel>
    );
};
