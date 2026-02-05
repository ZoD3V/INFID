export const ArticleCardSkeleton = () => {
    return (
        <div className='flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white'>
            {/* Skeleton Gambar */}
            <div className='aspect-16/10 w-full bg-slate-200' />

            {/* Skeleton Konten */}
            <div className='flex flex-1 flex-col p-5'>
                {/* Skeleton Badge/Kategori */}
                <div className='mb-3 h-3 w-24 rounded-full bg-slate-200' />

                {/* Skeleton Judul (2 Baris) */}
                <div className='space-y-2'>
                    <div className='h-3 w-full rounded bg-slate-200' />
                    <div className='h-3 w-3/4 rounded bg-slate-200' />
                </div>

                {/* Skeleton Footer (Tanggal & Author) */}
                <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-4'>
                    <div className='h-3 w-20 rounded bg-slate-100' />
                    <div className='h-3 w-16 rounded bg-slate-100' />
                </div>
            </div>
        </div>
    );
};
