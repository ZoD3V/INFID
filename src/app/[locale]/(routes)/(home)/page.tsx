import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { Post } from '@/types/posts';

import AboutUsSection from './_components/about-us-section';
import Home from './_components/home-section';
import LogoSection from './_components/logo-section';
import OurNetworkSection from './_components/our-network-section';
import ProgramSection from './_components/program-section';
import PublicationsSection from './_components/publications-section';
import RealImpactSection from './_components/real-impact-section';
import RecognitionSection from './_components/recognition-section';

async function getInitialPublications() {
    try {
        const res = await apiRequest.get<Post[]>(API_ENDPOINTS.posts, {
            params: {
                category: 'Kegiatan',
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

const HomePage = async () => {
    const programData = await getInitialPublications();
    return (
        <>
            <Home />
            <LogoSection />
            <AboutUsSection />
            <RealImpactSection programData={programData} />
            {/* <PublicationsSection /> */}
            <ProgramSection />
            <OurNetworkSection />
            <RecognitionSection />
        </>
    );
};

export default HomePage;
