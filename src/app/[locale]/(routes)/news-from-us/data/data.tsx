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

export const categoriesNews = ['Semua', 'Kegiatan', 'Bergerak, Berdampak!', 'Siaran Pers', 'Laporan Tahunan'];

export const authorsNews = [
    { label: 'Samantha', value: 'samantha' },
    { label: 'Joko', value: 'joko' },
    { label: 'Rudi', value: 'rudi' }
];

export const yearsNews = ['2022', '2023', '2024', '2025'];

export const articles: Article[] = [
    {
        id: 1,
        title: 'Workshop Nasional: Akselerasi Transformasi Digital 2024',
        category: 'Kegiatan',
        date: '2022-04-12',
        author: 'Samantha',
        image: '/images/background-about-us.webp'
    },
    {
        id: 2,
        title: 'Kisah Sukses Petani Milenial di Era Smart Farming',
        category: 'Bergerak, Berdampak!',
        date: '2023-08-20',
        author: 'Joko',
        image: '/images/background-about-us.webp'
    },
    {
        id: 3,
        title: 'Pengumuman Resmi: Kemitraan Strategis untuk Pembangunan Berkelanjutan',
        category: 'Siaran Pers',
        date: '2024-01-15',
        author: 'Rudi',
        image: '/images/background-about-us.webp'
    },
    {
        id: 4,
        title: 'Festival Budaya: Menjaga Warisan di Tengah Modernisasi',
        category: 'Kegiatan',
        date: '2025-02-10',
        author: 'Anita',
        image: '/images/background-about-us.webp'
    },
    {
        id: 5,
        title: 'Dari Desa ke Global: Perjalanan UMKM Kerajinan Tangan',
        category: 'Bergerak, Berdampak!',
        date: '2022-06-18',
        author: 'Kevin',
        image: '/images/background-about-us.webp'
    },
    {
        id: 6,
        title: 'Pernyataan Bersama: Komitmen Pengurangan Plastik Sekali Pakai',
        category: 'Siaran Pers',
        date: '2023-11-22',
        author: 'Samantha',
        image: '/images/background-about-us.webp'
    },
    {
        id: 7,
        title: 'Seminar Internasional: Masa Depan Pendidikan di Asia',
        category: 'Kegiatan',
        date: '2024-04-05',
        author: 'Joko',
        image: '/images/background-about-us.webp'
    },
    {
        id: 8,
        title: 'Transformasi Kumuh Menjadi Kampung Wisata Kreatif',
        category: 'Bergerak, Berdampak!',
        date: '2025-08-30',
        author: 'Rudi',
        image: '/images/background-about-us.webp'
    },
    {
        id: 9,
        title: 'Rilis Data Tahunan: Capaian Program Literasi Digital',
        category: 'Siaran Pers',
        date: '2022-09-12',
        author: 'Anita',
        image: '/images/background-about-us.webp'
    },
    {
        id: 10,
        title: 'Pelatihan Kepemimpinan Muda di Tingkat Provinsi',
        category: 'Kegiatan',
        date: '2023-10-14',
        author: 'Kevin',
        image: '/images/background-about-us.webp'
    },
    {
        id: 11,
        title: 'Perempuan Berdaya: Mengubah Paradigma di Dunia Teknologi',
        category: 'Bergerak, Berdampak!',
        date: '2024-12-01',
        author: 'Samantha',
        image: '/images/background-about-us.webp'
    },
    {
        id: 12,
        title: 'Klarifikasi Mengenai Isu Distribusi Logistik Bencana',
        category: 'Siaran Pers',
        date: '2025-01-20',
        author: 'Joko',
        image: '/images/background-about-us.webp'
    },
    {
        id: 13,
        title: 'Konferensi Tingkat Tinggi Ekonomi Biru',
        category: 'Kegiatan',
        date: '2022-07-07',
        author: 'Rudi',
        image: '/images/background-about-us.webp'
    },
    {
        id: 14,
        title: 'Akses Air Bersih: Perubahan Hidup bagi Warga NTT',
        category: 'Bergerak, Berdampak!',
        date: '2023-02-25',
        author: 'Anita',
        image: '/images/background-about-us.webp'
    },
    {
        id: 15,
        title: 'Peluncuran Fitur Baru untuk Transparansi Anggaran Publik',
        category: 'Siaran Pers',
        date: '2024-06-13',
        author: 'Kevin',
        image: '/images/background-about-us.webp'
    },
    {
        id: 16,
        title: 'Pameran Inovasi Teknologi Tepat Guna',
        category: 'Kegiatan',
        date: '2025-05-19',
        author: 'Samantha',
        image: '/images/background-about-us.webp'
    }
];
