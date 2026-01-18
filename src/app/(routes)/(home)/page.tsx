import AboutUsSection from './_components/about-us-section';
import Home from './_components/home-section';
import LogoSection from './_components/logo-section';
import ProgramSection from './_components/program-section';
import RealImpactSection from './_components/real-impact-section';
import RecognitionSection from './_components/recognition-section';

const Page = () => {
    return (
        <>
            <Home />
            <LogoSection />
            <AboutUsSection />
            <RealImpactSection />
            <ProgramSection />
            <RecognitionSection />
        </>
    );
};

export default Page;
