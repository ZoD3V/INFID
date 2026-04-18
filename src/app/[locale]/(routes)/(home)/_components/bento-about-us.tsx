import Image from 'next/image';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Play } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function BentoAboutUs() {
    const locale = useLocale();
    const videoId = 'U0t1MvVi-9I';
    const startTime = 74;
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div className='mx-auto flex w-full justify-center overflow-hidden'>
            <div className='relative h-100 w-full sm:h-125 sm:w-112.5 md:h-162.5 md:w-150'>
                {/* Card 1 */}
                <div className='absolute top-0 right-0 h-62.5 w-70 overflow-hidden rounded-xl bg-slate-100 sm:h-75 sm:w-100 md:h-100 md:w-125'>
                    <Image src='/images/background-section.webp' alt='Team Meeting' fill className='object-cover' />
                </div>

                {/* Card 2 */}
                <div className='group border-secondary-100 bg-secondary-100 xs:left-13 absolute top-45.5 left-1 z-10 h-50 w-57.5 cursor-pointer overflow-hidden rounded-xl border-8 transition-all sm:top-50 sm:left-5 sm:h-62.5 sm:w-75 md:top-62.5 md:left-4 md:h-89 md:w-101.25 md:border-14 xl:-left-1'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className='relative h-full w-full'>
                                <Image
                                    src={thumbnailUrl}
                                    alt='Field Activity'
                                    fill
                                    className='rounded-xl object-cover'
                                />
                                <div className='absolute inset-0 flex items-center justify-center rounded-xl transition-colors group-hover:bg-black/30'>
                                    <div className='rounded-full bg-white/90 p-3 transition-transform group-hover:scale-110 md:p-4'>
                                        <Play
                                            className='text-secondary-200 h-8 w-8 md:h-12 md:w-12'
                                            fill='currentColor'
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>
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
                </div>

                {/* Card 3 */}
                <div className='absolute right-0 bottom-7.5 z-20 flex h-27.5 w-27.5 flex-col items-center justify-center rounded-xl rounded-tl-none bg-[#F59E42] p-4 text-center text-white sm:bottom-15 sm:h-32.5 sm:w-32.5 md:bottom-15 md:h-45 md:w-45'>
                    <h2 className='text-4xl font-bold md:text-6xl'>40+</h2>
                    <p
                        className='text-xs leading-tight font-medium md:text-lg'
                        dangerouslySetInnerHTML={{
                            __html: locale == 'id' ? 'Tahun <br /> Perjalanan' : 'Years <br /> of Journey'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
