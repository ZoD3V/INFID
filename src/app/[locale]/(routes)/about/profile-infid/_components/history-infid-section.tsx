'use client';

import { useState } from 'react';

import Image from 'next/image';

import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { Founder, PeopleGrid } from './people-grid';

type ContentType = 'timeline' | 'founders' | 'leaders';

// Timeline item
export interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
    image?: string;
    customClass?: string;
    active: boolean;
    isFounder?: boolean;
    isLeader?: boolean;
}

export interface Person {
    id: number;
    name: string;
    image: string;
    role: string;
    description: string;
    highlightDescription?: string;
}

const timelineData: TimelineItem[] = [
    {
        id: '07',
        year: '2019 - Saat Ini',
        title: '',
        description:
            '<p><strong>Kerja keras INFID bersama berbagai elemen masyarakat dalam mendorong pengesahan Undang-Undang Tindak Pidana Kekerasan Seksual (UU TPKS) berujung pada pengesahan UU tersebut tahun 2022. INFID memproduksi lima dokumen penguat advokasi, yaitu satu kertas kebijakan, dua briefing paper, satu kertas posisi, dan satu rekomendasi kebijakan. Upaya INFID dalam tidak berhenti sampai pengesahan, advokasi terus berlanjut untuk memastikan implementasi UU TPKS sesuai dengan mandat yang tertuang dalam UU.</strong><br><br>Selain itu, dalam G20 Indonesia 2022, INFID ditunjuk sebagai Chair of Civil 20 (C20) untuk bergerak bersama ratusan civil society organisations (CSOs) dari seluruh dunia untuk mendesak pemimpin negara G20 menciptakan solusi atas tujuh isu; tujuan pembangunan berkelanjutan &amp; kemanusiaan; akses vaksin &amp; kesehatan global; kesetaraan gender &amp; disabilitas; perpajakan &amp; keuangan berkelanjutan; lingkungan, lingkungan, keadilan iklim, dan transisi energi; edukasi, digitalisasi, dan civic space; antikorupsi.<br><br>INFID akan terus bergerak untuk mewujudkan pembangunan yang berkeadilan di Indonesia dan mengambil peran dalam mendorong diskursus-diskursus perdamaian di tingkat global.</p>',
        image: '/images/history-2019.webp',
        customClass: 'w-[800px]',
        active: true
    },
    {
        id: '06',
        year: '2016 - 2018',
        title: '',
        description:
            '<p><strong>Pada 2015, agenda MDGs dilanjutkan menjadi agenda SDGs (Sustainable Development Goals) untuk periode 2015&ndash;2030. SDGs memiliki 17 Tujuan dan 169 Indikator yang harus dicapai pada 2030. Seperti MDGs, INFID juga turut berperan aktif untuk mendorong pencapaian tujuan dan indikator SDGs, di antaranya melalui penyusunan kerangka regulasi Perpres SDGs No. 59 Tahun 2017 dan penyusunan kerangka kelembagaan, yaitu tim pelaksana dan pokja nasional.</strong><br><br>Selain itu, INFID juga mendampingi 10 Kabupaten Kota dalam pelaksanaan SDGs di tingkat daerah dengan tujuan memberikan praktik baik implementasi SDGs yang akan memberi inspirasi bagi daerah lainnya untuk turut melaksanakan pencapaian SDGs di tahun 2030.</p>',
        image: '/images/history-2016.webp',
        customClass: 'w-[336px]',
        active: false
    },
    {
        id: '05',
        year: '2005 - 2015',
        title: '',
        description:
            '<p><strong>INFID tercatat sebagai aktor utama dalam memperbaiki relasi yang lebih setara antara donor dan penerima. Pembubaran forum donor untuk Indonesia Consultative Group on Indonesia (CGI) tahun 2007 merupakan perubahan besar bagi Indonesia dan lembaga donor. Lembaga donor juga mengakui bahwa mereka selalu dipantau dan diawasi oleh INFID untuk membuat mereka lebih terbuka, transparan, dan jujur dengan peranan mereka.</strong><br><br>INFID secara konsisten menyesuaikan agendanya dengan perubahan situasi, mulai dari reposisi peran LSM/OMS, hingga isu-isu seperti pembiayaan untuk pembangunan, kebijakan perdagangan yang adil, Tujuan Pembangunan Milenium (Millennium Development Goals/MDGs), dan Tujuan Pembangunan Berkelanjutan (Sustainable Development Goals/SDGs).</p>',
        image: '/images/history-2005.webp',
        customClass: 'w-[800px]',
        active: false
    },
    {
        id: '04',
        year: '1998 - 2004',
        title: '',
        description:
            '<p><strong>Konferensi tematik dua tahunan INFID (1998&ndash;2004) telah mengubah kebijakan dan praktik lembaga donor dan lembaga keuangan internasional (Bank Dunia). Salah satu konferensi mengangkat tema mengenai data kebocoran 30 persen dalam dana utang luar negeri dari pinjaman Bank Dunia untuk berbagai proyek di Indonesia.</strong><br><br>Salah satu advokasi lantang INFID terkait utang dan krisis 1998 bertajuk &ldquo;Debt Kills Indonesian Babies&rdquo;. Advokasi ini berhasil menciptakan riak-riak gerakan di tengah masyarakat setelah ketajaman INFID dalam memberikan edukasi publik mengenai bagaimana setiap individu rakyat Indonesia berpotensi menanggung beban utang Pemerintah.<br><br>Akibat sikap penentangan yang kuat dari INGI/INFID terhadap pemerintah Indonesia, selama bertahun-tahun INGI/INFID tidak dapat menyelenggarakan pertemuan di dalam negeri. Pada 1999, INFID mengadakan konferensi pertamanya di Bali, yang menandai perubahan penting dalam struktur dan tata kelola organisasi.</p>',
        image: '/images/history-1998.webp',
        customClass: 'w-[800px]',

        active: false
    },
    {
        id: '03',
        year: '1985 - 1998',
        title: '',
        description:
            '<p><strong>INFID telah berperan penting dalam mewujudkan proses demokratisasi di Indonesia sejak Indonesia tunduk pada sistem otoriter di bawah rezim Orde Baru.&nbsp;</strong><br><strong>Para reformis seperti Abdurrahman Wahid (Gus Dur), Adnan Buyung Nasution, Toeti Heraty Nurhadi, dan Fauzi Abdullah, bersama sejumlah Lembaga Swadaya Masyarakat (LSM), bersatu dan bergabung. Mereka mendirikan International NGO Forum on Indonesia (INGI) pada 1985 dan bekerja erat dengan organisasi masyarakat sipil dari negara-negara donor Indonesia.</strong><br><br>INGI memiliki sekretariat pertamanya di Den Haag, Belanda, dan di Jakarta, Indonesia. INGI dibentuk sebagai wadah baru untuk advokasi strategis yang bertujuan mendorong pemerintah Indonesia agar memanfaatkan bantuan luar negeri untuk pembangunan yang adil dan berkelanjutan, dengan menghormati sepenuhnya hak asasi manusia.</p>',
        image: '/images/history-1985.webp',
        customClass: 'w-[800px]',
        active: false
    },
    {
        id: '02',
        year: 'Pendiri',
        title: '',
        description: '',
        active: false,
        isFounder: true
    },
    {
        id: '01',
        year: 'Pemimpin Terdahulu',
        title: '',
        description: '',
        active: false,
        isLeader: true
    }
];

const foundersData: Founder[] = [
    {
        id: 1,
        name: 'Dr. Ahmad Suaedy',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        role: 'Founder & Aktivis HAM',
        description:
            'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
    },
    {
        id: 2,
        name: 'Lies Marcoes',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        role: 'Founder & Gender Specialist',
        description: 'Lies Marcoes adalah seorang peneliti...'
    },
    {
        id: 3,
        name: 'Kamala Chandrakirana',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        role: "Founder & Women's Rights Advocate",
        description: 'Kamala Chandrakirana merupakan advokat...'
    },
    {
        id: 4,
        name: 'Musdah Mulia',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        role: 'Founder & Islamic Scholar',
        description: 'Prof. Dr. Musdah Mulia adalah seorang cendekiawan...'
    }
];

export const InfidTimeline = () => {
    const [contentType, setContentType] = useState<ContentType>('timeline');
    const [activeTimelineId, setActiveTimelineId] = useState<string>(timelineData[0].id);
    const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem>(timelineData[0]);

    const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleTimelineClick = (item: TimelineItem): void => {
        setActiveTimelineId(item.id);

        if (item.isFounder) {
            setContentType('founders');
            return;
        }

        if (item.isLeader) {
            setContentType('leaders');
            return;
        }

        setSelectedTimeline(item);
        setContentType('timeline');
    };

    const handlePersonClick = (person: Person): void => {
        setSelectedPerson(person);
        setDialogOpen(true);
    };

    return (
        <div className='bg-secondary-100 relative py-24' id='history-infid'>
            <Image
                src='/images/decoration-about.png'
                alt='images'
                width={150}
                height={150}
                className='absolute right-10 bottom-50 hidden -rotate-95 xl:block'
            />

            <div className='container'>
                {/* Header */}
                <SectionHeader
                    badge='JEJAK PERJALANAN'
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title='Perjalanan INFID'
                    description='Tonggak perjalanan INFID dalam memperjuangkan demokrasi, keadilan sosial, dan hak asasi manusia
                        di tingkat nasional dan global.'
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-3xl'
                />

                {/* Timeline */}
                <div className='mb-16'>
                    <div className='relative'>
                        {/* Timeline line */}
                        <div className='absolute top-6 right-0 left-0 h-0.5 bg-gray-300' />

                        <div className='flex justify-between gap-6 overflow-x-auto px-2'>
                            {timelineData.map((item) => {
                                const isActive = item.id === activeTimelineId;

                                return (
                                    <div
                                        key={item.id}
                                        className='flex w-32 shrink-0 cursor-pointer flex-col items-center'
                                        onClick={() => handleTimelineClick(item)}>
                                        <div className='relative z-10 flex h-12 items-center'>
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white font-bold ${
                                                    isActive
                                                        ? 'text-primary-600 border-teal-600'
                                                        : 'text-primary-400 border-gray-300'
                                                }`}>
                                                {item.id}
                                            </div>
                                        </div>

                                        <p
                                            className={`mt-4 text-center text-sm leading-snug ${
                                                isActive ? 'text-primary-500 font-semibold' : 'text-slate-900'
                                            }`}>
                                            {item.year}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {contentType === 'timeline' && (
                    // Timeline Detail
                    <div className='max-w-full xl:max-w-3xl'>
                        <h2 className='text-primary-500 mb-6 text-2xl font-bold'>
                            {selectedTimeline.year} {selectedTimeline.title}
                        </h2>
                        <div className='prose' dangerouslySetInnerHTML={{ __html: selectedTimeline.description }} />
                        {selectedTimeline.image && (
                            <Image
                                src={selectedTimeline.image}
                                alt={selectedTimeline.title}
                                width={500}
                                height={500}
                                className={cn('mt-12', selectedTimeline.customClass)}
                            />
                        )}
                    </div>
                )}

                {contentType === 'founders' && (
                    <PeopleGrid title='Pendiri INFID' data={foundersData} onItemClick={handlePersonClick} />
                )}

                {contentType === 'leaders' && (
                    <PeopleGrid title='Pemimpin Terdahulu' data={foundersData} onItemClick={handlePersonClick} />
                )}

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        {selectedPerson && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className='text-start font-bold text-gray-900'>
                                        {contentType === 'founders'
                                            ? 'Pendiri'
                                            : contentType === 'leaders'
                                              ? 'Pemimpin Terdahulu'
                                              : 'Profil'}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className='mt-4 space-y-6'>
                                    <div className='flex flex-col items-center'>
                                        <div className='mb-4 h-62 w-62 overflow-hidden rounded-lg'>
                                            <img
                                                src={selectedPerson.image}
                                                alt={selectedPerson.name}
                                                className='h-full w-full object-cover'
                                            />
                                        </div>

                                        <h3 className='text-2xl font-bold text-gray-900'>{selectedPerson.name}</h3>

                                        <p className='text-primary-500 text-sm font-medium'>{selectedPerson.role}</p>
                                    </div>

                                    <p className='leading-relaxed text-gray-700'>{selectedPerson.description}</p>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
