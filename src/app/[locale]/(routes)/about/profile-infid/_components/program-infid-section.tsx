import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Post } from '@/types/posts';

import { ProgramInfidContent } from './program-infid-content';

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

export const ProgramINFIDSection = async () => {
    const programData = await getInitialPublications();

    return <ProgramInfidContent programData={programData} />;
};
