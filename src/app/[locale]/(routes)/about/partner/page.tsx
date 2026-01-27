import { Metadata } from 'next';

import PartnersSection from './_components/partner-section';

export const metadata: Metadata = {
    title: 'About INFID',
    description:
        'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
    openGraph: {
        title: 'About INFID',
        description:
            'INFID (International NGO Forum on Indonesian Development) adalah jaringan masyarakat sipil yang mendorong demokrasi, keadilan sosial, dan HAM melalui advokasi inklusif berbasis bukti.',
        images: 'https://photos.sphereshowcase.com/tBJczsgyzUAP3woETDr31.jpg'
    }
};

const PartnerPage = () => {
    return (
        <>
            <PartnersSection />
        </>
    );
};

export default PartnerPage;
