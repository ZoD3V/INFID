import Image from 'next/image';

import { SectionHeader } from '@/components/common/section-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Check, Eye, Pencil, Play, PlayCircle, X } from 'lucide-react';

const RealImpactSection = () => {
    const videoId = 'OK_b2-w0u60';
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    return (
        <section
            className='bg-primary relative overflow-hidden py-24'
            style={{ backgroundImage: "url('/images/bg-pattern.png')" }}>
            <div className='container'>
                {/* Header */}
                <SectionHeader
                    badge='Bergerak, Berdampak'
                    title='Dampak perubahan dari kerja bersama di lapangan'
                    description='Setiap program menghadirkan cerita nyata. Simak ringkasan dampak, lalu telusuri kisah lengkapnya seperti membaca blog.'
                />

                {/* Bento Grid */}
                <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
                    {/* 1. Rekomendasi Kebijakan  */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className='group col-span-1 cursor-pointer rounded-xl border border-slate-200 bg-white p-2 transition-all duration-300 md:col-span-12 lg:col-span-7'>
                                {/* Image Container */}
                                <div className='relative mb-4 h-70 overflow-hidden rounded-lg lg:h-80 xl:h-87'>
                                    <Image
                                        src='/images/background-about-us.webp'
                                        alt='featured'
                                        fill
                                        className='object-cover transition-all duration-300'
                                    />

                                    <div className='absolute inset-0 flex items-center justify-center bg-black/20 transition-all'>
                                        <div className='rounded-full bg-white/90 p-3 shadow-lg'>
                                            <Play />
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className='absolute top-3 left-3'>
                                        <span className='bg-secondary-300 rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-sm'>
                                            Video
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='flex items-start gap-4 px-1 pb-2 lg:px-4'>
                                    {/* Date */}
                                    <div className='mb-4 hidden flex-col items-center lg:flex'>
                                        <div className='text-primary-900 text-5xl font-bold'>24</div>
                                        <div className='text-xs font-semibold text-slate-600 uppercase'>OKT 23</div>
                                    </div>

                                    {/* Text */}
                                    <div className='flex flex-col pb-2 lg:pb-0'>
                                        <h3 className='group-hover:text-primary-500 line-clamp-2 text-xl leading-snug font-bold transition-colors lg:text-2xl'>
                                            Perjalanan SDGs Tangerang - INFID
                                        </h3>

                                        <p className='mb-2 text-sm leading-relaxed text-slate-600'>
                                            Memastikan ketersediaan dan pengelolaan air bersih dan sanitasi yang
                                            berkelanjutan merupakan tujuan ke-6 dari Tujuan Pembangunan Berkelanjutan
                                            (TPB/SDGs). Sayangnya, penyediaan akses terhadap air bersih dan fasilitas
                                            sanitasi di Indonesia dalam praktiknya belum optimal, salah satunya yang
                                            ditemukan di pesantren.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>

                        {/* Video Popup Modal */}
                        <DialogContent className='max-w-[calc(100%-2rem)] overflow-hidden border-none bg-black p-0 md:max-w-184 [&>button]:hidden'>
                            <VisuallyHidden>
                                <DialogHeader>
                                    <DialogTitle>Video Perjalanan SDGs Tangerang - INFID</DialogTitle>
                                </DialogHeader>
                            </VisuallyHidden>
                            <div className='aspect-video w-full'>
                                <iframe
                                    width='100%'
                                    height='100%'
                                    src={videoSrc}
                                    title='YouTube video player'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                    allowFullScreen
                                    className='border-none'></iframe>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* 2. Kartu Artikel (HARMONI)  */}
                    <div className='group col-span-1 flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2 transition-all duration-300 hover:shadow-md md:col-span-6 lg:col-span-5 lg:min-h-112.5'>
                        <Image
                            src='/images/background-about-us.webp'
                            alt='Harmoni'
                            width={600}
                            height={400}
                            className='h-40 w-full rounded-xl object-cover transition-transform duration-500 lg:h-87'
                        />
                        <div className='px-1 pb-2'>
                            <div className='flex items-center gap-2 py-4'>
                                <span className='text-secondary-300 text-xs font-medium uppercase'>HARMONI</span>
                                <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                <span className='text-xs text-slate-500'>15 Feb 2025</span>
                            </div>

                            <div className='space-y-3'>
                                <h3 className='group-hover:text-primary-500 line-clamp-2 text-xl leading-snug font-bold transition-colors lg:text-2xl'>
                                    Dari ketegangan menjadi ruang dialog warga
                                </h3>
                                <p className='mb-2 line-clamp-2 hidden text-sm leading-relaxed text-slate-600 lg:block'>
                                    Cerita singkat bagaimana fasilitasi dialog membantu komunitas membangun kesepakatan
                                    dan meredam konflik.
                                </p>
                                {/* Info tambahan tetap di bawah karena justify-between */}
                                <div className='flex items-center gap-3 text-xs text-slate-500'>
                                    <div className='flex items-center gap-1'>
                                        <Pencil size={14} /> By Joko
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Eye size={14} /> 200 Dilihat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Riset Statistik */}
                    <div className='group col-span-1 flex cursor-pointer flex-col rounded-xl border-slate-200 bg-white p-2 backdrop-blur-sm transition-all duration-300 hover:shadow-md md:col-span-6 lg:col-span-4'>
                        <Image
                            src='/images/background-about-us.webp'
                            alt='Harmoni'
                            width={600}
                            height={400}
                            className='h-40 w-full rounded-xl object-cover transition-transform duration-500 lg:h-57'
                        />
                        <div className='px-1 pb-2'>
                            <div className='flex items-center gap-2 py-4'>
                                <span className='text-secondary-300 text-xs font-medium uppercase'>HARMONI</span>
                                <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                <span className='text-xs text-slate-500'>15 Feb 2025</span>
                            </div>

                            <div className='space-y-3'>
                                <h3 className='group-hover:text-primary-500 line-clamp-2 text-base leading-snug font-bold transition-colors lg:text-lg'>
                                    Dari ketegangan menjadi ruang dialog warga
                                </h3>
                                <div className='flex items-center gap-3 text-xs text-slate-500'>
                                    <div className='flex items-center gap-1'>
                                        <Pencil size={14} /> By Joko
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Eye size={14} /> 200 Dilihat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Provinsi Dijangkau */}
                    <div className='group col-span-1 flex cursor-pointer flex-col rounded-xl border-slate-200 bg-white p-2 backdrop-blur-sm transition-all duration-300 hover:shadow-md md:col-span-6 lg:col-span-4'>
                        <Image
                            src='/images/background-about-us.webp'
                            alt='Harmoni'
                            width={600}
                            height={400}
                            className='h-40 w-full rounded-xl object-cover transition-transform duration-500 lg:h-57'
                        />
                        <div className='px-1 pb-3'>
                            <div className='flex items-center gap-2 py-4'>
                                <span className='text-secondary-300 text-xs font-medium uppercase'>HARMONI</span>
                                <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                <span className='text-xs text-slate-500'>15 Feb 2025</span>
                            </div>

                            <div className='space-y-3'>
                                <h3 className='group-hover:text-primary-500 line-clamp-2 text-base leading-snug font-bold transition-colors lg:text-lg'>
                                    Dari ketegangan menjadi ruang dialog warga
                                </h3>
                                <div className='flex items-center gap-3 text-xs text-slate-500'>
                                    <div className='flex items-center gap-1'>
                                        <Pencil size={14} /> By Joko
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Eye size={14} /> 200 Dilihat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Organisasi Anggota */}
                    <div className='order bg-secondary-100 col-span-1 flex flex-col items-center justify-between gap-4 rounded-xl border-slate-200 backdrop-blur-sm transition-all duration-300 hover:shadow-md md:col-span-6 lg:col-span-4'>
                        <Image
                            src='/images/decoration-footer-1.png'
                            alt='decoration'
                            width={175}
                            height={175}
                            className='ml-24 rounded-xl'
                        />
                        <div className='px-5 pb-5 lg:pt-0'>
                            <div className='space-y-2 lg:space-y-4'>
                                <h3 className='group-hover:text-primary-500 line-clamp-2 text-xl leading-snug font-bold transition-colors lg:text-2xl'>
                                    Jelajahi semua kisah{' '}
                                    <span className='font-extrabold italic'>Bergerak, Berdampak</span>
                                </h3>
                                <p className='max-w-3xl text-base'>
                                    Temukan lebih banyak cerita perubahan, pembelajaran, dan dokumentasi program dalam
                                    format artikel.
                                </p>
                                <Button className='w-full rounded-full'>Simak Semua Cerita</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealImpactSection;
