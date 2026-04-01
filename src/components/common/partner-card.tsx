import Image from 'next/image';

import { Partners } from '@/types/patner';

export const PartnerCard = ({ partner }: { partner: Partners }) => (
    <div className='flex items-center justify-center rounded-xl border border-slate-200 bg-white p-8'>
        <div className='flex h-24 w-full items-center justify-center'>
            <Image
                width={250}
                height={250}
                src={partner.image}
                alt={partner.name}
                className='max-h-full max-w-full object-contain'
            />
        </div>
    </div>
);
