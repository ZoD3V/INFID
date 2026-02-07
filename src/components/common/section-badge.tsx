import { cn } from '@/lib/utils';

interface SectionBadgeProps {
    children: React.ReactNode;
    className?: string;
    textColor?: string;
    lineColor?: string;
}

export default function SectionBadge({
    children,
    className,
    textColor = 'text-secondary-300',
    lineColor = 'bg-secondary-300'
}: SectionBadgeProps) {
    return (
        <div className={cn('mb-4 flex items-center gap-2 text-sm font-medium tracking-wider', textColor, className)}>
            <span className={cn('h-px w-4', lineColor)}></span>

            {children}

            <span className={cn('h-px w-4', lineColor)}></span>
        </div>
    );
}
