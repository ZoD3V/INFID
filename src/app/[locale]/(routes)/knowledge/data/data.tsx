export type Article = {
    id: number;
    title: string;
    category: string;
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

export const categoriesKnowledge = ['Semua', 'Riset', 'Kertas Kebijakan', 'Modul dan Panduan', 'Artikel'];

export const authorsKnowledge = [
    { label: 'Samantha', value: 'samantha' },
    { label: 'Joko', value: 'joko' },
    { label: 'Rudi', value: 'rudi' }
];

export const yearsKnowledge = ['2022', '2023', '2024', '2025'];

export const articlesKnowledge: Article[] = [
    {
        id: 1,
        title: 'Analisis Dampak Ekonomi Digital terhadap UMKM di Indonesia',
        category: 'Riset',
        date: '2022-03-12',
        author: 'Samantha',
        image: '/images/knowledge-1.png'
    },
    {
        id: 2,
        title: 'Rekomendasi Strategis Percepatan Energi Terbarukan 2030',
        category: 'Kertas Kebijakan',
        date: '2023-05-20',
        author: 'Joko',
        image: '/images/knowledge-2.png'
    },
    {
        id: 3,
        title: 'Langkah-Langkah Implementasi Keamanan Siber bagi Pemula',
        category: 'Modul dan Panduan',
        date: '2024-01-15',
        author: 'Rudi',
        image: '/images/knowledge-3.png'
    },
    {
        id: 4,
        title: 'Visualisasi Data: Tren Penggunaan Media Sosial Global',
        category: 'Infografis',
        date: '2025-02-10',
        author: 'Anita',
        image: '/images/knowledge-4.png'
    },
    {
        id: 5,
        title: 'Pentingnya Kolaborasi Multipihak dalam Pembangunan Desa',
        category: 'Artikel',
        date: '2022-06-18',
        author: 'Kevin',
        image: '/images/knowledge-1.png'
    },
    {
        id: 6,
        title: 'Studi Kasus Efisiensi Logistik di Kawasan Industri',
        category: 'Riset',
        date: '2023-11-22',
        author: 'Samantha',
        image: '/images/knowledge-2.png'
    },
    {
        id: 7,
        title: 'Kerangka Regulasi Perlindungan Data Pribadi Konsumen',
        category: 'Kertas Kebijakan',
        date: '2024-04-05',
        author: 'Joko',
        image: '/images/knowledge-3.png'
    },
    {
        id: 8,
        title: 'Panduan Teknis Penulisan Karya Ilmiah Standar Internasional',
        category: 'Modul dan Panduan',
        date: '2025-08-30',
        author: 'Rudi',
        image: '/images/knowledge-4.png'
    },
    {
        id: 9,
        title: 'Statistik Pertumbuhan Ekonomi Kreatif Tahun 2023',
        category: 'Infografis',
        date: '2022-09-12',
        author: 'Anita',
        image: '/images/knowledge-1.png'
    },
    {
        id: 10,
        title: 'Menilik Masa Depan Kecerdasan Buatan di Asia Tenggara',
        category: 'Artikel',
        date: '2023-10-14',
        author: 'Kevin',
        image: '/images/knowledge-2.png'
    },
    {
        id: 11,
        title: 'Evaluasi Kebijakan Transportasi Publik di Kota Besar',
        category: 'Riset',
        date: '2024-12-01',
        author: 'Samantha',
        image: '/images/knowledge-3.png'
    },
    {
        id: 12,
        title: 'Usulan Reformasi Perpajakan untuk Sektor Teknologi',
        category: 'Kertas Kebijakan',
        date: '2025-01-20',
        author: 'Joko',
        image: '/images/knowledge-4.png'
    },
    {
        id: 13,
        title: 'Modul Pelatihan Kepemimpinan untuk Manajer Menengah',
        category: 'Modul dan Panduan',
        date: '2022-07-07',
        author: 'Rudi',
        image: '/images/knowledge-1.png'
    },
    {
        id: 14,
        title: 'Peta Sebaran Tenaga Kerja Digital di Indonesia',
        category: 'Infografis',
        date: '2023-02-25',
        author: 'Anita',
        image: '/images/knowledge-2.png'
    },
    {
        id: 15,
        title: 'Bagaimana Remote Work Mengubah Lanskap Perkotaan',
        category: 'Artikel',
        date: '2024-06-13',
        author: 'Kevin',
        image: '/images/knowledge-3.png'
    },
    {
        id: 16,
        title: 'Riset Mendalam: Pengaruh Diet Nabati terhadap Kesehatan',
        category: 'Riset',
        date: '2025-05-19',
        author: 'Samantha',
        image: '/images/knowledge-4.png'
    }
];
