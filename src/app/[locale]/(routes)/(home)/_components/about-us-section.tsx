import Image from 'next/image';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { ArrowRight, Play, Users } from 'lucide-react';

const AboutUsSection = () => {
    const videoId = 'U0t1MvVi-9I';
    const startTime = 74;
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;

    return (
        <section className='bg-secondary-100 relative py-24' id='about-us'>
            <Image
                src='/images/decoration-about-us-2.png'
                alt='images'
                width={90}
                height={90}
                className='absolute top-10 right-10 hidden xl:block'
            />
            <div className='container'>
                <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-12'>
                    {/* Left Side - Images */}
                    <div className='relative'>
                        {/* Main Image */}
                        <Image
                            src='/images/decoration-program-2.png'
                            alt='images'
                            width={100}
                            height={100}
                            className='absolute -top-10 left-10 hidden xl:block'
                        />
                        <Image
                            src='/images/about-us.webp'
                            alt='images'
                            width={500}
                            height={500}
                            className='z-1 h-auto w-full'
                        />

                        <Dialog>
                            <DialogTrigger asChild>
                                {/* Play Button */}
                                <div className='group absolute bottom-13 left-18 z-0 cursor-pointer p-10 md:bottom-40 md:left-50 xl:bottom-27 xl:left-33'>
                                    <div className='rounded-full bg-white/90 p-3 group-hover:shadow-lg'>
                                        <Play />
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

                        {/* Decorative Logo */}
                        <div className='pointer-events-none absolute -bottom-20 -left-20 z-0 hidden xl:block'>
                            <Image
                                src='/images/decoration-about.png'
                                alt='images'
                                width={200}
                                height={200}
                                className='z-1 h-auto w-45'
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div>
                        <div className='text-primary mb-4 flex items-center gap-2 text-xs font-medium tracking-wider'>
                            <span className='bg-primary h-px w-4'></span>
                            TENTANG KAMI
                            <span className='bg-primary h-px w-4'></span>
                        </div>

                        <h2 className='text-primary mb-6 text-4xl leading-tight font-bold lg:text-5xl'>
                            Mengawal Pembangunan Berkeadilan
                        </h2>

                        <div className='space-y-4 text-left text-base leading-relaxed text-slate-600'>
                            <p>
                                International NGO Forum on Indonesian Development (INFID) adalah jaringan organisasi
                                masyarakat sipil yang berdiri sejak 1985 dan berkomitmen untuk memperjuangkan
                                pembangunan berkeadilan, demokrasi, kesetaraan, dan penghormatan terhadap hak asasi
                                manusia di Indonesia.
                            </p>

                            <p>
                                INFID bekerja melalui pendekatan advokasi inklusif berbasis bukti, dengan fokus pada
                                isu-isu strategis seperti penurunan ketimpangan, pelaksanaan Tujuan Pembangunan
                                Berkelanjutan (SDGs), serta penguatan ruang sipil dan demokrasi.
                            </p>

                            <p>
                                INFID memiliki 80 anggota di seluruh Indonesia dan terakreditasi oleh Perserikatan
                                Bangsa-Bangsa (PBB) dan menyandang Special Consultative Status untuk ECOSOC di PBB.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex items-center gap-4'>
                                <Image src='/icons/ic-user-signal.png' alt='icon' width={50} height={50} />
                                <div>
                                    <h3 className='mb-1 text-base font-bold text-gray-900 lg:mb-2 lg:text-lg'>
                                        Memiliki 80 organisasi anggota
                                    </h3>
                                    <p className='text-sm leading-relaxed text-gray-600 md:text-base'>
                                        Tersebar di seluruh nusantara, bekerja bersama untuk mengenal lebih dalam
                                        kebijakan publik berpihak pada keadilan sosial.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className='group mt-6 inline-flex cursor-pointer items-center gap-2 border-b border-slate-900 pb-2 text-sm font-semibold lg:mt-8'>
                            Baca Selengkapnya
                            <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
