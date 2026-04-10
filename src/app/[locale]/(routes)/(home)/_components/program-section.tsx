import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Post } from '@/types/posts';

import ProgramContent from './program-content';

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
                limit: 3
            }
        });
        return res.data.filter((item) => item.status == 'Published') || [];
    } catch (err) {
        return [];
    }
}

const ProgramSection = async () => {
    const programData = await getInitialPublications();

    return <ProgramContent programData={programData} />;
};

export default ProgramSection;
