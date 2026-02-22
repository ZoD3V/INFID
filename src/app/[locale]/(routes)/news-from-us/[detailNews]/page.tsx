'use client';

import React from 'react';

import Image from 'next/image';

import { ArticleCard } from '@/components/common/article-card';
import PageHeader from '@/components/common/background-section';
import CommentSection, { CommentFormValues, CommentType } from '@/components/common/comment-article';
import { Button } from '@/components/ui/button';
import { Link as Navigate } from '@/i18n/navigation';

import { articles } from '../data/data';
import { Calendar, Eye, Link, MessageSquareMore, Pencil } from 'lucide-react';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon
} from 'react-share';

const DetailNewsFromUs = () => {
    const [dummyComments, setDummyComments] = React.useState<CommentType[]>([
        {
            id: 1,
            nama: 'Budi Santoso',
            waktu: '2 Jam yang lalu',
            isi: 'Artikel yang sangat mencerahkan. Saya setuju bahwa literasi digital adalah kunci utama.'
        },
        {
            id: 2,
            nama: 'Rina Wati',
            waktu: '5 Jam yang lalu',
            isi: 'Apakah ada data spesifik mengenai dampak polarisasi terhadap partisipasi pemilih?'
        }
    ]);

    const handleAddComment = (values: CommentFormValues) => {
        const newComment: CommentType = {
            id: Date.now(),
            nama: values.nama,
            waktu: 'Baru saja',
            isi: values.komentar
        };

        setDummyComments([...dummyComments, newComment]);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const newsData = {
        featured: {
            id: 1,
            title: 'Menakar Masa Depan Demokrasi Indonesia Pasca 2024',
            description:
                'Analisis komprehensif mengenai peta politik, tantangan elektoral, dan peran masyarakat sipil dalam menjaga integritas pemilu.',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
            date: '15 JAN 25',
            seen: 23,
            comments: 10,
            badge: 'Populer',
            createdBy: 'Samantha'
        },
        articles: [
            {
                id: 2,
                title: 'Transisi Energi yang Berkeadilan untuk Semua',
                type: 'KERTAS KEBIJAKAN',
                image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                seen: 23,
                comments: 10,
                createdBy: 'Samantha'
            },
            {
                id: 3,
                title: 'Urgensi Perlindungan Pembela HAM',
                type: 'ARTIKEL',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                seen: 23,
                comments: 10,
                createdBy: 'Samantha'
            },
            {
                id: 4,
                title: 'Indeks Kinerja HAM 2023',
                type: 'RISET',
                image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=400&h=300&fit=crop',
                date: '10 Jan 2025',
                seen: 23,
                comments: 10,
                createdBy: 'Samantha'
            }
        ]
    };

    return (
        <section className='w-full bg-stone-50'>
            <PageHeader
                title='Karir'
                showTitle={false}
                backgroundImage='/images/background-about-us.webp'
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Kabar dari Kami', href: '/' },
                    {
                        label: 'Dari Afsel ke AS: C20 Indonesia Mengawal Hasil G20 2025 dan Mulai Beradvokasi untuk G20 2026',
                        active: true
                    }
                ]}
                containerClassName='h-38 pt-14'
            />
            <div className='container py-16'>
                <div className='flex w-full flex-col items-start justify-center gap-10 xl:flex-row'>
                    <div className='flex w-full flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='scroll-m-20 py-2 text-start text-3xl font-bold tracking-tight xl:text-4xl'>
                                Dari Afsel ke AS: C20 Indonesia Mengawal Hasil G20 2025 dan Mulai Beradvokasi untuk G20
                                2026
                            </h1>
                            <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
                                <div className='flex items-center gap-1'>
                                    <Pencil className='h-3 w-3' />
                                    By <span className='font-semibold text-slate-900'>Samantha</span>
                                </div>

                                <span className='h-1 w-1 rounded-full bg-slate-500' />

                                <div className='flex items-center gap-2 truncate'>
                                    <Calendar className='h-3 w-3' />
                                    15 November 2025
                                </div>

                                <span className='h-1 w-1 rounded-full bg-slate-500' />

                                <div className='flex items-center gap-1'>
                                    <Eye className='h-3 w-3' />
                                    200 Dilihat
                                </div>

                                <span className='h-1 w-1 rounded-full bg-slate-500' />

                                <div className='flex items-center gap-1'>
                                    <MessageSquareMore className='h-3 w-3' />
                                    14 Komentar
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <h3 className='text-secondary-300 font-bold uppercase'>Kegiatan</h3>

                            <Button className='rounded-full' size={'sm'}>
                                <Link />
                                Unduh Lampiran
                            </Button>
                        </div>
                        <Image
                            width={500}
                            height={500}
                            src='/images/background-about-us.webp'
                            alt={'thumbnail artikel G20'}
                            className='h-auto w-full rounded-lg object-cover'
                        />
                        <article
                            className='prose xl:prose-base'
                            dangerouslySetInnerHTML={{
                                __html: `
                        <p>Civil 20 (C20) Indonesia melanjutkan perannya dalam mengawal implementasi hasil-hasil G20 2025 di Afrika Selatan dan telah memulai advokasi untuk G20 2026 yang akan diselenggarakan di Amerika Serikat.</p>
                        
                        <h2>Lanjutan dari G20 Afrika Selatan 2025</h2>
                        <p>Delegasi C20 Indonesia baru-baru ini menghadiri pertemuan tindak lanjut di Cape Town untuk memastikan komitmen-komitmen yang telah disepakati dalam G20 2025 tetap berjalan sesuai rencana. Fokus utama adalah pada isu perubahan iklim, ketahanan pangan, dan transformasi digital.</p>
                        
                        <h2>Persiapan untuk G20 Amerika Serikat 2026</h2>
                        <p>Sementara itu, C20 Indonesia telah memulai proses advokasi untuk agenda G20 2026. Beberapa isu prioritas yang akan diusung antara lain:</p>
                        <ul>
                            <li>Ekonomi biru dan keberlanjutan laut</li>
                            <li>Transisi energi yang berkeadilan</li>
                            <li>Pemberdayaan UMKM digital</li>
                            <li>Pendanaan inklusif untuk negara berkembang</li>
                        </ul>
                        
                        <p>Direktur Eksekutif C20 Indonesia, Maria Santoso, menyatakan: "Kami belajar banyak dari pengalaman G20 Indonesia 2022 dan sekarang kami berperan penting dalam memastikan kontinuitas agenda-agenda strategis dari satu presidensi ke presidensi berikutnya."</p>
                        
                        <h2>Kolaborasi dengan CSO Global</h2>
                        <p>C20 Indonesia juga memperkuat jejaring dengan organisasi masyarakat sipil dari negara-negara G20 lainnya untuk membangun konsensus dan mendorong agenda-agenda yang berpihak pada masyarakat rentan.</p>
                        
                        <p>Pertemuan koordinasi berikutnya direncanakan akan dilaksanakan di Washington DC pada Maret 2026 untuk menyelaraskan strategi advokasi menjelang KTT G20 2026.</p>
                    `
                            }}
                        />
                        <div className='flex w-full flex-col items-start justify-between gap-4 border-y border-dashed py-5 md:flex-row md:items-center'>
                            <h3 className='text-secondary-300 font-bold uppercase'>Kegiatan</h3>
                            <div className='flex items-center gap-4'>
                                <p className='text-primary-900 text-sm md:text-base'>Dukung gagasan kami dan bagikan</p>
                                <div className='flex items-center gap-2'>
                                    <FacebookShareButton url={'/'} title={'title'}>
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton url={'/'} title={'title'}>
                                        <XIcon size={32} round />
                                    </TwitterShareButton>

                                    <WhatsappShareButton url={'/'} title={'title'}>
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <div
                                        className='cursor-pointer rounded-full bg-gray-200 p-2'
                                        onClick={() => handleCopy()}>
                                        <Link className='h-4 w-4 text-sm' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CommentSection comments={dummyComments} onSubmit={handleAddComment} />
                    </div>

                    <div className='w-full space-y-5 xl:w-[60%]'>
                        <div className='flex flex-col'>
                            <h3 className='pb-5 text-xl font-bold'>Artikel Terbaru</h3>
                            <div className='p-0'>
                                <div className='flex w-full flex-col gap-4'>
                                    {/* Contoh RelatedNewsCard dummy */}
                                    {newsData.articles.map((article) => (
                                        <div
                                            key={article.id}
                                            className='cursor-pointer overflow-hidden rounded-lg transition-shadow'>
                                            <div className='flex h-full flex-row items-start gap-4'>
                                                {/* Image */}
                                                <div className='h-32.5 w-32.5 shrink-0 overflow-hidden rounded-lg'>
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className='h-full w-full object-cover transition-transform duration-300'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='flex h-32.5 flex-col justify-evenly'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-secondary-300 text-xs font-medium lg:text-sm'>
                                                            {article.type}
                                                        </span>
                                                        <span className='h-1 w-1 rounded-full bg-slate-500'></span>
                                                        <span className='text-xs text-slate-500'>{article.date}</span>
                                                    </div>
                                                    <div className='flex flex-col items-start justify-start gap-2'>
                                                        <h3 className='text-primary-900 line-clamp-2 text-base leading-tight font-bold transition-colors group-hover:text-teal-600'>
                                                            {article.title}
                                                        </h3>

                                                        <div className='flex items-center gap-2 text-xs text-slate-500'>
                                                            <div className='flex items-center gap-1'>
                                                                <Eye className='h-4 w-4' /> {article.seen} Dilihat
                                                            </div>
                                                            <span className='h-1 w-1 rounded-full bg-slate-500'></span>

                                                            <div className='flex items-center gap-1'>
                                                                <MessageSquareMore className='h-4 w-4' />{' '}
                                                                {article.comments} Komentar
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                            <Pencil className='h-3 w-3' /> By{' '}
                                                            {newsData.featured.createdBy}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='pb-5 text-xl font-bold'>Tag</h3>
                            <div className='flex flex-wrap gap-2'>
                                {['Kegiatan', 'Cerita Perubahan', 'Siaran Pers'].map((cat) => (
                                    <Navigate
                                        key={cat}
                                        href={{
                                            pathname: '/news-from-us',
                                            query: { category: cat }
                                        }}
                                        className='text-primary-500 hover:bg-primary-500 rounded-full border bg-white px-4 py-2.5 text-xs font-bold transition-colors duration-300 hover:text-white'>
                                        {cat}
                                    </Navigate>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col pt-10'>
                    <h3 className='pb-5 text-xl font-bold'>Artikel Terkait</h3>
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {articles.slice(0, 4).map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailNewsFromUs;
