'use client';
import { useState } from 'react';

import Image from 'next/image';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatLabel } from '@/lib/utils';

import { OrganizationLevel } from '../data/organization-data';

type Props = {
    data: OrganizationLevel[];
    activeTitle: string;
};

export default function OrganizationStructure({ data, activeTitle }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<any>(null);

    const handleOpenDialog = (person: any) => {
        setSelectedPerson(person);
        setDialogOpen(true);
    };

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
                                        <MemberCard {...member} onClick={() => handleOpenDialog(member)} />
                                    </div>
                                ))}
                            </div>

                            {index !== data.length - 1 && (
                                <div className='bg-primary-500 my-8 h-10.5 w-0.5 rounded-full' />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    {selectedPerson && (
                        <>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <div className='mt-4 space-y-6'>
                                <div className='flex flex-col items-center'>
                                    <div className='mb-4 h-62 w-62 overflow-hidden rounded-lg'>
                                        <img
                                            src={selectedPerson.image}
                                            alt={selectedPerson.name}
                                            className='h-full w-full object-cover'
                                        />
                                    </div>

                                    <h3 className='text-2xl font-bold text-gray-900'>{selectedPerson.name}</h3>

                                    <p className='text-primary-500 text-sm font-medium'>{selectedPerson.role}</p>
                                </div>

                                <p className='leading-relaxed text-gray-700'>
                                    {selectedPerson.description || 'Tidak ada deskripsi tersedia.'}
                                </p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

function MemberCard({
    name,
    role,
    image,
    onClick
}: {
    name: string;
    role: string;
    image: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className='group cursor-pointer rounded-lg border border-slate-200 bg-white p-3 transition-shadow duration-300 hover:shadow'>
            <div className='relative mb-4 aspect-square h-50 w-full overflow-hidden rounded-lg'>
                <Image src={image} alt={name} fill className='object-cover' />
            </div>
            <h3 className='text-center font-bold text-slate-900'>{name}</h3>
            <p className='text-primary-500 mb-2 max-w-75 text-center text-sm font-medium'>{role}</p>
        </div>
    );
}
