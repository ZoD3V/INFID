import React from 'react';

import { Region } from '@/components/common/maps';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';

import MapsMemberSection from './_components/maps-member-section';
import MemberSection from './_components/member-section';
import RegistrationProcess from './_components/registration-process';

async function getRegions() {
    try {
        const res = await apiRequest.get<Region[]>(API_ENDPOINTS.regions, {
            params: { limit: 'all' }
        });

        return res.data;
    } catch (error) {
        console.error('Gagal mengambil data region:', error);
        return [];
    }
}

const MemberInfid = async () => {
    const regions = await getRegions();
    return (
        <>
            <MemberSection />
            <RegistrationProcess />
            <MapsMemberSection initialRegions={regions} />
        </>
    );
};

export default MemberInfid;
