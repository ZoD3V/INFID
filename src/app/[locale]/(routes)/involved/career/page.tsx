import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { JobsResponse } from '@/types/job';

import CareerContent from './carrer-content';
import { getTranslations } from 'next-intl/server';

async function getInitialJobs(): Promise<JobsResponse> {
    try {
        const res = await apiRequest.get<JobsResponse>(API_ENDPOINTS.jobRecruitments, {
            params: { limit: 10 }
        });

        return res as any;
    } catch {
        return {
            data: [],
            category_filter: { id: [], en: [] },
            status_code: 500,
            message: 'error'
        } as any;
    }
}

export default async function CareerPage() {
    const t = await getTranslations('career');

    const fullResponse = await getInitialJobs();

    const jobs = fullResponse.data;

    const categories = fullResponse.category_filter;

    return (
        <CareerContent
            categories={categories}
            initialJobs={jobs}
            translations={{
                title: t('header.title'),
                description: t('header.description'),
                breadcrumbHome: t('header.breadcrumb.home'),
                breadcrumbActive: t('header.breadcrumb.active')
            }}
        />
    );
}
