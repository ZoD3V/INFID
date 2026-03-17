import Image from 'next/image';

import { Region } from '@/components/common/maps';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';

import OurNetworkWrapper from './our-network-wrapper';

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
