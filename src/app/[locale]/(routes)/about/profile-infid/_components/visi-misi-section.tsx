export default function VisiMisiInfidSection() {
    const misiItems = [
        {
            number: '01',
            text: 'Menumbuhkan kesadaran publik tentang HAM, demokrasi, kesetaraan, dan keadilan sosial melalui pendidikan publik.'
        },
        {
            number: '02',
            text: 'Melakukan penelitian dan kajian kebijakan berbasis bukti.'
        },
        {
            number: '03',
            text: 'Mendorong dialog kebijakan untuk kebijakan yang berpihak pada kelompok miskin dan marjinal.'
        },
        {
            number: '04',
            text: 'Membangun jejaring dan solidaritas masyarakat sipil.'
        }
    ];

    return (
        <section
            className='w-full bg-gray-50 py-16'
            style={{
                backgroundImage: "url('/images/bg-pattern.png')"
            }}>
            <div className='container'>
                {/* Header */}
                <div className='mb-12'>
                    <div className='mb-4 flex items-center gap-2 text-xs font-medium tracking-wider text-gray-500'>
                        <span className='h-px w-4 bg-slate-400'></span>
                        NILAI & ARAH GERAK
                        <span className='h-px w-4 bg-slate-400'></span>
                    </div>
                    <h2 className='text-4xl font-bold text-gray-900 lg:text-5xl'>Visi & Misi</h2>
                </div>

                {/* Content Grid */}
                <div className='grid gap-12 lg:grid-cols-2'>
                    {/* Visi */}
                    <div>
                        <h3 className='text-primary-500 mb-6 text-2xl font-bold'>Visi</h3>
                        <p className='mb-8 text-sm leading-relaxed text-gray-500 md:text-base'>
                            Mewujudkan demokrasi, kesetaraan, keadilan sosial dan perdamaian serta terjamin dan
                            terpenuhinya Hak Asasi Manusia di tingkat nasional (Indonesia) dan global.
                        </p>

                        <div className='border-l-primary-500 border-l-3 pl-3'>
                            <div>
                                <h4 className='text-primary-500 mb-3 text-2xl font-bold italic md:text-3xl lg:text-4xl'>
                                    Inklusif, Toleransi, dan Kolaborasi
                                </h4>
                                <p className='text-sm leading-relaxed text-gray-600 italic md:text-base'>
                                    INFID bekerja berlandaskan keberagaman tanpa membedakan suku, agama, ras, warna
                                    kulit, kewarganegaraan, dan kemampuan fisik.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Misi */}
                    <div>
                        <h3 className='text-primary-500 mb-6 text-2xl font-bold'>Misi</h3>
                        <div className='space-y-5'>
                            {misiItems.map((item) => (
                                <div
                                    key={item.number}
                                    className='flex items-center gap-4 rounded-lg transition-colors hover:border-teal-300'>
                                    <div className='shrink-0'>
                                        <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-11 w-11 items-center justify-center rounded-xl border p-2 text-sm font-bold md:h-12 md:w-12 md:text-base'>
                                            {item.number}
                                        </div>
                                    </div>
                                    <p className='text-sm leading-relaxed text-gray-700 md:text-base'>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
