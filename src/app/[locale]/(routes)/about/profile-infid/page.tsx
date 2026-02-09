import { Metadata } from 'next';

import AboutInfid from './_components/about-infid-section';
import GlobalRecognitionSection from './_components/global-recognition-section';
import { InfidTimeline } from './_components/history-infid-section';
import { ProgramINFIDSection } from './_components/program-infid-section';
import VisiMisiInfidSection from './_components/visi-misi-section';

export const metadata: Metadata = {
    title: 'Profile INFID',
    description:
        'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
    openGraph: {
        title: 'About INFID',
        description:
            'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
        images: '/images/background-home.webp'
    }
};

const ProfileInfid = () => {
    return (
        <>
            <AboutInfid />
            <div className='pt-220 sm:pt-220 md:pt-190 lg:pt-100 xl:pt-85'>
                <GlobalRecognitionSection />
            </div>
            <ProgramINFIDSection />
            <VisiMisiInfidSection />
            <InfidTimeline />
        </>
    );
};

export default ProfileInfid;
