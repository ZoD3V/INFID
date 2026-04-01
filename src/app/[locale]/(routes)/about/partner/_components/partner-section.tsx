'use client';

import Image from 'next/image';

import PageHeader from '@/components/common/background-section';
import EmptyState from '@/components/common/empty-state';
import { PartnerCard } from '@/components/common/partner-card';
import { SectionHeader } from '@/components/common/section-header';
import { Partners } from '@/types/patner';

import { useTranslations } from 'next-intl';

interface Props {
    initialData: Partners[] | null;
}

const PartnersSection = ({ initialData }: Props) => {
    const t = useTranslations('partners.partner_section');

    const nationalPartners: Partners[] = initialData?.filter((item) => item.category == 'national') || [];

    const internationalPartners: Partners[] = initialData?.filter((item) => item.category == 'international') || [];

    return (
        <section className='bg-gray-50'>
            <PageHeader
                title={t('header.title')}
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: t('header.breadcrumb.home'), href: '/' },
                    { label: t('header.breadcrumb.about'), href: '/' },
                    { label: t('header.breadcrumb.active'), active: true }
                ]}
            />
            <div className='relative container py-24'>
                <Image
                    src='/images/decoration-about-us-2.png'
                    alt='decoration'
                    width={80}
                    height={80}
                    className='absolute top-10 right-0 z-20 hidden xl:block'
                />

                <SectionHeader
                    badge={t('content.badge')}
                    badgeProps={{
                        textColor: 'text-slate-500',
                        lineColor: 'bg-primary-400'
                    }}
                    title={t('content.title')}
                    description={t('content.description')}
                    titleClassName='text-primary-900'
                    descriptionClassName='text-primary-700 max-w-3xl'
                    className='mb-0'
                />

                {/* National Partners */}
                <div>
                    <div className='flex items-center py-24'>
                        <div className='grow border-t border-gray-200'></div>
                        <h3 className='text-primary-500 mx-4 text-center text-xl font-semibold md:text-2xl'>
                            {t('categories.national')}
                        </h3>
                        <div className='grow border-t border-gray-200'></div>
                    </div>

                    {nationalPartners.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5'>
                            {nationalPartners.map((partner, index) => (
                                <PartnerCard key={index} partner={partner} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            className='mt-0'
                            title='No Data Found'
                            description='There are no national partner.'
                        />
                    )}
                </div>

                {/* International Partners */}
                <div>
                    <div className='flex items-center py-24'>
                        <div className='grow border-t border-gray-200'></div>
                        <h3 className='text-primary-500 mx-4 text-center text-xl font-semibold md:text-2xl'>
                            {t('categories.international')}
                        </h3>
                        <div className='grow border-t border-gray-200'></div>
                    </div>

                    {internationalPartners.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-5'>
                            {internationalPartners.map((partner, index) => (
                                <PartnerCard key={index} partner={partner} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            className='mt-0'
                            title='No Data Found'
                            description='There are no international partner.'
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
