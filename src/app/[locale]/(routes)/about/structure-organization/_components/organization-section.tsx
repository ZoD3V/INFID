import Image from 'next/image';

import { formatLabel } from '@/lib/utils';

import { OrganizationLevel } from '../data/organization-data';

type Props = {
    data: OrganizationLevel[];
    activeTitle: string;
};

export default function OrganizationStructure({ data, activeTitle }: Props) {
    return (
        <div className='py-20'>
            <div className='container text-center'>
                <h2 className='text-primary-500 mb-8 text-3xl font-bold md:text-4xl'> {formatLabel(activeTitle)}</h2>

                <div className='relative flex flex-col items-center'>
                    {data.map((level, index) => (
                        <div key={level.level} className='flex w-full flex-col items-center'>
                            {/* MEMBERS */}
                            <div className='flex flex-wrap justify-center gap-4'>
                                {level.members.map((member, index) => (
                                    <div key={index} className='flex max-w-55 shrink-0 grow-0 basis-55 justify-center'>
                                        <OrgCard {...member} />
                                    </div>
                                ))}
                            </div>

                            {/* SINGLE VERTICAL LINE (EXCEPT LAST LEVEL) */}
                            {index !== data.length - 1 && (
                                <div className='my-8 h-10.5 w-0.5 rounded-full bg-slate-300' />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OrgCard({ name, role, image }: { name: string; role: string; image: string }) {
    return (
        <div className='group cursor-default rounded-lg border border-slate-200 bg-slate-100/50 p-3'>
            <div className='relative mb-4 aspect-square h-50 w-full overflow-hidden rounded-lg'>
                <Image src={image} alt={name} fill className='object-cover' />
            </div>
            <h3 className='text-center font-bold text-slate-900'>{name}</h3>
            <p className='text-primary-500 mb-2 max-w-75 text-center text-sm font-medium'>{role}</p>
        </div>
    );
}
