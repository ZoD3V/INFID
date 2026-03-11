'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Maps, Region } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { REGION_DISPLAY_MAP, REGION_KEYS, RegionKey } from '@/data/region-data';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { ApiResponse, apiBase } from '@/lib/axios-server';
import { slugify } from '@/lib/utils';

import CommunitySection from '../../../(home)/_components/community-section';
import { Link2, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface Member {
    id: number;
    name: string;
    address: string;
    emails: string[];
    phones: string[];
    website: string;
}

export interface RegionDetail {
    id: number;
    name: string;
    description: string | null;
    members: Member[];
}

export interface ApiDetailResponse {
    data: RegionDetail;
}

interface MapsSectionProps {
    initialRegions: Region[];
}

export const MapsMemberSection: React.FC<MapsSectionProps> = ({ initialRegions }) => {
    const t = useTranslations('member');

    const [open, setOpen] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<RegionDetail | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const mapEl = document.getElementById('map');
        if (!mapEl) return;

        const onClick = async (e: MouseEvent) => {
            const t = e.target as SVGElement;
            if (!t?.classList?.contains('region')) return;

            const nameKey = (t as any).dataset?.name || t.getAttribute('data-name') || t.id;
            console.log(nameKey);
            const foundRegion = initialRegions.find((r) => slugify(r.name) === nameKey);

            if (foundRegion) {
                try {
                    setLoading(true);
                    const res = await apiBase.get<ApiDetailResponse>(
                        `${API_ENDPOINTS.regions}/${foundRegion.id}/members`
                    );

                    setSelectedRegion(res.data.data);
                    setOpen(true);
                } catch (error) {
                    console.error('Gagal mengambil detail member:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        mapEl.addEventListener('click', onClick);
        return () => mapEl.removeEventListener('click', onClick);
    }, [initialRegions]);

    return (
        <section className='relative w-full bg-white pt-16 lg:pt-24 lg:pb-58'>
            <Image
                src='/images/decoration-map.png'
                alt='images'
                width={150}
                height={150}
                className='absolute top-10 right-10 hidden xl:block'
            />
            <div className='container mb-12 flex flex-col items-center lg:mb-0'>
                <Maps data={initialRegions} />
                <SectionBadge
                    lineColor='bg-primary-500 h-0.5 w-3 rounded-full'
                    textColor='text-primary-500'
                    className='mt-16 rounded-full bg-white px-3 py-2 font-bold shadow-sm'>
                    {t('maps')}
                </SectionBadge>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-[calc(100%-2rem)] md:max-w-184'>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='flex flex-col items-start justify-between gap-2 lg:flex-row'>
                                <h2 className='text-left text-xl font-bold text-gray-900'>
                                    {selectedRegion?.name ?? 'Detail Daerah'}
                                </h2>
                            </div>
                        </DialogTitle>
                        <DialogDescription className='text-left' />
                    </DialogHeader>

                    {/* Organization List */}
                    <div className='mt-2 flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-1'>
                        {(selectedRegion?.members ?? []).map((org, index) => (
                            <div key={org.name ?? index} className='rounded-xl border border-slate-200 bg-white p-4'>
                                <div className='flex gap-3'>
                                    {/* Icon */}
                                    <div className='bg-primary-50 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full'>
                                        <MapPin className='h-5 w-5 text-slate-500' />
                                    </div>

                                    {/* Content */}
                                    <div className='flex flex-col gap-1.5'>
                                        <p className='font-semibold text-gray-900'>{org.name}</p>
                                        <p className='text-sm text-gray-500'>{org.address}</p>

                                        {/* Phone & Email */}
                                        <div className='mt-1 flex flex-wrap gap-x-4 gap-y-1'>
                                            {(org.phones ?? []).map((phone, i) => (
                                                <div
                                                    key={i}
                                                    className='flex items-center gap-1.5 text-sm text-gray-600'>
                                                    <Phone className='h-3.5 w-3.5 text-gray-400' />
                                                    <span>{phone}</span>
                                                </div>
                                            ))}

                                            {(org.emails ?? []).map((email, i) => (
                                                <div
                                                    key={i}
                                                    className='flex items-center gap-1.5 text-sm text-gray-600'>
                                                    <Mail className='h-3.5 w-3.5 text-gray-400' />
                                                    <span>{email}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Website */}
                                        {org.website && (
                                            <div className='flex items-center gap-1.5 text-sm'>
                                                <Link2 className='h-3.5 w-3.5 text-gray-400' />
                                                <a
                                                    href={`https://${org.website}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='text-primary-500 hover:underline'>
                                                    {org.website}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <CommunitySection />
        </section>
    );
};

export default MapsMemberSection;
