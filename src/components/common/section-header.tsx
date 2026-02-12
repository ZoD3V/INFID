import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import SectionBadge, { SectionBadgeProps } from './section-badge';

interface SectionHeaderProps {
    badge?: ReactNode;
    badgeProps?: Omit<SectionBadgeProps, 'children'>;
    title: ReactNode;
    description?: ReactNode;

    align?: 'left' | 'center';

    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export function SectionHeader({
    badge,
    badgeProps,
    title,
    description,
    align = 'left',
    className,
    titleClassName,
    descriptionClassName
}: SectionHeaderProps) {
    return (
        <div className={cn('mb-12', align === 'center' && 'mx-auto text-center', className)}>
            {badge && <SectionBadge {...badgeProps}>{badge}</SectionBadge>}

            <h2 className={cn('text-secondary-200 mb-4 text-4xl font-bold lg:text-5xl', titleClassName)}>{title}</h2>

            {description && (
                <p
                    className={cn(
                        'text-sm text-slate-200 md:text-base',
                        align === 'center' ? 'mx-auto max-w-lg' : 'max-w-md',
                        descriptionClassName
                    )}>
                    {description}
                </p>
            )}
        </div>
    );
}
