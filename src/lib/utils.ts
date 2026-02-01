import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatLabel(key: string) {
    return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const formatDateShort = (date: string | Date) => {
    const d = new Date(date);

    return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    });
};
