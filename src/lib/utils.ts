import { CategoryTranslation } from '@/types/posts';

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

export const formatFullDate = (dateString: string | Date, locale: string = 'id') => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '-';

    return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

export const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export const slugify = (text: string = '') => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
};

export const formatDate = (dateString: string, locale: string = 'id-ID') => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

export const formatDateTime = (dateString: string, locale: string = 'id-ID') => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
        // hour: '2-digit',
        // minute: '2-digit'
    }).format(date);
};

export const convertToEmbedUrl = (url: string) => {
    try {
        const parsed = new URL(url);

        // ex: https://www.youtube.com/watch?v=xxxx
        if (parsed.hostname.includes('youtube.com')) {
            const videoId = parsed.searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // ex: https://youtu.be/xxxx
        if (parsed.hostname.includes('youtu.be')) {
            return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
        }

        return url;
    } catch {
        return '';
    }
};

export const getShortDescription = (content: string) => {
    return content?.replace(/<[^>]*>/g, '').substring(0, 120) || '';
};

export const getLangText = (translations: CategoryTranslation[] | undefined, langCode: string = 'id'): string => {
    if (!translations || translations.length === 0) return '';

    const translation = translations.find((t) => t.language === langCode);

    return translation?.text || translations[0].text || '';
};
