import Footer from '@/components/common/footer';
import { Navbar } from '@/components/common/navbar';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
