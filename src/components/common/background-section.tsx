import React from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface BreadcrumbItemType {
    label: string;
    href?: string;
    active?: boolean;
}

interface PageHeaderProps {
    title: string;
    backgroundImage: string;
    breadcrumbs: BreadcrumbItemType[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, backgroundImage, breadcrumbs }) => {
    return (
        <div
            className='relative z-20 h-48 bg-cover bg-center bg-no-repeat pt-8 md:h-52 lg:h-67'
            style={{ backgroundImage: `url('${backgroundImage}')` }}>
            {/* Overlay */}
            <div className='from-primary-500/80 via-primary-500/80 to-primary-500/20 absolute inset-0 bg-linear-to-b' />

            <div className='container flex h-full items-center justify-center'>
                <div className='z-10 flex w-full flex-col items-start justify-end gap-8'>
                    <div className='flex flex-col items-start gap-1'>
                        {/* Breadcrumb */}
                        <Breadcrumb className='text-secondary-200'>
                            <BreadcrumbList>
                                {breadcrumbs.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {item.href && !item.active ? (
                                                <BreadcrumbLink
                                                    href={item.href}
                                                    className='text-secondary-200 hover:text-secondary-300'>
                                                    {item.label}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbLink className='text-secondary-200 hover:text-secondary-300 cursor-default font-bold'>
                                                    {item.label}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>

                                        {index < breadcrumbs.length - 1 && (
                                            <BreadcrumbSeparator className='text-secondary-200' />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>

                        {/* Title */}
                        <h1 className='line-clamp-1 text-3xl font-bold tracking-wide text-white md:text-4xl'>
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
