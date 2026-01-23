import AboutInfid from './_components/about-infid-section';
import ProgramINFIDSection from './_components/program-infid-section';
import VisiMisiInfidSection from './_components/visi-misi-section';

const ProfileInfid = () => {
    return (
        <>
            <AboutInfid />
            <div className='pt-230 sm:pt-220 md:pt-190 lg:pt-100 xl:pt-85'>
                <ProgramINFIDSection />
            </div>
            <VisiMisiInfidSection />
        </>
    );
};

export default ProfileInfid;
