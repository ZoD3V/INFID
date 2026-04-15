import Image from 'next/image';

import { Link, useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { formatDateShort } from '@/lib/utils';
import { Post } from '@/types/posts';

import { Eye, MessageSquareMore, Pencil } from 'lucide-react';

interface FeaturedNewsProps {
    items: Post[];
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ items }) => {
    const router = useRouter();

    const handleNavigation = async (e: React.MouseEvent, item: any) => {
        e.preventDefault();

        try {
            apiRequest.get(`${API_ENDPOINTS.posts}/${item.id}/view`);
        } catch (error) {
            console.error('Tracking error:', error);
        }

        router.push(`/knowledge/${item.id}-${item.translations[0]?.slug}`);
    };

    return (
        <div className='mb-8 grid gap-4 md:grid-cols-2'>
            {items.map((item, index) => {
                const translation = item.translations?.find((t: any) => t.language === 'id') || item.translations?.[0];

                const title = translation?.title || 'No Title';
                const description = translation?.content || '';
                const categoryName = item.category?.name || 'Featured';
                const authorName = item.author?.name || 'Admin';
                const seen = item?.views || 0;
                const comments = item.comments.length > 0 ? item.comments.length : 0;
                const dateRaw = item.published_at || item.created_at;

                const formattedDate = formatDateShort(dateRaw);
                const dateParts = formattedDate.split(' ');

                return (
                    <div key={index} onClick={(e) => handleNavigation(e, item)}>
                        <div className='group cursor-pointer rounded-xl border border-slate-200 bg-white p-3'>
                            {/* Image Section */}
                            <div className='relative mb-6 h-70 overflow-hidden rounded-lg lg:h-80 xl:h-88'>
                                <Image
                                    src={item.cover || '/images/placeholder-square.png'}
                                    alt={title}
                                    fill
                                    sizes='100%'
                                    className='object-cover transition-transform duration-500'
                                />

                                {/* Badge (Mengambil Nama Kategori) */}
                                <div className='absolute top-3 left-3'>
                                    <span className='bg-secondary-300 rounded-full px-3 py-1.5 text-xs font-medium text-white'>
                                        {categoryName}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className='flex items-start gap-4 px-1 pb-2 lg:px-4'>
                                {/* Date Box (Sisi Kiri) */}
                                <div className='mb-4 hidden flex-col items-center lg:flex'>
                                    <div className='text-primary-900 text-5xl font-bold'>{dateParts[0]}</div>
                                    <div className='text-xs whitespace-nowrap text-slate-600 uppercase'>
                                        {dateParts[1]} {dateParts[2]}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className='flex flex-col pb-2 lg:pb-0'>
                                    <h2 className='text-primary-900 group-hover:text-primary-500 mb-2 line-clamp-2 text-xl font-bold lg:text-2xl'>
                                        {title}
                                    </h2>

                                    <p className='mb-2 line-clamp-2 text-sm leading-relaxed text-slate-600'>
                                        {description.replace(/[#*`]/g, '')}
                                    </p>

                                    {/* Meta Information */}
                                    <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
                                        <div className='flex items-center gap-1'>
                                            <Pencil className='h-3 w-3' />
                                            By {authorName}
                                        </div>

                                        <span className='h-1 w-1 rounded-full bg-slate-500' />

                                        <div className='flex items-center gap-1'>
                                            <Eye className='h-3 w-3' />
                                            {seen} Dilihat
                                        </div>

                                        <span className='h-1 w-1 rounded-full bg-slate-500' />

                                        <div className='flex items-center gap-1'>
                                            <MessageSquareMore className='h-3 w-3' />
                                            {comments} Komentar
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
