import { ArrowLeft } from 'lucide-react';

const HeroAuth = ({ title = 'Login Anggota', useBack = false, className = '' }) => {
    return (
        <section
            className={`bg-hero relative z-20 h-[180px] bg-cover bg-fixed bg-center bg-no-repeat lg:h-[220px] xl:h-[280px] ${className}`}
            style={{
                backgroundImage: `url('/images/background-home.webp')`
            }}>
            {/* Overlay */}
            <div className='from-primary-500/80 via-primary-500/40 absolute inset-0 bg-linear-to-t to-transparent' />

            <div className='container flex h-full max-w-[1200px] items-end justify-center px-4 md:px-6 xl:px-0'>
                <div className='z-10 flex w-full flex-col items-start justify-end gap-8'>
                    <div className='mb-8 flex items-center gap-4 xl:mb-12'>
                        {/* Tombol Back (Tanpa Motion) */}
                        {useBack && (
                            <div
                                onClick={() => window.history.back()}
                                className='flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-100 md:h-10 md:w-10'>
                                <ArrowLeft className='text-primary h-5 w-5 md:h-6 md:w-6' />
                            </div>
                        )}

                        {/* Title (Tanpa Motion) */}
                        <h1
                            className='line-clamp-1 text-3xl leading-3 font-bold tracking-wide text-white md:text-4xl'
                            style={{
                                lineHeight: 1.3
                            }}>
                            {/* {title} */}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroAuth;
