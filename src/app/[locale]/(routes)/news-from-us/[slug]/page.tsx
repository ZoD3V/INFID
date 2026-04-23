import { Metadata } from 'next';

import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { getShortDescription } from '@/lib/utils';
import { Post } from '@/types/posts';

import DetailNewsClient from './detail-news-client';

async function getPostDetail(id: string) {
    try {
        const res = await apiRequest.get<Post>(`${API_ENDPOINTS.posts}/${id}`);
        return res.data || [];
    } catch (error) {
        console.error('Fetch Detail Error:', error);
        return null;
    }
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const { locale, slug } = resolvedParams;

    const id = slug.split('-')[0];

    const data = await getPostDetail(id);
    if (!data) return { title: 'News Not Found' };

    const translation =
        data?.translations?.find((t) => t.language === locale) ||
        data?.translations?.find((t) => t.language === 'id') ||
        data?.translations?.[0];

    const title = translation?.title || 'Detail Berita';
    const description = getShortDescription(translation?.content);

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: [data?.cover],
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            images: [data?.cover]
        }
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const resolvedParams = await params;
    const { locale, slug } = resolvedParams;
    const id = slug.split('-')[0];
    const data = await getPostDetail(id);

    return <DetailNewsClient initialData={data} locale={locale} postId={id} />;
}
