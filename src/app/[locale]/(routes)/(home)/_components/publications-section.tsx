import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiBase } from '@/lib/axios-server';

import { PublicationContent } from './publication-content';

async function getInitialPublications() {
    try {
        const res = await apiBase.get(API_ENDPOINTS.posts, {
            params: { featured: true }
        });
        return res.data.data;
    } catch (err) {
        return [];
    }
}

const PublicationsSection = async () => {
    const initialData = await getInitialPublications();

    return (
        <section className='relative bg-slate-50 py-24'>
            <div className='container'>
                <h1 className='text-primary-900 mb-8 text-4xl font-bold lg:text-5xl'>
                    PUBLIKASI
                    <br />& RISET
                </h1>
                <PublicationContent initialData={initialData} />
            </div>
        </section>
    );
};

export default PublicationsSection;
