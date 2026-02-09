import React from 'react';

import SectionBadge from '@/components/common/section-badge';

import { ArrowRight } from 'lucide-react';

const RegistrationProcess = () => {
    const processSteps = [
        {
            number: '01',
            title: 'Keputusan Hasil Seleksi',
            description:
                'Keputusan diterima atau tidaknya calon anggota akan dikeluarkan melalui Rapat Dewan Pengurus. Keputusan Dewan Pengurus diterbitkan dalam bentuk Surat Keputusan tentang Permohonan Calon Anggota'
        },
        {
            number: '02',
            title: 'Penyampaian Surat Keputusan',
            description:
                'Sekretariat INFID segera menyampaikan Surat Keputusan tentang Permohonan Calon Anggota kepada pihak yang berkepentingan.'
        },
        {
            number: '03',
            title: 'Pengesahan Anggota Baru',
            description:
                'Calon Anggota yang dinyatakan diterima akan ditetapkan dan disahkan dalam Sidang Umum sebagai Anggota INFID'
        },
        {
            number: '04',
            title: 'Informasi & Kontak',
            description:
                'Untuk memperoleh informasi lebih lanjut mengenai persyaratan dan proses pendaftaran anggota INFID, silahkan menghubungi Sekretariat INFID melalui email office@infid.org.'
        }
    ];

    return (
        <section className='bg-secondary-100 w-full py-24'>
            <div className='container'>
                <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                        <SectionBadge textColor='text-primary-500' lineColor='bg-primary-500'>
                            PROSES PENDAFTARAN
                        </SectionBadge>

                        <h2 className='mb-4 max-w-3xl text-4xl font-bold text-gray-900 lg:text-5xl'>
                            Proses Penerimaan Anggota INFID
                        </h2>
                        <p className='mb-6 max-w-2xl text-sm text-slate-600 md:text-base'>
                            Proses penerimaan dilakukan secara transparan dan bertahap melalui mekanisme organisasi
                            resmi.
                        </p>

                        {/* Help Box */}
                        <div className='bg-primary-900 mt-8 rounded-xl p-8 text-white'>
                            <h3 className='mb-3 text-xl font-semibold'>Butuh Bantuan?</h3>
                            <p className='mb-4 text-teal-100'>Hubungi sekretariat kami untuk panduan lebih lanjut.</p>
                            <a
                                href='mailto:office@infid.org'
                                className='group inline-flex items-center gap-2 font-medium text-yellow-300 transition-colors hover:text-yellow-200'>
                                office@infid.org
                                <ArrowRight className='size-4' />
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Timeline */}
                    <div className='relative'>
                        {/* Timeline Line */}
                        <div className='bg-primary-200 absolute top-0 bottom-0 left-4 hidden w-px sm:block md:left-6'></div>

                        {/* Timeline Cards */}
                        <div className='space-y-6'>
                            {processSteps.map((step, index) => (
                                <div key={index} className='relative pl-0 sm:pl-16'>
                                    {/* Timeline Dot */}
                                    <div className='bg-primary-500 absolute top-8 left-0 z-10 hidden h-6 w-6 items-center justify-center rounded-full border-4 border-white shadow sm:left-3 sm:flex'>
                                        {/* <div className='h-2 w-2 rounded-full bg-white'></div> */}
                                    </div>

                                    {/* Card */}
                                    <div className='group border-primary-200 rounded-xl border bg-white p-4 transition-all duration-300 md:p-8'>
                                        <div className='mb-5 flex items-center gap-4'>
                                            <div className='shrink-0'>
                                                <span className='bg-primary-50 text-primary-500 0 border-primary-200 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 text-base font-bold transition-colors'>
                                                    {step.number}
                                                </span>
                                            </div>
                                            <h3 className='group-hover:text-primary-500 text-base font-bold text-gray-900 transition-colors md:text-lg'>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className='text-sm leading-relaxed text-gray-600 md:text-base'>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationProcess;
