'use client';

import { ChevronUp, Mail, MapPin, Phone } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const footerLinks = {
        tentang_kami: [
            { name: 'Struktur Organisasi', href: '/tentang-kami' },
            { name: 'INFID Research Fellow', href: '/program-kami/umkm' },
            { name: 'Anggota INFID', href: '/berita' },
            { name: 'Mitra INFID', href: '/gallery' }
        ],
        pengetahuan: [
            { name: 'Riset', href: '/tentang-kami' },
            { name: 'Kertas Kerja', href: '/program-kami/umkm' },
            { name: 'Modul & Panduan', href: '/berita' },
            { name: 'Artikel', href: '/gallery' }
        ],
        sekretariat_INFD: [
            {
                name: 'whatsapp',
                href: 'https://api.whatsapp.com/send?phone=6281288881951&text=Halo%2C%20ada%20yang%20ingin%20saya%20tanyakan%20di%20Partai%20Rakyat%20Indonesia'
            },
            {
                name: 'info@partairakyat.id',
                href: '',
                icon: <Mail className='h-5 w-5' />
            },
            {
                name: 'Jakarta Pusat, DKI Jakarta',
                href: '',
                icon: <MapPin className='h-5 w-5' />
            }
        ]
    };

    return (
        <footer className='bg-[#12272C]'>
            <div className='container px-4 py-16 md:px-6 xl:px-0'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12'>
                    {/* Brand Column */}
                    <div className='lg:col-span-4'>
                        <div className='mb-6 flex items-center gap-2'>
                            <img
                                width={100}
                                height={100}
                                src='/logo/logo-footer.png'
                                alt='Logo'
                                className='h-10 w-38'
                            />
                        </div>

                        <p className='mb-6 text-sm font-normal text-slate-200'>
                            INFID adalah organisasi masyarakat sipil berbasis anggota yang berjuang untuk pembangunan
                            Indonesia sejak 1985. Kekuatan terbesar pada gerakan INFID adalah jaringan 80 anggota di
                            seluruh Indonesia dan komitmen untuk mengadvokasi kebijakan dengan berbasis bukti.
                        </p>

                        <div className='flex gap-4'>
                            <a
                                href='https://www.instagram.com/dpp.pri/'
                                aria-label='Instagram'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaInstagram className='text-2xl' />
                            </a>

                            <a
                                href='https://www.facebook.com/DppPartaiRakyat/'
                                aria-label='Facebook'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaFacebook className='text-xl' />
                            </a>

                            <a
                                href='https://www.tiktok.com/@dpp.pri'
                                aria-label='TikTok'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaTiktok className='text-xl' />
                            </a>

                            <a
                                href='https://www.youtube.com/@dpppri'
                                aria-label='Youtube'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaYoutube className='text-xl' />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className='lg:col-span-7'>
                        <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h6 className='mb-4 text-base font-bold text-white'>
                                        {category
                                            .split('_')
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')}
                                    </h6>

                                    <ul className='flex flex-col gap-2'>
                                        {links.map((link, index) => (
                                            <li key={index} className='flex items-start gap-2'>
                                                {link.name === 'whatsapp' ? (
                                                    <a
                                                        href={link.href}
                                                        className='flex items-center gap-1 text-sm text-slate-200 hover:text-slate-300'>
                                                        <BsWhatsapp />
                                                        081288881951
                                                    </a>
                                                ) : link.href !== '' ? (
                                                    <a
                                                        href={link.href}
                                                        className='text-sm text-slate-200 hover:text-slate-300'>
                                                        {link.name}
                                                    </a>
                                                ) : (
                                                    <div className='text-sm text-slate-200'>{link.name}</div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className='bg-primary w-full'>
                <div className='container flex flex-col items-center justify-between gap-4 px-4 py-5 md:flex-row md:px-6 xl:px-0'>
                    <p className='text-center text-sm text-white md:text-start'>
                        Copyright © {new Date().getFullYear()} by International NGO Forum on Indonesian Development –
                        INFID
                    </p>

                    <button
                        type='button'
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className='flex cursor-pointer items-center gap-1 text-sm text-white transition hover:opacity-80'
                        aria-label='Kembali ke atas'>
                        <span>Kembali ke Atas</span>
                        <ChevronUp size={20} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
