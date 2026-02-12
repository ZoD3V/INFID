import Image from 'next/image';

import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function GlobalRecognitionSection() {
    const accordionData = [
        {
            id: '01',
            title: 'Terakreditasi oleh Perserikatan Bangsa-Bangsa (PBB) dengan UN Special Consultative Status with the Economic and Social Council (ECOSOC).',
            content:
                'INFID berperan dalam mengawal pembangunan di daerah-daerah di Indonesia dengan memberikan masukan-masukan strategis, serta berbagi pengalaman dengan sesama komite dari berbagai negara. INFID juga mewakili OGP dalam berbagai forum tingkat tinggi untuk berbagi pengalaman praktik baik dalam membangun agenda pemerintahan terbuka.',
            defaultOpen: true
        },
        {
            id: '02',
            title: 'Berpartisipasi aktif dalam berbagai forum internasional.',
            content:
                'INFID aktif dalam forum-forum internasional untuk memperjuangkan isu-isu pembangunan dan kebijakan global yang berdampak pada masyarakat Indonesia.',
            defaultOpen: false
        },
        {
            id: '03',
            title: 'Terpilih menjadi Envoy dan Steering Committee dalam Open Government Partnership (OGP Global).',
            content:
                'Sebagai Envoy dan anggota Steering Committee OGP Global, INFID berperan dalam memimpin dan mengarahkan agenda transparansi dan akuntabilitas pemerintahan di tingkat global.',
            defaultOpen: false
        }
    ];

    return (
        <div className='relative w-full pb-24'>
            <Image
                src='/images/decoration-about-us-2.png'
                alt='images'
                width={80}
                height={80}
                className='absolute -top-20 right-10 hidden xl:block'
            />
            <div className='container'>
                <div className='grid items-start gap-12 lg:grid-cols-2 lg:gap-16'>
                    {/* Left Section */}

                    <SectionHeader
                        badge='RINGKASAN'
                        badgeProps={{
                            textColor: 'text-slate-500',
                            lineColor: 'bg-primary-400'
                        }}
                        title=' Pengakuan & Peran Global'
                        description='Tiga pilar yang memperkuat posisi INFID dalam advokasi kebijakan dan kolaborasi
                            internasional.'
                        titleClassName='text-primary-900'
                        descriptionClassName='text-primary-700'
                        className='mb-0'
                    />

                    {/* Right Section - Custom Accordion */}
                    <div className='space-y-4'>
                        <Accordion type='single' collapsible defaultValue='item-01' className='space-y-4'>
                            {accordionData.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={`item-${item.id}`}
                                    className='overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 last:border-b data-[state=open]:bg-slate-50'>
                                    <AccordionTrigger className='p-5 shadow-none hover:no-underline data-[state=open]:bg-slate-50'>
                                        <div className='flex w-full items-center gap-4 text-left'>
                                            <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-11 w-11 items-center justify-center rounded-xl border p-2 text-sm font-bold md:h-12 md:w-12 md:text-base'>
                                                {item.id}
                                            </div>
                                            <div className='flex-1 pr-4'>
                                                <h3 className='text-primary-900 text-sm leading-tight font-bold md:text-base'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-5 pb-5'>
                                        <p className='text-sm leading-relaxed text-slate-600 md:text-base'>
                                            {item.content}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
