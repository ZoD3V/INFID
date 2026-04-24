'use client';

import React from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCategories } from '@/context/category-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { cn } from '@/lib/utils';
import { allowedKnowledgeCategories, allowedNewsCategories } from '@/types/categories';
import { Category } from '@/types/posts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';

import LanguageSwitcher from './language-switcher';
import SearchModal from './search-modal';
import { ChevronDown, ChevronRight, ExternalLink, Menu } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export function Navbar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const locale = useLocale();
    const [isOpen, setIsOpen] = React.useState(false);
    const t = useTranslations('navigation');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { categories } = useCategories();

    const createCategoryHref = (basePath: string, categoryName: string) => {
        const params = new URLSearchParams();
        params.set('category', categoryName);
        return `${basePath}?${params.toString()}`;
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { title: t('home'), href: '/' },
        {
            title: t('about'),
            href: '',
            children: [
                { title: t('about_profile'), href: '/about/profile-infid' },
                { title: t('about_structure'), href: '/about/structure-organization' },
                { title: t('about_member'), href: '/about/member-infid' },
                { title: t('about_research'), href: '/about/research' },
                { title: t('about_mitra'), href: '/about/partner' }
            ]
        },
        {
            title: t('knowledge'),
            href: '/knowledge',
            children: categories
                .filter((cat) => {
                    const catName = cat.name?.find((t) => t.language === locale)?.text || cat.name?.[0]?.text;

                    return allowedKnowledgeCategories.some((c) => c.id === catName || c.en === catName);
                })
                .map((cat) => {
                    const translatedTitle = cat.name?.find((t) => t.language === locale)?.text || cat.name?.[0]?.text;

                    return {
                        title: translatedTitle,
                        href: createCategoryHref('/knowledge', translatedTitle)
                    };
                })
        },
        {
            title: t('news'),
            href: '/news-from-us',
            children: categories
                .filter((cat) => {
                    const catName = cat.name?.find((t) => t.language === locale)?.text || cat.name?.[0]?.text;

                    return allowedNewsCategories.some((c) => c.id === catName || c.en === catName);
                })
                .map((cat) => {
                    const translatedTitle = cat.name?.find((t) => t.language === locale)?.text || cat.name?.[0]?.text;

                    return {
                        title: translatedTitle,
                        href: createCategoryHref('/news-from-us', translatedTitle)
                    };
                })
        },
        {
            title: t('involved'),
            href: '',
            children: [
                { title: t('involved_career'), href: '/involved/career' }
                // { title: t('involved_member'), href: '/involved/become-member' }
            ]
        },
        { title: t('contact'), href: '/contact-us' }
    ];

    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');

    const isChildActive = (itemHref: string) => {
        const [targetPath, targetQuery] = itemHref.split('?');
        const targetParams = new URLSearchParams(targetQuery);
        const targetCategory = targetParams.get('category');

        const isPathMatch = pathname === targetPath;

        if (targetCategory) {
            return isPathMatch && currentCategory === targetCategory;
        }

        return isPathMatch && !currentCategory;
    };

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
            <nav className='container flex h-16 items-center justify-between'>
                {/* Logo/Brand */}
                <Link href='/' className='text-2xl font-bold text-gray-900'>
                    <Image
                        src={isScrolled ? '/logo/logo-infid-black.png' : '/logo/logo.png'}
                        loading='eager'
                        alt='Infid Logo'
                        width={100}
                        height={100}
                        className='h-8 w-19.75'
                    />
                </Link>

                {/* Desktop Navigation (Hidden on mobile) */}
                <nav
                    aria-label='Main Navigation'
                    className={cn(
                        'hidden items-center space-x-6 rounded-full xl:flex',
                        isScrolled ? '' : 'border border-white/10 px-4 py-3 shadow-sm backdrop-blur-sm'
                    )}>
                    {navItems.map((item) => (
                        <div key={item.title} className='group relative'>
                            <Link
                                href={item.href}
                                aria-label={item.title}
                                aria-current={pathname === item.href ? 'page' : undefined}
                                aria-haspopup={item.children ? 'true' : undefined}
                                className={cn(
                                    'flex cursor-pointer items-center gap-1 rounded-md text-sm font-medium transition-all duration-300 outline-none',

                                    isScrolled
                                        ? 'hover:text-primary-500 text-slate-900'
                                        : 'text-gray-100 hover:text-white',

                                    'focus-visible:text-primary-900 decoration-primary-500 underline-offset-4 focus-visible:bg-blue-100 focus-visible:underline',

                                    pathname === item.href ? 'font-extrabold' : ''
                                )}>
                                {item.title}
                                {item.children && (
                                    <ChevronDown
                                        aria-hidden='true'
                                        className={cn(
                                            'h-4 w-4 transition-transform duration-400 group-focus-within:rotate-180 group-hover:rotate-180',
                                            isScrolled ? 'text-slate-900' : 'text-brand-100'
                                        )}
                                    />
                                )}
                            </Link>

                            {/* Dropdown Desktop */}
                            {item.children && (
                                <div
                                    className={cn(
                                        'invisible absolute top-full left-1/2 w-48 -translate-x-1/2 pt-2 opacity-0 transition-all',
                                        'group-hover:visible group-hover:opacity-100',
                                        'group-focus-within:visible group-focus-within:opacity-100'
                                    )}>
                                    <div
                                        role='menu'
                                        aria-label={`Submenu ${item.title}`}
                                        className='relative overflow-hidden rounded-lg border border-gray-100 bg-white/95 py-2 shadow-2xl backdrop-blur-md'>
                                        {item.children.map((child) => {
                                            const active = isChildActive(child.href);

                                            return (
                                                <Link
                                                    key={child.title}
                                                    href={child.href}
                                                    role='menuitem'
                                                    className={cn(
                                                        'block px-4 py-2 text-sm font-medium transition-all duration-200 outline-none',

                                                        active
                                                            ? 'bg-brand-50 text-brand-900 font-bold'
                                                            : 'hover:text-primary-500 text-slate-700 hover:bg-gray-50',

                                                        'focus:text-primary-900 underline-offset-2 focus:bg-blue-100 focus:underline'
                                                    )}>
                                                    {child.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
                <div className='flex items-center gap-2'>
                    <LanguageSwitcher />
                    <SearchModal />

                    {/* Mobile Sidebar */}
                    {isMobile && (
                        <div className='xl:hidden'>
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='hover:text-primary-900 bg-white hover:bg-white'>
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
                                                            <AccordionTrigger className='hover:text-primary-500 flex w-full cursor-pointer items-center justify-between gap-3 py-2 text-start text-sm text-black hover:no-underline [&[data-state=open]>svg]:rotate-90'>
                                                                {item.title}
                                                                {item.children && (
                                                                    <ChevronRight className='h-4 w-4 transition-transform' />
                                                                )}
                                                            </AccordionTrigger>
                                                            <AccordionContent className='flex flex-col gap-1 border-l py-1 pl-3'>
                                                                {item.children.map((child) => {
                                                                    const active = isChildActive(child.href);
                                                                    return (
                                                                        <Link
                                                                            key={child.title}
                                                                            href={child.href}
                                                                            onClick={() => setIsOpen(false)}
                                                                            className={cn(
                                                                                'rounded-md px-3 py-1 text-sm transition-colors hover:bg-gray-100',
                                                                                active ? 'font-semibold' : ''
                                                                            )}>
                                                                            {child.title}
                                                                        </Link>
                                                                    );
                                                                })}
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
                                            {t('join')} <ExternalLink className='h-4 w-4' />
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
