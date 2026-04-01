import { Metadata } from 'next';

import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Partners } from '@/types/patner';

import PartnersSection from './_components/partner-section';
import { getTranslations } from 'next-intl/server';

async function getPatner() {
    try {
        const res = await apiRequest.get<Partners[]>(API_ENDPOINTS.partners, {
            params: {
                featured: 0
            }
        });
        return res.data || [];
    } catch (error) {
        console.error('Fetch Patner Error:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            images: [
                {
                    url: '/images/background-home.webp',
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt')
                }
            ],
            locale: locale,
            type: 'website'
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                id: '/id',
                en: '/en'
            }
        }
    };
}

export default async function Page() {
    const data = await getPatner();

    return <PartnersSection initialData={data} />;
}
