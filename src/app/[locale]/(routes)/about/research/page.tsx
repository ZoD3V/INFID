// import { Metadata } from 'next';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Research } from '@/types/research';

import ResearchFellowSection from './_components/research-fellow-section';

// export const metadata: Metadata = {
//     title: 'Research INFID',
//     description:
//         'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
//     openGraph: {
//         title: 'About INFID',
//         description:
//             'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
//         images: '/images/background-home.webp'
//     }
// };

async function getInitialResearchFellow() {
    try {
        const res = await apiRequest.get<Research[]>(API_ENDPOINTS.researchFellow, {
            params: {
                limit: ''
            }
        });
        return res.data;
    } catch (err) {
        return [];
    }
}

const ResearchPage = async () => {
    const initialData = await getInitialResearchFellow();

    return (
        <>
            <ResearchFellowSection initialData={initialData} />
        </>
    );
};

export default ResearchPage;
