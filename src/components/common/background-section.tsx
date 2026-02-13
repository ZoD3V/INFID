import React from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

interface BreadcrumbItemType {
    label: string;
    href?: string;
    active?: boolean;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    backgroundImage: string;
    breadcrumbs: BreadcrumbItemType[];
    showTitle?: boolean;
    showDescription?: boolean;
    containerClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    backgroundImage,
    breadcrumbs,
    showTitle = true,
    showDescription = false,
    containerClassName = 'h-48 md:h-52 lg:h-67 pt-8'
}) => {
    return (
        <div
            className={cn('relative z-20 bg-cover bg-center bg-no-repeat', containerClassName)}
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
                        {showTitle && (
                            <h1 className='line-clamp-1 text-3xl font-bold tracking-wide text-white md:text-4xl'>
                                {title}
                            </h1>
                        )}

                        {showDescription && <p className='text-start text-sm text-white md:text-base'>{description}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
