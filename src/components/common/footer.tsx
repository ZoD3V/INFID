'use client';

import { useState } from 'react';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ArrowRight, ChevronUp, Loader2, MailIcon, PhoneCall } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { toast } from 'sonner';

const Footer = () => {
    const pathname = usePathname();
    const t = useTranslations('footer');
    const b = useTranslations('button');
    const p = useTranslations('placeholder');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const footerLinks = {
        about: [
            { name: t('links.structure'), href: '/about/profile-infid' },
            // { name: 'INFID Research Fellow', href: '/program-kami/umkm' },
            { name: t('links.members'), href: '/about/member-infid' },
            { name: t('links.partners'), href: '/about/partner' }
        ],
        advocacy: [
            { name: t('links.articles'), href: '/knowledge?category=Artikel' },
            { name: t('links.research'), href: '/knowledge?category=Riset' },
            { name: t('links.policy'), href: '/knowledge?category=Kertas+Kebijakan' },
            {
                name: t('links.modules'),
                href: '/knowledge?category=Modul+%26+Panduan'
            }
        ]
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
        const LIST_ID = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;
        const DATACENTER = process.env.NEXT_PUBLIC_MAILCHIMP_DATACENTER;

        try {
            const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`user:${API_KEY}`)}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed'
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Success subscribe!');
                setEmail('');
            } else {
                console.error('Mailchimp Error:', data);
            }
        } catch (err) {
            console.error('Network Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className='bg-primary-500'>
            <div
                className={cn(
                    'container px-4 py-16 md:px-6 xl:px-0',
                    ['/', '/about/member-infid'].includes(pathname) && 'lg:pt-45'
                )}>
                <div className='border-primary-400 grid grid-cols-1 gap-8 border-b pb-9 md:grid-cols-2 lg:grid-cols-12 lg:gap-12'>
                    {/* Brand Column */}
                    <div className='lg:col-span-5'>
                        <div className='mb-6 flex items-center gap-2'>
                            <img
                                width={100}
                                height={100}
                                src='/logo/logo-footer.png'
                                alt='Logo'
                                className='h-10 w-38'
                            />
                        </div>

                        <p className='mb-6 text-sm font-normal text-slate-200'>{t('description')}</p>

                        <div className='flex gap-4'>
                            <a
                                href='https://www.instagram.com/infid_id/'
                                aria-label='Instagram'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaInstagram className='text-2xl' />
                            </a>

                            <a
                                href='https://www.linkedin.com/company/infid/'
                                aria-label='Linkedin'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaLinkedin className='text-xl' />
                            </a>

                            <a
                                href='https://www.youtube.com/@INFIDJakarta'
                                aria-label='Youtube'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaYoutube className='text-xl' />
                            </a>
                            <a
                                href='https://www.facebook.com/infid'
                                aria-label='Facebook'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <FaFacebook className='text-xl' />
                            </a>
                            <a
                                href='https://x.com/infid_ID'
                                aria-label='X'
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center justify-center text-white transition-transform hover:scale-110'>
                                <BsTwitterX className='text-xl' />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className='lg:col-span-7'>
                        <div className='grid grid-cols-2 gap-8 lg:flex'>
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category} className='lg:w-1/2'>
                                    <h6 className='mb-4 text-base font-bold text-white'>{t(`sections.${category}`)}</h6>

                                    <ul className='flex flex-col gap-4'>
                                        {links.map((link, index) => (
                                            <li key={index} className='flex items-start gap-2'>
                                                {link.name === 'whatsapp' ? (
                                                    <Link
                                                        href={link.href}
                                                        className='flex items-center gap-1 text-sm text-slate-200 hover:text-slate-300'>
                                                        <BsWhatsapp />
                                                        081288881951
                                                    </Link>
                                                ) : link.href !== '' ? (
                                                    <Link
                                                        href={link.href}
                                                        className='text-sm text-slate-200 hover:text-slate-300'>
                                                        {link.name}
                                                    </Link>
                                                ) : (
                                                    <div className='text-sm text-slate-200'>{link.name}</div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className='col-span-2 flex w-full flex-col gap-4 lg:col-span-1 lg:w-fit'>
                                <div className='flex flex-col gap-4'>
                                    <h6 className='text-base font-bold text-white'>{t('sections.newsletter')}</h6>
                                    <p className='text-sm font-normal text-slate-200'>{t('newsletter.description')}</p>
                                </div>

                                <form className='flex w-full max-w-sm flex-col items-center gap-4' onSubmit={onSubmit}>
                                    <Input
                                        type='email'
                                        placeholder={p('insertEmail')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='rounded-full border-gray-400 bg-white/10 text-sm text-white placeholder:text-slate-400 focus-visible:ring-slate-400'
                                    />
                                    <Button
                                        type='submit'
                                        variant='secondary'
                                        className='w-full rounded-full transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none'
                                        disabled={isLoading}>
                                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : b('subscribe')}
                                        {!isLoading && <ArrowRight className='ml-2 h-4 w-4' />}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-end'>
                    <div className='flex flex-col gap-2 pt-8'>
                        <h6 className='text-base font-bold text-white'>{t('contact.title')}</h6>
                        <p className='text-sm font-normal text-slate-200'>
                            Jl. Jatipadang Raya Kav.3 No.105, Pasar Minggu, Jakarta Selatan, 12540, Indonesia
                        </p>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2 text-sm text-white'>
                                <MailIcon className='h-4 w-4' />
                                office@infid.org
                            </div>
                            <div className='flex items-center gap-2 text-sm text-white'>
                                <PhoneCall className='h-4 w-4' />
                                021-7819734
                            </div>
                        </div>
                    </div>
                    <button
                        type='button'
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className='flex cursor-pointer items-center gap-1 text-white transition hover:opacity-80'
                        aria-label={t('backToTop')}>
                        <p className='text-sm font-semibold'>{t('backToTop')}</p>
                        <ChevronUp size={20} />
                    </button>
                </div>
            </div>

            {/* Copyright */}
            <div className='bg-primary-600 w-full'>
                <div className='container flex flex-col items-center justify-between gap-4 px-4 py-5 md:flex-row md:px-6 xl:px-0'>
                    <p className='text-center text-sm text-white md:text-start'>
                        Copyright © {new Date().getFullYear()} by International NGO Forum on Indonesian Development –
                        INFID
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
