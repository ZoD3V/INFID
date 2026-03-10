import Image from 'next/image';

import { Maps, Region } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { ApiResponse, apiBase } from '@/lib/axios-server';

import OurNetworkWrapper from './our-network-wrapper';

async function getRegions() {
    try {
        const res = await apiBase.get<ApiResponse<Region>>(API_ENDPOINTS.regions, {
            params: { limit: 'all' }
        });
        return res.data.data;
    } catch (error) {
        console.error('Gagal mengambil data region:', error);
        return [];
    }
}

const OurNetworkSection = async () => {
    const regions = await getRegions();

    return (
        <section className='relative w-full bg-white py-24'>
            <Image
                src='/images/decoration-map.png'
                alt='images'
                width={150}
                height={150}
                className='absolute top-[20%] right-10 hidden xl:block'
            />
            <OurNetworkWrapper regions={regions} />
        </section>
    );
};

export default OurNetworkSection;
