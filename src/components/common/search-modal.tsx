import { useEffect, useMemo, useState } from 'react';

import { useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { GlobalSearch } from '@/types/global-search';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('navigation');

    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<GlobalSearch | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const locale = useLocale();
    const router = useRouter();

    const navItems = [
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
            children: []
        },
        {
            title: t('news'),
            href: '/news-from-us',
            children: []
        },
        {
            title: t('involved'),
            href: '',
            children: [{ title: t('involved_career'), href: '/involved/career' }]
        },
        { title: t('contact'), href: '/contact-us' }
    ];

    const filteredNavItems = useMemo(() => {
        if (!keyword.trim()) return navItems;

        const searchLower = keyword.toLowerCase();

        return navItems
            .map((group) => {
                const matchedChildren =
                    group.children?.filter((child) => child.title.toLowerCase().includes(searchLower)) || [];

                const isGroupMatched = group.title.toLowerCase().includes(searchLower);

                if (isGroupMatched || matchedChildren.length > 0) {
                    return {
                        ...group,

                        children: matchedChildren.length > 0 ? matchedChildren : group.children
                    };
                }
                return null;
            })
            .filter(Boolean);
    }, [keyword, navItems]);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(async () => {
            if (keyword.trim() && keyword.trim().length > 4) {
                setIsLoading(true);

                try {
                    const res = await apiRequest.get<GlobalSearch>(API_ENDPOINTS.globalSearch, {
                        params: {
                            limit: '',
                            search: keyword
                        }
                    });
                    setResults(res.data ?? null);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults(null);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setKeyword('');
            setResults(null);
            setIsLoading(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleNavigate = (type: 'post' | 'job' | 'people' | 'partners' | 'members', data: any) => {
        switch (type) {
            case 'post': {
                const postTrans =
                    data.translations?.find((t: any) => t.language === locale) ||
                    data.translations?.find((t: any) => t.language === 'id') ||
                    data.translations?.[0];

                const slug = postTrans?.slug || '';
                router.push(`/news-from-us/${data.id}-${slug}`);
                break;
            }
            case 'job':
                router.push(`/involved/career`);
                break;
            case 'people':
                if (data.type === 'historical') {
                    router.push(`/about/profile-infid`);
                } else if (data.type === 'organization') {
                    router.push(`/about/structure-organization`);
                } else if (data.type === 'research_fellow') {
                    router.push(`/about/research`);
                } else {
                    router.push(`/about/profile-infid`);
                }
                break;
            case 'partners':
                router.push(`/about/partner`);
                break;
            case 'members':
                router.push(`/about/member-infid`);
                break;
        }
        setIsOpen(false);
    };

    const highlightText = (text: string, highlight: string) => {
        if (!text) return '';
        if (!highlight) return text;

        const regex = new RegExp(`(${highlight})`, 'gi');

        return text
            .split(regex)
            .map((part, i) => (part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : part));
    };

    const peopleList = results?.people
        ? [
              ...(results.people.organization || []),
              ...(results.people.research_fellow || []),
              ...(results.people.historical || [])
          ]
        : [];

    const posts = results?.posts ?? [];
    const jobs = results?.jobs ?? [];
    const partners = results?.partners ?? [];
    const members = results?.members ?? [];

    const isEmpty =
        posts.length === 0 &&
        jobs.length === 0 &&
        peopleList.length === 0 &&
        partners.length === 0 &&
        members.length === 0 &&
        filteredNavItems.length === 0;

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <button
                    type='button'
                    aria-labelledby='Open search popup'
                    aria-haspopup='dialog'
                    aria-expanded={isOpen}
                    className='border-secondary-300 text-secondary-300 hover:bg-secondary-300 focus-visible:border-secondary-100 focus-visible:ring-secondary-300 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'>
                    <Search className='h-4 w-4' aria-hidden='true' />

                    <span className='sr-only'>{locale == 'id' ? 'Buka dialog pencarian' : 'Open search dialog'}</span>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50' />
                <Dialog.Content className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-lg duration-200 focus:outline-none'>
                    <Dialog.Title asChild>
                        <VisuallyHidden.Root>{locale == 'id' ? 'Cari' : 'Search'}</VisuallyHidden.Root>
                    </Dialog.Title>
                    <Dialog.Description asChild>
                        <VisuallyHidden.Root>
                            {locale == 'id'
                                ? 'Ketikkan query pencarian Anda di bawah ini untuk menemukan artikel atau informasi.'
                                : 'Type your search query below to find articles or information.'}
                        </VisuallyHidden.Root>
                    </Dialog.Description>
                    <form className='border-b border-slate-200'>
                        <div className='relative flex items-center'>
                            <svg
                                className='ml-4 h-4 w-4 shrink-0 fill-slate-500'
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path d='m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z' />
                            </svg>
                            <input
                                id='search-modal'
                                className='[&::-webkit-search-decoration]:none [&::-webkit-search-results-button]:none [&::-webkit-search-results-decoration]:none w-full appearance-none border-0 bg-white py-3 pr-4 pl-2 text-sm placeholder-slate-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden'
                                type='search'
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder='Search'
                                autoFocus
                            />
                            <span
                                className='mr-4 cursor-default rounded-md border border-slate-300 px-1 py-[0.10px] text-sm text-gray-500'
                                aria-hidden='true'>
                                esc
                            </span>
                        </div>
                    </form>
                    <ScrollArea.Root className='max-h-[60vh] overflow-y-auto'>
                        <ScrollArea.Viewport className='h-full w-full pr-2' role='listbox' aria-label='Search results'>
                            <div className='space-y-4 px-2 py-4'>
                                {/* --- LOADING STATE --- */}
                                {isLoading && (
                                    <div
                                        className='flex flex-col items-center justify-center py-20 text-slate-500'
                                        role='status'
                                        aria-live='polite'>
                                        <div className='flex items-baseline gap-1 text-slate-500'>
                                            <p className='text-base font-medium'>Loading</p>
                                            <div
                                                className='loading-dots flex gap-0.5 text-xl leading-none font-bold'
                                                aria-hidden='true'>
                                                <span>.</span>
                                                <span>.</span>
                                                <span>.</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isLoading && filteredNavItems.length > 0 && (
                                    <section>
                                        <div className='sticky top-0 z-10 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                            Pages
                                        </div>

                                        <ul role='listbox' className='mt-1'>
                                            {filteredNavItems.map((group, idx) => {
                                                const renderButton = (title: string, href: string, key: string) => (
                                                    <li key={key} role='none'>
                                                        <button
                                                            type='button'
                                                            role='option'
                                                            aria-selected='false'
                                                            onClick={() => {
                                                                router.push(href);
                                                                setIsOpen(false);
                                                            }}
                                                            className='flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-left text-sm text-slate-700 transition-colors select-none hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                            <span className='line-clamp-1'>
                                                                {highlightText(title, keyword)}
                                                            </span>
                                                        </button>
                                                    </li>
                                                );

                                                if (group?.children && group.children.length > 0) {
                                                    return group.children.map((child, cIdx) =>
                                                        renderButton(
                                                            child.title,
                                                            child.href,
                                                            `nav-child-${idx}-${cIdx}`
                                                        )
                                                    );
                                                }

                                                if (group?.href) {
                                                    return renderButton(group.title, group.href, `nav-group-${idx}`);
                                                }

                                                return null;
                                            })}
                                        </ul>
                                    </section>
                                )}

                                {/* --- API RESULTS --- */}
                                {!isLoading && keyword.length > 3 && (
                                    <div className='space-y-4' role='group' aria-label='Search Results'>
                                        {/* --- POSTS --- */}
                                        {posts.length > 0 && (
                                            <section aria-labelledby='section-posts'>
                                                <div
                                                    id='section-posts'
                                                    className='sticky top-0 z-10 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    Posts
                                                </div>
                                                <ul role='listbox' className='mt-1'>
                                                    {posts.map((post) => {
                                                        const postTrans =
                                                            post.translations?.find((t) => t.language === locale) ||
                                                            post.translations?.find((t) => t.language === 'id') ||
                                                            post.translations?.[0];
                                                        const title = postTrans?.title || '';
                                                        return (
                                                            <li key={`post-${post.id}`} role='none'>
                                                                <button
                                                                    type='button'
                                                                    role='option'
                                                                    aria-selected='false'
                                                                    onClick={() => handleNavigate('post', post)}
                                                                    className='flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-left text-sm text-slate-700 transition-colors select-none hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                                    <span className='line-clamp-1'>
                                                                        {highlightText(title, keyword)}
                                                                    </span>
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </section>
                                        )}

                                        {/* --- PEOPLE --- */}
                                        {peopleList.length > 0 && (
                                            <section aria-labelledby='section-people'>
                                                <div
                                                    id='section-people'
                                                    className='sticky top-0 z-10 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    People
                                                </div>
                                                <ul role='listbox' className='mt-1'>
                                                    {peopleList.map((person) => (
                                                        <li key={`person-${person.id}`} role='none'>
                                                            <button
                                                                type='button'
                                                                role='option'
                                                                aria-selected='false'
                                                                onClick={() => handleNavigate('people', person)}
                                                                className='flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-left text-sm text-slate-700 transition-colors select-none hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                                <div className='flex flex-col'>
                                                                    <span className='line-clamp-1 font-medium'>
                                                                        {highlightText(person.name, keyword)}
                                                                    </span>
                                                                    <span className='text-xs text-slate-400'>
                                                                        {person.occupation}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}

                                        {/* --- PARTNERS --- */}
                                        {partners.length > 0 && (
                                            <section aria-labelledby='section-partners'>
                                                <div
                                                    id='section-partners'
                                                    className='sticky top-0 z-10 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    Partners
                                                </div>
                                                <ul role='listbox' className='mt-1'>
                                                    {partners.map((p) => (
                                                        <li key={`partner-${p.id}`} role='none'>
                                                            <button
                                                                type='button'
                                                                role='option'
                                                                aria-selected='false'
                                                                onClick={() => handleNavigate('partners', p)}
                                                                className='flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-left text-sm text-slate-700 transition-colors select-none hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                                <span className='line-clamp-1'>
                                                                    {highlightText(p.name, keyword)}
                                                                </span>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}

                                        {/* --- MEMBERS --- */}
                                        {members.length > 0 && (
                                            <section aria-labelledby='section-members'>
                                                <div
                                                    id='section-members'
                                                    className='sticky top-0 z-10 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    Members
                                                </div>
                                                <ul role='listbox' className='mt-1'>
                                                    {members.map((m) => (
                                                        <li key={`member-${m.id}`} role='none'>
                                                            <button
                                                                type='button'
                                                                role='option'
                                                                aria-selected='false'
                                                                onClick={() => handleNavigate('members', m)}
                                                                className='flex w-full cursor-pointer items-center rounded-lg px-2 py-2 text-left text-sm text-slate-700 transition-colors select-none hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                                <div className='flex flex-col'>
                                                                    <span className='line-clamp-1'>
                                                                        {highlightText(m.name, keyword)}
                                                                    </span>
                                                                    <span className='text-xs text-slate-400'>
                                                                        {m.region}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}
                                    </div>
                                )}

                                {keyword && !isLoading && isEmpty && (
                                    <p
                                        className='mx-4 mt-2 py-10 text-center text-gray-500'
                                        role='status'
                                        aria-live='polite'>
                                        No results for "{keyword}"
                                    </p>
                                )}
                            </div>
                        </ScrollArea.Viewport>
                    </ScrollArea.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
