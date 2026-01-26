import Image from 'next/image';

type ProfileCardProps = {
    name: string;
    title: string;
    image: string;
};

export default function ProfileCard({ name, title, image }: ProfileCardProps) {
    return (
        <div className='overflow-hidden rounded-lg border border-slate-200 bg-white p-3'>
            {/* Image */}
            <div className='relative aspect-square w-full rounded-lg'>
                <Image src={image} alt={name} fill className='object-cover' />
            </div>

            {/* Content */}
            <div className='mt-4'>
                <h3 className='text-sm font-semibold text-gray-900'>{name}</h3>
                <p className='mt-1 text-sm leading-snug text-gray-600'>{title}</p>
            </div>
        </div>
    );
}
