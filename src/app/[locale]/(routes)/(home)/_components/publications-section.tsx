import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiBase } from '@/lib/axios-server';

import { PublicationContent } from './publication-content';

async function getInitialPublications() {
    try {
        const res = await apiBase.get(API_ENDPOINTS.posts, {
            params: {
                featured: true,
                category: '',
                search: '',
                author: '',
                tags: '',
                year: '',
                random: '',
                limit: ''
            }
        });
        // return res.data.data;
        return [];
    } catch (err) {
        return [];
    }
}

async function getInitialCategoryPublications() {
    try {
        const res = await apiBase.get(API_ENDPOINTS.categories);
        return res.data.data;
    } catch (err) {
        return [];
    }
}

const PublicationsSection = async () => {
    const initialData = await getInitialPublications();
    const categoriesData = await getInitialCategoryPublications();

    return (
        <section className='relative bg-slate-50 py-24'>
            <div className='container'>
                <PublicationContent initialData={initialData} categoriesData={categoriesData} />
            </div>
        </section>
    );
};

export default PublicationsSection;
