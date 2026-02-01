// data/featured-news.ts
import { FeaturedNewsItem } from './data';

export const featuredNews: FeaturedNewsItem[] = [
    {
        id: 'featured-1',
        title: 'Kolaborasi Nasional Dorong Pembangunan Berkelanjutan',
        description: 'Kolaborasi lintas sektor menjadi kunci dalam mempercepat pembangunan berkelanjutan di Indonesia.',
        image: '/images/background-about-us.webp',
        badge: 'Featured',
        date: '2025-02-15',
        createdBy: 'Samantha',
        seen: 1245,
        comments: 18
    },
    {
        id: 'featured-2',
        title: 'Cerita Perubahan dari Akar Rumput',
        description: 'Inisiatif komunitas lokal membuktikan perubahan besar bisa dimulai dari langkah kecil.',
        image: '/images/background-about-us.webp',
        badge: 'Highlight',
        date: '2025-02-12',
        createdBy: 'Joko',
        seen: 982,
        comments: 11
    }
];
