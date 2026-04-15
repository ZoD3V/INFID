import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Category, Job } from '@/types/job';

import CareerContent from './carrer-content';
import { getTranslations } from 'next-intl/server';

async function getCategories() {
    try {
        const res = await apiRequest.get<Category[]>(API_ENDPOINTS.categories);
        return res.data;
    } catch (err) {
        return [];
    }
}

async function getInitialJobs() {
    try {
        const res = await apiRequest.get<Job[]>(API_ENDPOINTS.jobRecruitments, {
            params: {
                limit: 10
            }
        });

        return res;
    } catch (err) {
        return [];
    }
}

export default async function CareerPage() {
    const t = await getTranslations('career');

    const [categoriesData, initialJobsResponse] = await Promise.all<any[]>([getCategories(), getInitialJobs()]);

    const validCategoryNames = initialJobsResponse?.category_filter || [];

    const filteredCategories = categoriesData.filter((cat: Category) => validCategoryNames.includes(cat.name));

    return (
        <CareerContent
            categories={filteredCategories}
            initialJobs={initialJobsResponse?.data ?? []}
            translations={{
                title: t('header.title'),
                description: t('header.description'),
                breadcrumbHome: t('header.breadcrumb.home'),
                breadcrumbActive: t('header.breadcrumb.active')
            }}
        />
    );
}
