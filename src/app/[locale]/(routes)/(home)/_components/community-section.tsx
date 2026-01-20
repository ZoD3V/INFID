import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

const CommunitySection = () => {
    return (
        <div className='absolute top-0 left-1/2 hidden w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center px-4 lg:flex'>
            <div className='relative container w-full overflow-hidden rounded-xl border bg-[#F7F5F2]'>
                <Image
                    src='/images/decoration-footer-2.png'
                    alt='decoration'
                    width={70}
                    height={70}
                    className='absolute right-0 bottom-0 hidden xl:block'
                />
                <Image
                    src='/images/decoration-footer-1.png'
                    alt='decoration'
                    width={120}
                    height={120}
                    className='absolute top-0 left-35 hidden xl:block'
                />
                {/* Content */}
                <div className='grid grid-cols-2 py-12'>
                    <div className='mb-6 w-full'>
                        <div className='mb-4 flex items-center gap-2 text-xs font-medium tracking-wider text-gray-500'>
                            <span className='h-px w-4 bg-slate-400'></span>
                            KINI SAATNYA
                            <span className='h-px w-4 bg-slate-400'></span>
                        </div>
                        <h1 className='text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl'>
                            MARI
                            <br />
                            BERGERAK
                        </h1>
                    </div>

                    <div className='flex w-full items-start justify-between gap-8'>
                        <div className='flex-1 space-y-6'>
                            <p className='text-base leading-relaxed text-gray-700'>
                                Bergabunglah dengan jaringan masyarakat sipil terbesar di Indonesia. Suara Anda penting.
                            </p>

                            <div className='flex gap-4'>
                                <Button className='w-full rounded-full'>Daftar Anggota</Button>
                                <Button variant='outline' className='w-full rounded-full'>
                                    Hubungi Kami
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunitySection;
