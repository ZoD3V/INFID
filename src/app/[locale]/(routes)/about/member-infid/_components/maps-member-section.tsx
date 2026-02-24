'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Maps } from '@/components/common/maps';
import SectionBadge from '@/components/common/section-badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { REGION_DISPLAY_MAP, REGION_KEYS, RegionKey } from '@/data/region-data';

import CommunitySection from '../../../(home)/_components/community-section';
import { Link2, Mail, MapPin, Phone } from 'lucide-react';

interface Organization {
    name: string;
    address: string;
    phones: string[];
    emails: string[];
    website?: string;
}

// Example data structure - sesuaikan dengan data asli kamu
const organizations: Organization[] = [
    {
        name: 'Lembaga Bela Banua Talino LBBT - Pontianak',
        address: 'Jalan Budi Utomo Blok A5/No. 4 Siantan Hulu, Pontianak Utara, Kota Pontianak 78241',
        phones: ['0561 884566'],
        emails: ['banua.talino@gmail.com'],
        website: 'www.lbbt.org'
    },
    {
        name: 'Institute of Dayakology',
        address: 'Kompleks Bumi Indah Khatulistiwa, Jl. Budi Utomo Blok B no. 4, Pontianak 78241 Kalimantan Barat',
        phones: ['0561 – 884 567'],
        emails: ['i.dayakologi@ptk.centrin.net.id', 'krissusandi@gmail.com'],
        website: 'www.lbbt.org'
    }
];

const MapsMemberSection = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    useEffect(() => {
        const mapEl = document.getElementById('map');
        if (!mapEl) return;
        // setChartData([]);

        const onClick = (e: any) => {
            const t = e.target as SVGElement;
            if (!t?.classList?.contains('region')) return;

            const nameKey = (t as any).dataset?.name || (t as any).getAttribute('data-name') || (t as any).id;
            // setSelectedRegionKey(nameKey);
            const matchKey = REGION_KEYS.find((k) => k === nameKey) ?? nameKey;

            const displayName = REGION_DISPLAY_MAP[matchKey as RegionKey] || 'Wilayah';
            setSelectedRegion(displayName);

            setOpen(true);
        };

        mapEl.addEventListener('click', onClick);
        return () => mapEl.removeEventListener('click', onClick);
    }, []);

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
                <Maps />
                <SectionBadge
                    lineColor='bg-primary-500 h-0.5 w-3 rounded-full'
                    textColor='text-primary-500'
                    className='mt-16 rounded-full bg-white px-3 py-2 font-bold shadow-sm'>
                    80 Anggota untuk perubahan
                </SectionBadge>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-[calc(100%-2rem)] md:max-w-184'>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='flex flex-col items-start justify-between gap-2 lg:flex-row'>
                                <h2 className='text-left text-xl font-bold text-gray-900'>
                                    {selectedRegion ?? 'Detail Daerah'}
                                </h2>
                            </div>
                        </DialogTitle>
                        <DialogDescription className='text-left' />
                    </DialogHeader>

                    {/* Organization List */}
                    <div className='mt-2 flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-1'>
                        {(organizations ?? []).map((org, index) => (
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
