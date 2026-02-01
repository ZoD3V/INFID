import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Search } from 'lucide-react';

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            setIsLoading(true);
            if (keyword.trim()) {
                setIsLoading(true);

                // axios
                //     .get('/api/search', { params: { keyword } })
                //     .then((res) => setResults(res.data.results))
                //     .finally(() => setIsLoading(false));
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword, isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === '/' && !isOpen) {
                event.preventDefault();
                setIsOpen(true);
            }
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Fungsi highlight keyword
    const highlightText = (text: any, highlight: any) => {
        if (!text) return '';
        if (!highlight) return text;

        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.split(regex).map((part: any, i: any) => (regex.test(part) ? <mark key={i}>{part}</mark> : part));
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <div className='text-center'>
                <Dialog.Trigger asChild>
                    <button
                        type='button'
                        className='border-secondary-300 text-secondary-300 hover:border-secondary-400 hover:bg-secondary-300 focus-visible:border-secondary-100 focus-visible:ring-secondary-300 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 hover:text-white focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none'>
                        <Search className='h-4 w-4' />
                    </button>
                </Dialog.Trigger>
            </div>
            <Dialog.Portal>
                <Dialog.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50' />
                <Dialog.Content className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-lg duration-200'>
                    <VisuallyHidden.Root>
                        <Dialog.Title>Search</Dialog.Title>
                        <Dialog.Description>Start typing to search the documentation</Dialog.Description>
                    </VisuallyHidden.Root>
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
                            />
                            <span className='mr-4 cursor-default rounded-md border border-slate-300 px-1 py-[0.10px] text-sm text-gray-500'>
                                esc
                            </span>
                        </div>
                    </form>
                    <ScrollArea.Root className='max-h-[calc(85vh-44px)]'>
                        <ScrollArea.Viewport className='h-full w-full'>
                            <div className='space-y-4 px-2 py-4'>
                                <div>
                                    <div className='mb-2 px-2 text-xs font-semibold text-gray-400 uppercase'>
                                        Suggestions
                                    </div>
                                    {/* {results.length > 0 && (
                                        <ul>
                                            {results.map((product) => (
                                                <li key={product.id}>
                                                    <a
                                                        className='flex items-center rounded-lg px-2 py-1 text-sm leading-6 text-slate-700 outline-none focus-within:bg-slate-100 hover:bg-slate-100'
                                                        href={'/product/' + product.id}>
                                                        <svg
                                                            className='mr-3 h-3 w-3 shrink-0 fill-slate-400'
                                                            width='12'
                                                            height='12'
                                                            viewBox='0 0 12 12'>
                                                            <path d='M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z' />
                                                        </svg>
                                                        <span>{highlightText(product.name, keyword)}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )} */}

                                    {keyword.length == 0 && results.length == 0 && (
                                        <p className='mx-4 mt-2 py-10 text-center text-gray-500'>No recent searches</p>
                                    )}

                                    {keyword && !isLoading && results.length === 0 && (
                                        <p className='mx-4 mt-2 py-10 text-center text-gray-500'>No results</p>
                                    )}
                                    {/* <ul>
                                        <li>
                                            <a
                                                className="flex items-center rounded-lg px-2 py-1 text-sm leading-6 text-slate-700 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
                                                href="#0"
                                            >
                                                <svg
                                                    className="mr-3 h-3 w-3 shrink-0 fill-slate-400"
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                >
                                                    <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                                                </svg>
                                                <span>Flexbox and Grid</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center rounded-lg px-2 py-1 text-sm leading-6 text-slate-700 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
                                                href="#0"
                                            >
                                                <svg
                                                    className="mr-3 h-3 w-3 shrink-0 fill-slate-400"
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                >
                                                    <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                                                </svg>
                                                <span>API Reference</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center rounded-lg px-2 py-1 text-sm leading-6 text-slate-700 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
                                                href="#0"
                                            >
                                                <svg
                                                    className="mr-3 h-3 w-3 shrink-0 fill-slate-400"
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                >
                                                    <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                                                </svg>
                                                <span>Authentication</span>
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                            className='flex h-full w-2 touch-none border-l border-l-transparent p-px transition-colors select-none'
                            orientation='vertical'>
                            <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Scrollbar
                            className='flex h-2.5 touch-none flex-col border-t border-t-transparent p-px transition-colors select-none'
                            orientation='horizontal'>
                            <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner className='bg-blackA5' />
                    </ScrollArea.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
