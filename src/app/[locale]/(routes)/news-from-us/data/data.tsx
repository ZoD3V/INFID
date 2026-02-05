export type Article = {
    id: number;
    title: string;
    category: 'Kegiatan' | 'Cerita Perubahan' | 'Siaran Pers';
    date: string;
    onClick?: () => void;
    author: string;
    image: string;
};

export interface ArticleCardProps {
    article: Article;
    onClick?: (id: number) => void;
}

export interface FeaturedNewsItem {
    id: string;
    title: string;
    description: string;
    image: string;
    badge: string;
    date: string;
    createdBy: string;
    seen: number;
    comments: number;
}

const categories: Article['category'][] = ['Kegiatan', 'Cerita Perubahan', 'Siaran Pers'];

const authors = ['Samantha', 'Joko', 'Rudi', 'Anita', 'Kevin'];

const years = [2022, 2023, 2024, 2025];

export const articles: Article[] = Array.from({ length: 64 }, (_, i) => {
    const year = years[i % years.length];
    const month = ((i % 12) + 1).toString().padStart(2, '0');
    const day = ((i % 28) + 1).toString().padStart(2, '0');

    return {
        id: i + 1,
        title: `Judul Artikel ${i + 1}: Inisiatif dan Kolaborasi untuk Perubahan`,
        category: categories[i % categories.length],
        date: `${year}-${month}-${day}`,
        author: authors[i % authors.length],
        image: '/images/background-about-us.webp'
    };
});
