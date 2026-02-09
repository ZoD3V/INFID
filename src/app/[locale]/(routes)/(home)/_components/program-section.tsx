import Image from 'next/image';

import SectionBadge from '@/components/common/section-badge';
import { Button } from '@/components/ui/button';

import { ArrowRight } from 'lucide-react';

const ProgramSection = () => {
    const programs = [
        {
            title: 'Masyarakat Sipil untuk Hak Asasi Manusia & Demokrasi',
            description:
                'Memperkuat peran masyarakat sipil dalam menegakkan HAM dan memastikan proses demokrasi yang substansial dan bebas dari kekerasan.',
            image: '/images/bg-program-1.webp'
        },
        {
            title: 'Tata Kelola Iklim yang Demokratis dan Berkeadilan Gender',
            description:
                'Mendorong kebijakan iklim yang partisipatif, transparan, dan responsif gender untuk memastikan keadilan bagi kelompok rentan.',
            image: '/images/bg-program-2.webp'
        },
        {
            title: 'Pembangunan yang Inklusif dan Berkeadilan',
            description:
                'Mengawal agenda pembangunan agar memberikan manfaat merata, mengurangi ketimpangan, dan tidak meninggalkan siapapun.',
            image: '/images/bg-program-3.webp'
        }
    ];

    return (
        <section className='bg-secondary-100 relative py-16'>
            <Image
                src='/images/decoration-program-1.png'
                alt='decoration'
                width={200}
                height={200}
                className='absolute top-0 left-0 hidden xl:block'
            />
            <Image
                src='/images/decoration-about.png'
                alt='images'
                width={180}
                height={180}
                className='absolute -bottom-10 -left-10 hidden xl:block'
            />
            <Image
                src='/images/decoration-program-2.png'
                alt='images'
                width={100}
                height={100}
                className='absolute right-20 bottom-5 z-30 hidden xl:block'
            />
            <div className='container'>
                <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
                    {/* Sticky Text Section */}
                    <div className='h-fit lg:sticky lg:top-25'>
                        <SectionBadge textColor='text-slate-500' lineColor='bg-slate-400'>
                            IMPACT STORY
                        </SectionBadge>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900 lg:text-5xl'>PROGRAM KAMI</h2>
                        <p className='mb-6 max-w-md text-sm text-slate-600 md:text-base'>
                            Pendekatan komprehensif untuk menjawab tantangan zaman. Dari isu hak hingga aksi lapangan.
                        </p>
                        {/* CTA Button */}
                        <button className='group inline-flex cursor-pointer items-center gap-2 border-b border-slate-900 pb-2 text-sm font-semibold lg:mt-8'>
                            Baca Selengkapnya
                            <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>

                    {/* Program Cards */}
                    <div className='space-y-6'>
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className='group relative overflow-hidden rounded-2xl border bg-slate-100 p-2'>
                                <div className='relative h-100 overflow-hidden rounded-xl bg-slate-900'>
                                    <Image
                                        src={program.image}
                                        alt={program.title}
                                        width={500}
                                        height={500}
                                        className='h-full w-full object-cover'
                                    />
                                    <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />
                                    <div className='absolute right-0 bottom-0 left-0 p-5 text-white lg:p-6'>
                                        <h3 className='mb-3 text-xl leading-tight font-bold lg:text-2xl'>
                                            {program.title}
                                        </h3>
                                        <p className='mb-4 text-sm leading-relaxed text-gray-200'>
                                            {program.description}
                                        </p>
                                        <Button variant='secondary' size='sm' className='rounded-full'>
                                            Jelajahi Program
                                            <ArrowRight />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramSection;
