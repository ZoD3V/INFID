'use client';
import { useState } from 'react';

import Image from 'next/image';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatLabel } from '@/lib/utils';

import { OrganizationLevel } from '../data/organization-data';
import { Eye, MessageSquare } from 'lucide-react';

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
                <DialogContent className='sm:max-w-xl md:max-w-2xl lg:max-w-3xl'>
                    {selectedPerson && (
                        <>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <div className='flex flex-col items-center gap-5 md:flex-row md:items-start'>
                                <div className='mb-4 h-60 w-60 shrink-0 overflow-hidden rounded-lg'>
                                    <img
                                        src={selectedPerson.image}
                                        alt={selectedPerson.name}
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                                <div className='flex flex-col items-center md:items-start'>
                                    <h3 className='text-2xl font-bold text-gray-900'>{selectedPerson.name}</h3>
                                    <p className='text-primary-500 text-sm font-medium'>{selectedPerson.role}</p>

                                    <p className='mt-4 leading-relaxed text-gray-700'>{selectedPerson.description}</p>
                                </div>
                            </div>

                            {selectedPerson.publications && (
                                <div className='flex flex-col'>
                                    <h4 className='mb-4 text-lg font-bold text-gray-900'>Publikasi Terbaru</h4>
                                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                        {selectedPerson.publications?.map((pub: any) => (
                                            <div key={pub.id} className='group flex cursor-pointer gap-4'>
                                                {/* Thumbnail */}
                                                <div className='h-20 w-20 shrink-0 overflow-hidden rounded-md'>
                                                    <img
                                                        src={pub.image}
                                                        alt={pub.title}
                                                        className='h-full w-full object-cover transition-transform group-hover:scale-110'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex flex-col justify-between py-1'>
                                                    <div>
                                                        <div className='text-secondary-200 flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase'>
                                                            {pub.category}
                                                            <span className='text-slate-300'>•</span>
                                                            <span className='font-normal text-slate-500'>
                                                                {pub.date}
                                                            </span>
                                                        </div>
                                                        <h5 className='mt-1 line-clamp-2 text-sm leading-snug font-bold text-slate-900'>
                                                            {pub.title}
                                                        </h5>
                                                    </div>

                                                    {/* Stats */}
                                                    <div className='mt-2 flex items-center gap-4 text-[11px] text-slate-400'>
                                                        <div className='flex items-center gap-1'>
                                                            <Eye size={14} /> {pub.views} Dilihat
                                                        </div>
                                                        <div className='flex items-center gap-1'>
                                                            <MessageSquare size={14} /> {pub.comments} Komentar
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
            className='group cursor-pointer rounded-lg border border-slate-200 bg-white p-3 transition-shadow duration-300 ease-in-out hover:shadow'>
            <div className='relative mb-4 aspect-square h-50 w-full overflow-hidden rounded-lg'>
                <Image src={image} alt={name} fill className='object-cover' />
            </div>
            <h3 className='text-center font-bold text-slate-900'>{name}</h3>
            <p className='text-primary-500 mb-2 max-w-75 text-center text-sm font-medium'>{role}</p>
        </div>
    );
}
