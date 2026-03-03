import { Skeleton } from '../ui/skeleton';

const PublicationsSkeleton = () => {
    return (
        <div className='mt-12 grid w-full'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* Featured Skeleton */}
                <div className='space-y-6'>
                    {/* Image */}
                    <Skeleton className='h-80 w-full rounded-lg lg:h-96' />

                    {/* Content */}
                    <div className='flex items-start gap-4'>
                        {/* Date (desktop only) */}
                        <div className='hidden flex-col items-center gap-2 lg:flex'>
                            <Skeleton className='h-12 w-12 rounded-md' />
                            <Skeleton className='h-4 w-16 rounded-md' />
                        </div>

                        <div className='flex flex-1 flex-col gap-3'>
                            <Skeleton className='h-6 w-3/4 rounded-md' />
                            <Skeleton className='h-4 w-full rounded-md' />
                            <Skeleton className='h-4 w-5/6 rounded-md' />

                            <div className='mt-2 flex gap-3'>
                                <Skeleton className='h-4 w-24 rounded-md' />
                                <Skeleton className='h-4 w-20 rounded-md' />
                                <Skeleton className='h-4 w-20 rounded-md' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Articles Skeleton */}
                <div className='grid grid-rows-3 gap-5 lg:gap-6'>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className='flex flex-col gap-4 md:flex-row md:items-center'>
                            {/* Image */}
                            <Skeleton className='h-52 w-full rounded-lg md:h-24 md:w-32 lg:h-full' />

                            {/* Content */}
                            <div className='flex flex-1 flex-col gap-3'>
                                <Skeleton className='h-4 w-32 rounded-md' />
                                <Skeleton className='h-5 w-4/5 rounded-md' />
                                <Skeleton className='h-4 w-24 rounded-md' />

                                <div className='flex gap-3'>
                                    <Skeleton className='h-4 w-16 rounded-md' />
                                    <Skeleton className='h-4 w-16 rounded-md' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublicationsSkeleton;
