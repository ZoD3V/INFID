import Image from 'next/image';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Play } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function BentoAboutUs() {
    const locale = useLocale();
    const videoId = 'U0t1MvVi-9I';
    const startTime = 0;
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <>
            <div className='mx-auto w-full max-w-150 overflow-hidden px-2'>
                <div className='@container relative w-full' style={{ aspectRatio: '600 / 700' }}>
                    {/* Card 1 */}
                    <div className='absolute top-0 right-0 h-[67%] w-[80%] overflow-hidden rounded-xl bg-slate-100'>
                        <Image src='/images/background-section.webp' alt='Team Meeting' fill className='object-cover' />
                    </div>

                    {/* Card 2 */}
                    <div className='group border-secondary-100 bg-secondary-100 absolute top-[48%] left-[5%] z-10 h-[50%] w-[60%] cursor-pointer overflow-hidden rounded-xl border-8 transition-all sm:border-14'>
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
                                        <div className='rounded-full bg-white/90 p-[5%] transition-transform group-hover:scale-110'>
                                            <Play className='text-secondary-200 h-full w-full' fill='currentColor' />
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
                                        className='border-none'
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Card 3 */}
                    <div className='absolute right-0 bottom-[4%] z-20 flex h-[27%] w-[35%] flex-col items-center justify-center rounded-xl rounded-tl-none bg-[#F59E42] p-[3%] text-center text-white'>
                        <h2 className='text-[clamp(1rem,10cqw,4rem)] font-bold'>40+</h2>
                        <p
                            className='text-[clamp(0.6rem,3cqw,2rem)] leading-tight font-medium'
                            dangerouslySetInnerHTML={{
                                __html: locale == 'id' ? 'Tahun <br /> Perjalanan' : 'Years <br /> of Journey'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
