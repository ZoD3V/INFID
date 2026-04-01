import { ReactNode } from 'react';

import { TriangleAlertIcon } from 'lucide-react';

type EmptyStateProps = {
    icon?: ReactNode;
    title?: string;
    description?: string;
    className?: string;
};

export default function EmptyState({
    icon,
    title = 'Data Not Found',
    description = 'No data available.',
    className = 'mt-12'
}: EmptyStateProps) {
    return (
        <div
            className={`flex h-100 w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 px-4 text-center ${className}`}>
            <div className='mb-3 rounded-full bg-slate-100 p-3'>
                {icon ?? <TriangleAlertIcon className='h-6 w-6 text-slate-400' />}
            </div>

            <p className='text-sm font-medium text-slate-600'>{title}</p>

            {description && <p className='mt-1 max-w-64 text-xs text-slate-400'>{description}</p>}
        </div>
    );
}
