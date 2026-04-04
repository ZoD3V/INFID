import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { OrganizationStructureData } from '@/types/organization';

import StructureOrganizationPage from './structure-organization-client';

async function getStructure() {
    try {
        const res = await apiRequest.get<OrganizationStructureData[]>(API_ENDPOINTS.organizationalStructure);
        return res.data || res;
    } catch (error) {
        console.error('Failed to fetch structure:', error);
        return [];
    }
}

export default async function Page() {
    const data = await getStructure();

    return <StructureOrganizationPage initialData={data} />;
}
