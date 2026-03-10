import React from 'react';

import { Maps, Region } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';

import { useTranslations } from 'next-intl';

const OurNetworkWrapper = ({ regions }: { regions: Region[] }) => {
    const t = useTranslations('our-network');

    return (
        <div className='container flex flex-col items-center'>
            {/* Header */}
            <SectionHeader
                badge={t('badge')}
                badgeProps={{
                    textColor: 'text-slate-500',
                    lineColor: 'bg-primary-400'
                }}
                title={t('title')}
                description={t('description')}
                titleClassName='text-primary-900'
                descriptionClassName='text-primary-700 max-w-2xl'
                className='mb-20'
                align='center'
            />
            <Maps data={regions} />
            <SectionBadge
                lineColor='bg-primary-500 h-0.5 w-3 rounded-full'
                textColor='text-primary-500'
                className='mt-16 rounded-full bg-white px-3 py-2 font-bold shadow-sm'>
                {t('maps')}
            </SectionBadge>
        </div>
    );
};

export default OurNetworkWrapper;
