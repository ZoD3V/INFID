import Image from 'next/image';

import { ArrowRight, Users } from 'lucide-react';

const AboutUsSection = () => {
    return (
        <section className='bg-white py-16 lg:py-24' id='about-us'>
            <div className='container'>
                <div className='grid items-center gap-10 md:grid-cols-2 lg:gap-12'>
                    {/* Left Side - Images */}
                    <div className='relative'>
                        {/* Main Image */}
                        <Image
                            src='/images/about-us.webp'
                            alt='images'
                            width={500}
                            height={500}
                            className='z-1 h-auto w-125'
                        />

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
                        <div className='mb-4 flex items-center gap-2 text-xs font-medium tracking-wider text-gray-500'>
                            <span className='h-px w-4 bg-slate-400'></span>
                            TENTANG KAMI
                            <span className='h-px w-4 bg-slate-400'></span>
                        </div>

                        <h2 className='mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-5xl'>
                            DARI INGIN
                            <br />
                            MENJADI INFID
                        </h2>

                        <div className='space-y-4 text-justify text-sm leading-relaxed text-slate-600'>
                            <p>
                                Didirikan pada tahun 1985 sebagai INGI (Inter-NGO Conference on IGGI Matters), kami
                                lahir dari kebutuhan mendesak untuk menyuarakan dampak kebijakan utang luar negeri
                                terhadap masyarakat miskin di Indonesia.
                            </p>

                            <p>
                                Bertransformasi menjadi INFID, kami memperluas mandat untuk mencakup demokratisasi, hak
                                asasi manusia, dan pembangunan berkelanjutan.
                            </p>

                            <p>
                                Hari ini, INFID adalah rumah bagi lebih dari 80 organisasi anggota yang tersebar di
                                seluruh nusantara, bekerja bersama untuk memastikan kebijakan publik berpihak pada
                                keadilan sosial.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex items-center gap-4'>
                                <Image src='/icons/ic-user-signal.png' alt='icon' width={50} height={50} />
                                <div>
                                    <h3 className='mb-1 text-base font-bold text-gray-900 lg:mb-2 lg:text-lg'>
                                        Lebih dari 80 organisasi anggota
                                    </h3>
                                    <p className='text-sm leading-relaxed text-gray-600'>
                                        Tersebar di seluruh nusantara, bekerja bersama untuk memastikan kebijakan publik
                                        berpihak pada keadilan sosial.
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
