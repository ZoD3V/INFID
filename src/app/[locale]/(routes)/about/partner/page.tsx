import { Metadata } from 'next';

import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Partners } from '@/types/patner';

import PartnersSection from './_components/partner-section';

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

export default async function Page() {
    const data = await getPatner();

    return <PartnersSection initialData={data} />;
}
