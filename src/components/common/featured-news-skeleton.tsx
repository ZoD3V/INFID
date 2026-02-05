export const FeaturedNewsSkeleton = () => {
    return (
        <div className='mb-8 grid animate-pulse gap-4 md:grid-cols-2'>
            {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className='rounded-xl border border-slate-200 bg-white p-3'>
                    {/* Image Area */}
                    <div className='relative mb-6 h-80 overflow-hidden rounded-lg bg-slate-200 lg:h-88'>
                        {/* Badge Skeleton */}
                        <div className='absolute top-3 left-3 h-3 w-20 rounded-full bg-slate-300' />
                    </div>

                    {/* Content Area */}
                    <div className='flex items-start gap-4 px-1 pb-2 lg:px-4'>
                        {/* Date Skeleton (Hidden on mobile, flex on LG) */}
                        <div className='mb-4 hidden flex-col items-center lg:flex'>
                            <div className='h-12 w-12 rounded bg-slate-200' /> {/* Day */}
                            <div className='mt-2 h-3 w-16 rounded bg-slate-100' /> {/* Month Year */}
                        </div>

                        {/* Text Area */}
                        <div className='flex flex-1 flex-col pb-2 lg:pb-0'>
                            {/* Title Skeleton */}
                            <div className='mb-2 h-3 w-full rounded bg-slate-200' />
                            <div className='mb-4 h-3 w-2/3 rounded bg-slate-200' />

                            {/* Description Skeleton */}
                            <div className='mb-1 h-3 w-full rounded bg-slate-100' />
                            <div className='mb-4 h-3 w-5/6 rounded bg-slate-100' />

                            {/* Meta Skeleton */}
                            <div className='mt-1 flex flex-wrap items-center gap-4'>
                                <div className='h-3 w-16 rounded bg-slate-100' />
                                <div className='h-3 w-16 rounded bg-slate-100' />
                                <div className='h-3 w-16 rounded bg-slate-100' />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
