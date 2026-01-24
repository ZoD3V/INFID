import Image from 'next/image';

export const ProgramINFIDSection = () => {
    const programs = [
        {
            title: 'Tata Kelola Iklim yang Demokratis dan Berkeadilan Gender',
            description:
                'Mengawasi dan memastikan tata kelola iklim berjalan secara demokratis dan menjunjung prinsip hak asasi manusia, khususnya bagi perempuan dan kelompok rentan.',
            image: '/images/news-1.webp'
        },
        {
            title: 'Pembangunan yang Inklusif dan Berkeadilan',
            description:
                'Merespon dan mengadvokasi solusi atas ketimpangan pembangunan melalui rekomendasi kebijakan yang adil dan inklusif.',
            image: '/images/news-2.webp'
        },
        {
            title: 'Masyarakat Sipil untuk HAM & Demokrasi',
            description:
                'Memastikan masyarakat sipil berdaya, kuat, dan terlibat secara bermakna dalam proses pembangunan dan demokrasi.',
            image: '/images/news-3.webp'
        }
    ];

    return (
        <div className='bg-secondary-100 relative min-h-screen py-24'>
            <Image
                src='/images/decoration-program-1.png'
                alt='decoration'
                width={200}
                height={200}
                className='absolute top-0 left-0 hidden xl:block'
            />
            <div className='container'>
                {/* Header */}
                <div className='mb-12'>
                    <div className='mb-4 flex items-center gap-2 text-xs font-medium tracking-wider text-gray-500'>
                        <span className='h-px w-4 bg-slate-400'></span>
                        FOKUS UTAMA
                        <span className='h-px w-4 bg-slate-400'></span>
                    </div>
                    <h2 className='mb-4 text-4xl font-bold text-gray-900 lg:text-5xl'>Program INFID</h2>
                    <p className='mb-6 max-w-md text-sm text-slate-600 md:text-base'>
                        Program INFID dirancang untuk memperkuat demokrasi, keadilan sosial, dan perlindungan hak asasi
                        manusia melalui advokasi kebijakan berbasis bukti.
                    </p>
                </div>

                {/* Program Cards */}

                <div className='relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    <Image
                        src='/images/decoration-program-2.png'
                        alt='images'
                        width={100}
                        height={100}
                        className='absolute -right-10 bottom-0 z-30 hidden xl:block'
                    />
                    {programs.map((program, index) => (
                        <div key={index} className='group relative overflow-hidden rounded-2xl border bg-slate-100 p-2'>
                            <div className='relative h-125 overflow-hidden rounded-xl md:h-139.5'>
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    width={500}
                                    height={500}
                                    className='h-full w-full object-cover'
                                />
                                <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />
                                <div className='absolute right-0 bottom-0 left-0 p-5 text-white'>
                                    <h3 className='mb-3 text-xl leading-tight font-bold lg:text-2xl'>
                                        {program.title}
                                    </h3>
                                    <p className='mb-4 text-sm leading-relaxed text-gray-200'>{program.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
