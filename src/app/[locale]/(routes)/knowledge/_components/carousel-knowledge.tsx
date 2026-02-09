import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import { ArrowRight, Calendar, Eye, MessageSquareMore, Pencil } from 'lucide-react';

const articles = [
    {
        id: 1,
        category: 'RISET',
        date: '12 Januari 2025',
        title: 'Menakar Masa Depan Demokrasi Indonesia Pasca 2024',
        description:
            'Analisis komprehensif mengenai peta politik, tantangan elektoral, dan peran masyarakat sipil dalam menjaga integritas demokrasi Indonesia.',
        author: 'Samantha',
        views: 345,
        comments: 10,
        image: '/images/poster-infid-1.png'
    },
    {
        id: 2,
        category: 'RISET',
        date: '20 Februari 2025',
        title: 'Program Sosial di Indonesia: Meningkat Tetap Belum Optimal',
        description:
            'Laporan ini mengulas efektivitas program sosial nasional berdasarkan pengukuran indeks barometer sosial terbaru.',
        author: 'Michael',
        views: 289,
        comments: 6,
        image: '/images/poster-infid-2.png'
    },
    {
        id: 3,
        category: 'RISET',
        date: '5 Maret 2025',
        title: 'Pembangunan Inklusif dan Tantangan Ketimpangan Regional',
        description:
            'Studi tentang ketimpangan pembangunan antar wilayah dan rekomendasi kebijakan untuk mendorong pertumbuhan yang lebih merata.',
        author: 'Andreas',
        views: 198,
        comments: 4,
        image: '/images/poster-infid-1.png'
    }
];

export function ArticleCarousel() {
    return (
        <Carousel
            opts={{
                align: 'start',
                slidesToScroll: 1
            }}
            className='relative mb-5 w-full overflow-visible'>
            <CarouselContent className='-ml-4'>
                {articles.map((item) => (
                    <CarouselItem key={item.id} className='basis-[80%] pl-4 lg:basis-[70%]'>
                        <article className='flex h-full flex-col items-start overflow-hidden rounded-xl border bg-white p-3 lg:flex-row lg:items-center'>
                            {/* Image */}
                            <div className='relative h-87.5 w-full shrink-0 lg:w-61.75'>
                                <Image src={item.image} alt={item.title} fill className='rounded-lg object-cover' />
                            </div>

                            {/* Content */}
                            <div className='flex flex-1 flex-col py-3 lg:p-5'>
                                <div className='mb-4 flex items-center gap-2'>
                                    <Badge variant='secondary'> {item.category}</Badge>
                                    <span className='text-sm text-slate-500'>{item.date}</span>
                                </div>
                                <div className='mb-8 space-y-4'>
                                    <h3 className='text-xl font-bold md:text-2xl lg:text-3xl'>{item.title}</h3>
                                    <p className='line-clamp-2 text-sm text-slate-600 md:text-base lg:text-lg'>
                                        {item.description}
                                    </p>
                                    <div className='flex flex-wrap items-center gap-2 text-xs text-slate-500'>
                                        <div className='flex items-center gap-1'>
                                            <Pencil className='h-3 w-3' />
                                            By Samantha
                                        </div>

                                        <span className='h-1 w-1 rounded-full bg-slate-500' />

                                        <div className='flex items-center gap-1'>
                                            <Eye className='h-3 w-3' />
                                            200 Dilihat
                                        </div>

                                        <span className='h-1 w-1 rounded-full bg-slate-500' />

                                        <div className='flex items-center gap-1'>
                                            <MessageSquareMore className='h-3 w-3' />
                                            14 Komentar
                                        </div>
                                    </div>
                                </div>
                                <Button size='sm' className='w-fit rounded-full'>
                                    Baca Selengkapnya
                                    <ArrowRight />
                                </Button>
                            </div>
                        </article>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Gradient preview overlay */}
            <div className='pointer-events-none absolute top-0 right-0 h-full w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(247,245,242,1)_100%)]' />

            <CarouselPrevious className='left-0 md:-left-5' />
            <CarouselNext className='right-0 md:-right-5' />
        </Carousel>
    );
}
