import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { LeadershipTimeline } from '@/types/leadership-timeline';

import AboutInfid from './_components/about-infid-section';
import GlobalRecognitionSection from './_components/global-recognition-section';
import InfidTimeline from './_components/history-infid-section';
import { ProgramINFIDSection } from './_components/program-infid-section';
import VisiMisiInfidSection from './_components/visi-misi-section';

// export const metadata: Metadata = {
//     title: 'Profile INFID',
//     description:
//         'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
//     openGraph: {
//         title: 'About INFID',
//         description:
//             'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
//         images: '/images/background-home.webp'
//     }
// };

async function getLeadershipTimeline() {
    try {
        const res = await apiRequest.get<LeadershipTimeline[]>(API_ENDPOINTS.leadershipTimeline);
        return res.data || res;
    } catch (error) {
        console.error('Failed to fetch timeline:', error);
        return [];
    }
}

const ProfileInfid = async () => {
    const timelineData = await getLeadershipTimeline();

    return (
        <>
            <AboutInfid />
            <div className='pt-220 sm:pt-220 md:pt-190 lg:pt-100 xl:pt-85'>
                <GlobalRecognitionSection />
            </div>
            <ProgramINFIDSection />
            <VisiMisiInfidSection />
            <InfidTimeline initialData={timelineData} />
        </>
    );
};

export default ProfileInfid;
