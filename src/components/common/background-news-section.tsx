import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { Search } from 'lucide-react';

export interface PageHeaderSearchProps {
    badge?: string;
    title: string;
    endTitle: string;
    highlight?: string;
    description?: string;
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
    defaultValue?: string;
}

export const PageHeaderSearch: React.FC<PageHeaderSearchProps> = ({
    badge = 'Berita Terhangat',
    title,
    endTitle,
    highlight,
    description,
    placeholder = 'Cari topik, judul atau kata kunci',
    onSearch,
    className
}) => {
    const [value, setValue] = React.useState('');

    return (
        <section
            className={cn('bg-primary-500 relative pt-24 pb-12 md:pt-26 md:pb-16', className)}
            style={{
                backgroundImage: "url('/images/bg-pattern.png')"
            }}>
            <div className='relative container flex flex-col items-center text-center'>
                {/* Badge */}
                {badge && (
                    <div className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-transparent px-3 py-2 uppercase backdrop-blur-sm'>
                        <span className='h-2 w-2 animate-pulse rounded-full bg-orange-500'></span>
                        <p className='text-xs font-medium tracking-wider text-white'>{badge}</p>
                    </div>
                )}

                {/* Title */}
                <h1 className='mt-4 max-w-xl text-4xl leading-tight font-bold tracking-tight text-white lg:text-5xl'>
                    {title} {highlight && <span className='text-secondary-300'>{highlight}</span>} {endTitle}
                </h1>

                {/* Description */}
                {description && (
                    <p className='mx-auto mt-4 max-w-xl text-sm tracking-wider text-white md:text-base'>
                        {description}
                    </p>
                )}

                {/* Search Form */}
                <form
                    role='search'
                    aria-label='Sitewide search'
                    className='w-full'
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSearch?.(value);
                    }}>
                    <div className='group mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-full border border-gray-400 bg-white/10 p-1.5 backdrop-blur-sm transition-all focus-within:border-white focus-within:ring-2 focus-within:ring-white'>
                        <div className='flex flex-1 items-center gap-2 pl-3'>
                            <Search className='h-5 w-5 text-white' aria-hidden='true' />
                            <Input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={placeholder}
                                aria-label={placeholder}
                                className='rounded-full border-none bg-transparent text-sm text-white shadow-none placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0'
                            />
                        </div>

                        <Button
                            type='submit'
                            variant='secondary'
                            aria-label='Submit search'
                            className='focus-visible:ring-offset-primary-500 rounded-full px-6 transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none'>
                            Cari
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
