'use client';

import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';

import { ChevronDown, ChevronRight, ExternalLink, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Navbar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = React.useState(false);
    const t = useTranslations('Navbar');
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { title: t('home'), href: '/' },
        {
            title: t('about'),
            href: '',
            children: [
                { title: t('about_profile'), href: '/about/infid' },
                { title: t('about_structure'), href: '/about/structure-organization' },
                { title: t('about_member'), href: '/about/member-infid' },
                { title: t('about_mitra'), href: '/about/mitra-infid' }
            ]
        },
        {
            title: t('involved'),
            href: '',
            children: [
                { title: t('involved_career'), href: '/involved/karrer' },
                { title: t('involved_member'), href: '/involved/become-member' }
            ]
        },
        {
            title: t('knowledge'),
            href: '',
            children: [
                { title: t('knowledge_research'), href: '/knowledge/research' },
                { title: t('knowledge_policy'), href: '/knowledge/terms-condition' },
                { title: t('knowledge_module'), href: '/knowledge/module' },
                { title: t('knowledge_infographic'), href: '/knowledge/infografis' },
                { title: t('knowledge_article'), href: '/knowledge/article' }
            ]
        },
        {
            title: t('news'),
            href: '',
            children: [
                { title: t('news_activity'), href: '/news/activity' },
                { title: t('news_story'), href: '/news/story' },
                { title: t('news_press'), href: '/news/broadcast' },
                { title: t('news_report'), href: '/news/report-yearly' }
            ]
        },
        { title: t('contact'), href: '/contact-us' }
    ];

    React.useEffect(() => {
        if (!isMobile && isOpen) {
            setIsOpen(false);
        }
    }, [isMobile, isOpen]);

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                isScrolled ? 'bg-white shadow' : 'bg-transparent'
            )}>
            {' '}
            <nav className='container flex h-16 items-center justify-between'>
                {/* Logo/Brand */}
                <Link href='/' className='text-2xl font-bold text-gray-900'>
                    <Image
                        src={isScrolled ? '/logo/logo-infid-black.png' : '/logo/logo.png'}
                        loading='eager'
                        alt=''
                        width={100}
                        height={100}
                        className='h-8 w-19.75'
                    />
                </Link>

                {/* Desktop Navigation (Hidden on mobile) */}
                {!isMobile && (
                    <div
                        className={cn(
                            'flex items-center space-x-6 rounded-full transition-all duration-300',
                            isScrolled ? '' : 'border border-white/10 px-4 py-3 shadow-sm backdrop-blur-sm'
                        )}>
                        {navItems.map((item) => (
                            <div key={item.title} className='group relative'>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors duration-300',
                                        isScrolled
                                            ? 'hover:text-brand-600 text-slate-900'
                                            : 'text-brand-100 hover:text-white',

                                        pathname === item.href ? 'font-extrabold' : ''
                                    )}>
                                    {item.title}
                                    {item.children && (
                                        <ChevronDown
                                            className={cn(
                                                'h-4 w-4 transition-transform duration-400 group-hover:rotate-180',
                                                // Pastikan icon chevron juga mengikuti warna teks
                                                isScrolled ? 'text-slate-900' : 'text-brand-100'
                                            )}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown Desktop */}
                                {item.children && (
                                    <div className='invisible absolute top-full left-1/2 w-48 -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100'>
                                        <div className='relative overflow-hidden rounded-lg border border-gray-100 bg-white py-2 shadow-2xl'>
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.title}
                                                    href={child.href}
                                                    className={cn(
                                                        'block px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200',
                                                        pathname === child.href
                                                            ? 'bg-brand-50 text-brand-900 font-semibold'
                                                            : 'hover:text-brand-600 hover:bg-gray-50'
                                                    )}>
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <div className='flex items-center gap-2'>
                    <Button variant='secondary' className='hidden rounded-full font-semibold lg:block'>
                        Bergabung
                    </Button>

                    {/* Mobile Sidebar */}
                    {isMobile && (
                        <div className='lg:hidden'>
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant='outline' size='icon'>
                                        <Menu className='h-6 w-6' />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side='left' className='flex w-75 flex-col p-0'>
                                    {/* Header Sidebar Logo */}
                                    <SheetHeader className='border-b text-left'>
                                        <SheetTitle className='flex items-center gap-2'>
                                            <Image src='/logo/logo-infid-black.png' alt='Logo' width={70} height={70} />
                                        </SheetTitle>
                                        <SheetDescription></SheetDescription>
                                    </SheetHeader>

                                    {/* Area Scrollable Navigasi */}
                                    <div className='flex-1 overflow-y-auto px-4 py-2'>
                                        <Accordion type='single' collapsible className='w-full'>
                                            {navItems.map((item) => (
                                                <AccordionItem
                                                    value={item.title}
                                                    key={item.title}
                                                    className='border-none'>
                                                    {item.children ? (
                                                        <>
                                                            <AccordionTrigger className='flex w-full cursor-pointer items-center justify-between gap-3 py-2 text-start text-sm text-black hover:no-underline [&[data-state=open]>svg]:rotate-90'>
                                                                {item.title}
                                                                {item.children && (
                                                                    <ChevronRight className='h-4 w-4 transition-transform' />
                                                                )}
                                                            </AccordionTrigger>
                                                            <AccordionContent className='flex flex-col gap-1 border-l py-1 pl-3'>
                                                                {item.children.map((child) => (
                                                                    <Link
                                                                        key={child.title}
                                                                        href={child.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className={cn(
                                                                            'rounded-md px-3 py-1 text-sm transition-colors hover:bg-gray-100',
                                                                            pathname === child.href
                                                                                ? 'font-semibold'
                                                                                : ''
                                                                        )}>
                                                                        {child.title}
                                                                    </Link>
                                                                ))}
                                                            </AccordionContent>
                                                        </>
                                                    ) : (
                                                        <Link
                                                            href={item.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className={cn(
                                                                'block py-2 text-sm text-black transition-colors',
                                                                pathname === item.href ? 'font-semibold' : ''
                                                            )}>
                                                            {item.title}
                                                        </Link>
                                                    )}
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>

                                    {/* Footer Sidebar */}
                                    <div className='border-t p-5'>
                                        <Button className='w-full gap-2'>
                                            Bergabung <ExternalLink className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
