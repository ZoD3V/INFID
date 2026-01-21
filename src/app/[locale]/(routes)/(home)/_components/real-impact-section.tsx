import Image from 'next/image';

import { FileCheck, Globe, PieChart, Users } from 'lucide-react';

const RealImpactSection = () => {
    return (
        <section className='bg-primary relative overflow-hidden py-16'>
            {/* Background Pattern Top */}
            {/* <div
                className='pointer-events-none absolute top-0 left-0 h-64 w-full bg-top bg-no-repeat opacity-20 brightness-50'
                style={{ backgroundImage: 'url(/images/bg-pattern-top.png)', backgroundSize: 'cover' }}
            /> */}

            {/* Background Pattern Bottom */}
            {/* <div
                className='pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-bottom bg-no-repeat opacity-20 brightness-50'
                style={{ backgroundImage: 'url(/images/bg-pattern-bottom.png)', backgroundSize: 'cover' }}
            /> */}

            <div className='container'>
                {/* Header */}
                <div className='mb-12'>
                    <h1 className='text-secondary-200 mb-4 text-4xl font-bold lg:text-5xl'>DAMPAK NYATA</h1>
                    <p className='max-w-3xl text-sm text-slate-200'>
                        Bukan sekadar angka, tapi jejak perubahan yang kami perjuangkan bersama.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {/* Rekomendasi Kebijakan - Large Card */}
                    <div className='flex flex-col gap-4 rounded-xl border border-white bg-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:opacity-90 md:p-8 lg:col-span-2 lg:flex-row lg:items-center lg:gap-8'>
                        <Image src='/icons/ic-thumb.png' alt='icons' width={80} height={80} loading='lazy' />
                        <div className='flex flex-col items-start gap-2'>
                            <h2 className='text-secondary-200 mb-2 text-4xl font-extrabold'>120+</h2>
                            <div className='space-y-1'>
                                <h3 className='text-base font-bold text-white'>Rekomendasi Kebijakan</h3>
                                <p className='text-sm leading-relaxed text-slate-200'>
                                    Policy brief, laporan analisis, dan kertas posisi yang diadopsi pemerintah pusat dan
                                    daerah untuk mendorong pembangunan yang lebih inklusif dan berkeadilan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Riset Statistik */}
                    <div className='flex flex-col justify-between rounded-xl border border-white bg-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:opacity-90 md:p-8 lg:row-span-2'>
                        <div className='flex flex-col gap-2'>
                            <Image src='/icons/ic-chart.png' alt='icons' width={80} height={80} />
                            <h2 className='text-secondary-200 mt-4 text-4xl font-extrabold lg:mt-6'>40+</h2>
                            <h3 className='text-base font-semibold text-white'>Riset Statistik</h3>
                        </div>
                        <p className='text-sm leading-relaxed text-slate-200'>
                            Kajian mendalam mengenai demokrasi, HAM, ketimpangan, dan pembangunan berkelanjutan yang
                            menjadi rujukan bagi pembuat kebijakan nasional maupun internasional.
                        </p>
                    </div>

                    {/* Provinsi Dijangkau */}
                    <div className='rounded-xl border border-white bg-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:opacity-90 md:p-8'>
                        <Image src='/icons/ic-globe.png' alt='icons' width={80} height={80} className='h-auto w-auto' />

                        <h2 className='text-secondary-200 my-4 text-4xl font-extrabold'>20+</h2>
                        <div className='space-y-1'>
                            <h3 className='text-base font-bold text-white'>Provinsi Dijangkau</h3>
                            <p className='text-sm text-slate-200'>Intervensi program dan kolaborasi advokasi</p>
                        </div>
                    </div>

                    {/* Organisasi Anggota */}
                    <div className='bg-transparentlur-sm rounded-xl border border-white transition-all duration-300 hover:opacity-90 md:p-8'>
                        <Image src='/icons/ic-people.png' alt='icons' width={80} height={80} />

                        <h2 className='text-secondary-200 my-4 text-4xl font-extrabold'>80+</h2>
                        <div className='space-y-1'>
                            <h3 className='text-base font-bold text-white'>Organisasi Anggota</h3>
                            <p className='text-sm text-slate-200'>Kekuatan kolektif masyarakat sipil.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealImpactSection;
