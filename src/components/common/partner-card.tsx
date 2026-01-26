import Image from 'next/image';

export interface Partner {
    name: string;
    logo: string;
}

export const PartnerCard = ({ partner }: { partner: Partner }) => (
    <div className='flex items-center justify-center rounded-xl border border-slate-200 bg-white p-8'>
        <div className='flex h-24 w-full items-center justify-center'>
            <Image
                width={250}
                height={250}
                src={partner.logo}
                alt={partner.name}
                className='max-h-full max-w-full object-contain'
            />
        </div>
    </div>
);
