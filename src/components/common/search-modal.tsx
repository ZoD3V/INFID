import { useEffect, useState } from 'react';

import { useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { GlobalSearch } from '@/types/global-search';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Search } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<GlobalSearch | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const locale = useLocale();
    const router = useRouter();

    const [langIndex, setLangIndex] = useState(0);

    useEffect(() => {
        setLangIndex(locale === 'id' ? 0 : 1);
    }, [locale]);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(async () => {
            if (keyword.trim() && keyword.trim().length > 3) {
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

    const handleNavigate = (type: 'post' | 'job' | 'people', data: any) => {
        switch (type) {
            case 'post':
                router.push(`/news-from-us/${data.id}-${data.translations[0]?.slug}`);
                break;
            case 'job':
                router.push(`/involved/career`);
                break;
            case 'people':
                router.push(`/about/profile-infid`);
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

    const posts = results?.posts ?? [];
    const jobs = results?.jobs ?? [];
    const people = results?.people ?? [];

    const isEmpty = posts.length === 0 && jobs.length === 0 && people.length === 0;

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <div className='text-center'>
                <Dialog.Trigger asChild>
                    <button
                        type='button'
                        aria-label='Open search'
                        className='border-secondary-300 text-secondary-300 hover:bg-secondary-300 focus-visible:border-secondary-100 focus-visible:ring-secondary-300 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'>
                        <Search className='h-4 w-4' aria-hidden='true' />
                    </button>
                </Dialog.Trigger>
            </div>
            <Dialog.Portal>
                <Dialog.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50' />
                <Dialog.Content
                    className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-lg duration-200'
                    aria-describedby='search-description'>
                    <VisuallyHidden.Root>
                        <Dialog.Title>Search</Dialog.Title>
                        <Dialog.Description>Start typing to search the documentation</Dialog.Description>
                    </VisuallyHidden.Root>
                    <p id='search-description' className='sr-only'>
                        Type your search query below to find articles or information.
                    </p>
                    <form className='border-b border-slate-200'>
                        <div className='flex items-center'>
                            <VisuallyHidden.Root>
                                <label htmlFor='search-modal'>Search</label>
                            </VisuallyHidden.Root>
                            <svg
                                className='ml-4 h-4 w-4 shrink-0 fill-slate-500'
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
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
                            <span className='mr-4 cursor-default rounded-md border border-slate-300 px-1 py-[0.10px] text-sm text-gray-500'>
                                esc
                            </span>
                        </div>
                    </form>
                    <ScrollArea.Root className='max-h-[60vh] overflow-y-auto'>
                        <ScrollArea.Viewport className='h-full w-full pr-2' role='listbox' aria-label='Search results'>
                            <div className='space-y-4 px-2 py-4'>
                                {/* RESULTS */}
                                {(posts.length > 0 || jobs.length > 0 || people.length > 0) && (
                                    <div className='space-y-4'>
                                        {/* POSTS */}
                                        {posts.length > 0 && (
                                            <section aria-labelledby='section-posts'>
                                                <div
                                                    id='section-posts'
                                                    className='sticky top-0 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    Posts
                                                </div>

                                                <ul role='group' aria-label='Post results'>
                                                    {posts.map((post) => {
                                                        const title =
                                                            post?.translations?.find((t) => t.language === locale)
                                                                ?.title ||
                                                            post?.translations?.find((t) => t.language === 'id')
                                                                ?.title ||
                                                            post?.translations?.[0].title;

                                                        return (
                                                            <li key={`post-${post.id}`}>
                                                                <button
                                                                    type='button'
                                                                    role='option'
                                                                    aria-label={`Open post: ${title}`}
                                                                    onClick={() => handleNavigate('post', post)}
                                                                    className='flex w-full items-center rounded-lg px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
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

                                        {/* JOBS */}
                                        {jobs.length > 0 && (
                                            <section aria-labelledby='section-jobs'>
                                                <div
                                                    id='section-jobs'
                                                    className='sticky top-0 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    Jobs
                                                </div>

                                                <ul role='group' aria-label='Job results'>
                                                    {jobs.map((job) => (
                                                        <li key={`job-${job.id}`}>
                                                            <button
                                                                type='button'
                                                                role='option'
                                                                aria-label={`Open job: ${job.title}`}
                                                                onClick={() => handleNavigate('job', job)}
                                                                className='flex w-full items-center rounded-lg px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                                <span className='line-clamp-1'>
                                                                    {highlightText(job.title, keyword)}
                                                                </span>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}

                                        {/* PEOPLE */}
                                        {people.length > 0 && (
                                            <section aria-labelledby='section-people'>
                                                <div
                                                    id='section-people'
                                                    className='sticky top-0 bg-white px-2 py-1 text-xs font-semibold text-gray-400 uppercase'>
                                                    People
                                                </div>

                                                <ul role='group' aria-label='People results'>
                                                    {people.map((person) => (
                                                        <li key={`person-${person.id}`}>
                                                            <button
                                                                type='button'
                                                                role='option'
                                                                aria-label={`Open profile: ${person.name}`}
                                                                onClick={() => handleNavigate('people', person)}
                                                                className='flex w-full items-center rounded-lg px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'>
                                                                <span className='line-clamp-1'>
                                                                    {highlightText(person.name, keyword)}
                                                                </span>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}
                                    </div>
                                )}

                                {/* EMPTY STATES */}
                                {keyword.length === 0 && isEmpty && (
                                    <p className='mx-4 mt-2 py-10 text-center text-gray-500' role='status'>
                                        No recent searches
                                    </p>
                                )}

                                {keyword && !isLoading && isEmpty && (
                                    <p className='mx-4 mt-2 py-10 text-center text-gray-500' role='status'>
                                        No results
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
