import { Metadata } from 'next';

import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Post } from '@/types/posts';

import DetailKnowledgeClient from './detail-knowledge-client';

async function getPostDetail(id: string) {
    try {
        const res = await apiRequest.get<Post>(`${API_ENDPOINTS.posts}/${id}`);
        return res.data || null;
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
    const description = translation?.content?.substring(0, 160).replace(/<[^>]*>/g, '') || '';

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

    return <DetailKnowledgeClient initialData={data} locale={locale} postId={id} />;
}
