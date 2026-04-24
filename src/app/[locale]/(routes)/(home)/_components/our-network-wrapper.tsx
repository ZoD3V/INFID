'use client';
import { useState } from 'react';

import { Maps, Region } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';
import { SectionHeader } from '@/components/common/section-header';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { getLangText } from '@/lib/utils';
import { RegionDetail } from '@/types/region';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { useLocale, useTranslations } from 'next-intl';

const OurNetworkWrapper = ({ regions }: { regions: Region[] }) => {
    const t = useTranslations('home.our_network');
    const locale = useLocale();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<RegionDetail | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegionClick = async (region: Region) => {
        try {
            setLoading(true);

            const res = await apiRequest.get<RegionDetail>(`${API_ENDPOINTS.regions}/${region.id}/members`);
            setSelectedRegion(res.data);
            setOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
            <Maps data={regions} onRegionClick={handleRegionClick} isLoading={loading} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-[calc(100%-2rem)] md:max-w-150'>
                    <VisuallyHidden>
                        <DialogHeader>
                            <DialogTitle>{getLangText(selectedRegion?.name, locale)}</DialogTitle>
                        </DialogHeader>
                    </VisuallyHidden>

                    {/* Organization List */}
                    <div className='flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-1'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-lg font-bold text-slate-900'>
                                {getLangText(selectedRegion?.name, locale)}
                            </p>
                            <p className='text-slate-900'>{selectedRegion?.description}</p>
                            <p className='text-lg text-slate-900'>
                                {locale == 'id' ? 'Jumlah Member' : 'Total Members'} :{' '}
                                <span className='text-base'>{selectedRegion?.members.length}</span>
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
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
