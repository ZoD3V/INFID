export const ArticleCardSkeleton = () => {
    return (
        <div className='flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white'>
            <div className='aspect-16/10 w-full bg-slate-200' />

            <div className='flex flex-1 flex-col p-5'>
                <div className='mb-3 h-3 w-24 rounded-full bg-slate-200' />

                <div className='space-y-2'>
                    <div className='h-3 w-full rounded bg-slate-200' />
                    <div className='h-3 w-3/4 rounded bg-slate-200' />
                </div>

                <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-4'>
                    <div className='h-3 w-20 rounded bg-slate-100' />
                    <div className='h-3 w-16 rounded bg-slate-100' />
                </div>
            </div>
        </div>
    );
};
