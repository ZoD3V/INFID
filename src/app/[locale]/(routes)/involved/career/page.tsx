import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';

import CareerContent from './carrer-content';
import { getTranslations } from 'next-intl/server';

async function getCategories() {
    try {
        const res = await apiRequest.get<any[]>(API_ENDPOINTS.categories);
        return res.data;
    } catch (err) {
        return [];
    }
}

async function getInitialJobs() {
    try {
        const res = await apiRequest.get<any[]>(API_ENDPOINTS.jobRecruitments);

        return res.data;
    } catch (err) {
        return [];
    }
}

export default async function CareerPage() {
    const t = await getTranslations('career');

    const [categories, initialJobs] = await Promise.all([getCategories(), getInitialJobs()]);

    return (
        <CareerContent
            categories={categories}
            initialJobs={initialJobs}
            translations={{
                title: t('header.title'),
                description: t('header.description'),
                breadcrumbHome: t('header.breadcrumb.home'),
                breadcrumbActive: t('header.breadcrumb.active')
            }}
        />
    );
}
