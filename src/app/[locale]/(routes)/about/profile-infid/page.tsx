import AboutInfid from './_components/about-infid-section';
import GlobalRecognitionSection from './_components/global-recognition-section';
import ProgramINFIDSection from './_components/program-infid-section';
import VisiMisiInfidSection from './_components/visi-misi-section';

const ProfileInfid = () => {
    return (
        <>
            <AboutInfid />
            <div className='pt-220 sm:pt-220 md:pt-190 lg:pt-100 xl:pt-85'>
                <GlobalRecognitionSection />
            </div>
            <ProgramINFIDSection />
            <VisiMisiInfidSection />
        </>
    );
};

export default ProfileInfid;
