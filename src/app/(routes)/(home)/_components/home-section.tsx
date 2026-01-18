import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { ArrowDown, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <section
            className='relative min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: "url('/images/background-home.webp')" }}>
            <div className='absolute inset-0 bg-black/60'></div>

            <div className='absolute bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2 transform animate-bounce'>
                <Image src='/icons/ic-arrow-down.png' alt='icon' width={15} height={15} />
            </div>

            <div className='relative z-20 container flex min-h-screen items-center pt-12'>
                <div className='grid w-full gap-12 py-20 lg:grid-cols-2'>
                    {/* Left Content */}
                    <div className='flex flex-col justify-center space-y-8'>
                        {/* Tag */}
                        <div className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm'>
                            <span className='h-2 w-2 animate-pulse rounded-full bg-orange-500'></span>
                            <p className='text-xs font-medium tracking-wide text-white'>
                                MENGGERAKKAN PERUBAHAN BERSAMA
                            </p>
                        </div>

                        {/* Main Heading */}
                        <div className='space-y-0 leading-[0.95]'>
                            <h1 className='text-6xl font-extrabold text-white lg:text-7xl'>SUARA</h1>

                            <h1 className='bg-linear-to-r from-[#F4C75C] to-[#F59D41] bg-clip-text text-6xl font-extrabold text-transparent lg:text-7xl'>
                                KEADILAN
                            </h1>

                            <h1 className='text-6xl font-extrabold text-white lg:text-7xl'>SOSIAL</h1>
                        </div>

                        {/* Description */}
                        <p className='max-w-xl text-sm leading-relaxed text-slate-200'>
                            Sejak 1985, kami menghubungkan aspirasi masyarakat sipil dengan kebijakan negara. Membangun{' '}
                            <span className='font-semibold text-white'>Indonesia</span> yang demokratis, inklusif, dan
                            berkelanjutan.
                        </p>

                        {/* CTA Buttons */}
                        <div className='flex flex-wrap gap-4'>
                            <Button className='rounded-full font-semibold'>
                                Jelajahi Program
                                <ArrowRight />
                            </Button>
                            <Button
                                variant='outline'
                                className='rounded-full border-white/30 bg-white/10 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-slate-100'>
                                Pelajari Sejarah
                            </Button>
                        </div>
                    </div>

                    {/* Right Stats Card */}
                    <div className='flex w-full items-end lg:justify-end'>
                        <div className='w-full space-y-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-md lg:w-xs'>
                            {/* Header */}
                            <div className='flex items-center justify-between gap-2 border-b border-white/10 pb-8 lg:pb-4'>
                                <h3 className='text-sm font-semibold tracking-wide text-white lg:text-xs'>
                                    DAMPAK KAMI
                                </h3>
                                <span className='h-2 w-2 rounded-full bg-orange-500'></span>
                            </div>

                            {/* Stats */}
                            <div className='space-y-6'>
                                {/* Stat 1 */}
                                <div className='space-y-2'>
                                    <div className='text-3xl font-bold text-white'>80+</div>
                                    <div className='text-sm text-gray-400 lg:text-base'>Organisasi Anggota</div>
                                </div>

                                {/* Stat 2 */}
                                <div className='space-y-2'>
                                    <div className='text-3xl font-bold text-white'>120+</div>
                                    <div className='text-sm text-gray-400 lg:text-base'>Rekomendasi Kebijakan</div>
                                </div>

                                {/* Stat 3 */}
                                <div className='space-y-2'>
                                    <div className='text-3xl font-bold text-white'>ECOSOC</div>
                                    <div className='text-sm text-gray-400 lg:text-base'>Status Konsultatif PBB</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            {/* <div className='absolute bottom-0 left-0 z-10 h-32 w-full bg-linear-to-t from-slate-950 to-transparent'></div> */}
        </section>
    );
};

export default Home;
