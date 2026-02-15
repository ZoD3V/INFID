import { type ClassValue, clsx } from 'clsx';
import { format, isValid, parseISO } from 'date-fns';
import { id } from 'date-fns/locale/id';
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

export function formatArticleDate(date: string | Date | null | undefined): string {
    if (!date) return '';

    const parsedDate = typeof date === 'string' ? parseISO(date) : date;

    if (!isValid(parsedDate)) {
        return 'Tanggal tidak valid';
    }

    return format(parsedDate, 'dd MMM yy', { locale: id });
}

export const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};
