export const JobSkeleton = () => {
    return (
        <div className='w-full animate-pulse space-y-4'>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6'>
                    <div className='flex items-center justify-between'>
                        <div className='space-y-2'>
                            {/* Title Skeleton */}
                            <div className='h-4 w-48 rounded bg-slate-200' />
                            {/* Category/Location Skeleton */}
                            <div className='h-4 w-32 rounded bg-slate-100' />
                        </div>
                        {/* Icon/Arrow Skeleton */}
                        <div className='h-8 w-8 rounded-full bg-slate-100' />
                    </div>
                </div>
            ))}
        </div>
    );
};
