import Image from 'next/image';

import CardContent from '@/components/common/card-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link, useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatArticleDate } from '@/lib/utils';
import { Post } from '@/types/posts';

import { ArrowRight, Eye, MessageSquareMore, Pencil } from 'lucide-react';

interface FeaturedNewsProps {
    items: Post[];
}

export const ArticleCarousel: React.FC<FeaturedNewsProps> = ({ items }) => {
    const router = useRouter();

    const handleNavigation = async (e: React.MouseEvent, item: any) => {
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
                        item.translations?.find((t: any) => t.language === 'id') || item.translations?.[0];

                    const title = translation?.title || 'No Title';
                    const seen = item.views || 0;
                    const comments = item.comments.length || 0;
                    const description = translation?.content || '';
                    const categoryName = item.category?.name || 'Featured';
                    const authorName = item.author?.name || 'Admin';
                    const publishedDate = item.published_at || item.created_at;

                    return (
                        <CarouselItem key={item.id} className='basis-[80%] pl-4 lg:basis-[70%]'>
                            <article className='flex h-full flex-col overflow-hidden rounded-xl border bg-white p-3 lg:flex-row lg:items-center'>
                                <div className='relative h-60 w-full shrink-0 md:h-87.5 lg:w-61.75'>
                                    <Image
                                        src={item.cover || '/images/placeholder-potrait.png'}
                                        alt={title}
                                        fill
                                        sizes='(max-width: 1024px) 100vw, 250px'
                                        className='rounded-lg object-cover'
                                    />
                                </div>

                                {/* Content */}
                                <div className='flex min-w-0 flex-1 flex-col py-3 lg:p-5'>
                                    <div>
                                        <div className='mb-3 flex items-center gap-2'>
                                            <Badge variant='secondary'>{categoryName}</Badge>
                                            <span className='text-sm text-slate-500'>
                                                {publishedDate ? formatArticleDate(publishedDate) : 'No Date'}
                                            </span>
                                        </div>

                                        <div className='mb-4 min-h-0 space-y-2'>
                                            <h3 className='line-clamp-2 text-xl font-bold md:text-2xl'>{title}</h3>

                                            <CardContent content={description} />
                                        </div>
                                    </div>
                                    <div className='mt-auto space-y-4'>
                                        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500'>
                                            <div className='flex items-center gap-1'>
                                                <Pencil className='h-3 w-3' />
                                                By {authorName}
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <Eye className='h-3 w-3' />
                                                {seen}
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <MessageSquareMore className='h-3 w-3' />
                                                {comments}
                                            </div>
                                        </div>

                                        <div onClick={(e) => handleNavigation(e, item)} className='block'>
                                            <Button size='sm' className='w-fit rounded-full'>
                                                Baca Selengkapnya
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

            {/* Gradient preview overlay */}
            <div className='pointer-events-none absolute top-0 right-0 h-full w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(247,245,242,1)_100%)]' />

            <CarouselPrevious className='left-0 md:-left-5' />
            <CarouselNext className='right-0 md:-right-5' />
        </Carousel>
    );
};
