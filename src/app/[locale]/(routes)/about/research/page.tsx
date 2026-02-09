import { Metadata } from 'next';

import ResearchFellowSection from './_components/research-fellow-section';

export const metadata: Metadata = {
    title: 'Research INFID',
    description:
        'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
    openGraph: {
        title: 'About INFID',
        description:
            'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
        images: '/images/background-home.webp'
    }
};

const ResearchPage = () => {
    return (
        <>
            <ResearchFellowSection />
        </>
    );
};

export default ResearchPage;
