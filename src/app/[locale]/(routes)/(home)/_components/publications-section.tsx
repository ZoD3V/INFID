import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Category, Post } from '@/types/posts';

import { PublicationContent } from './publication-content';

async function getInitialPublications() {
    try {
        const res = await apiRequest.get<Post[]>(API_ENDPOINTS.posts, {
            params: {
                featured: '',
                category: '',
                search: '',
                author: '',
                tags: '',
                year: '',
                random: '',
                limit: ''
            }
        });
        return res.data.filter((item) => item.status.toLowerCase() == 'published') || [];
    } catch (err) {
        return [];
    }
}

async function getInitialCategoryPublications() {
    try {
        const res = await apiRequest.get<Category[]>(API_ENDPOINTS.categories);
        return res.data;
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
