import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';

export interface FilterOption {
    label: string;
    value: string;
}

interface ArticleFiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (value: string) => void;

    authors?: FilterOption[];
    selectedAuthor?: string;
    onAuthorChange?: (value: string) => void;

    years: string[];
    selectedYear: string;
    onYearChange: (value: string) => void;

    className?: string;
}

export function ArticleFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    authors,
    selectedAuthor,
    onAuthorChange,
    years,
    selectedYear,
    onYearChange,
    className
}: ArticleFiltersProps) {
    const t = useTranslations('news');

    return (
        <div
            className={cn(
                'ml-4 flex flex-col gap-4 md:justify-between lg:container lg:flex-row lg:items-center',
                className
            )}>
            <div
                className={cn(
                    'scrollbar-none flex items-center gap-2 overflow-x-auto px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                )}
                role='group'
                aria-label='Filter news by category'>
                {categories.map((item) => (
                    <Button
                        key={item}
                        size='sm'
                        aria-label={`Category ${item}`}
                        aria-pressed={selectedCategory === item}
                        className={cn(
                            'rounded-full transition-all focus-visible:outline-none',
                            'focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-inset',
                            selectedCategory === item
                                ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                : 'hover:bg-primary-500 border-none bg-slate-100 text-slate-600 shadow-none'
                        )}
                        variant={selectedCategory === item ? 'default' : 'outline'}
                        onClick={() => onCategoryChange(item)}>
                        {item}
                    </Button>
                ))}
            </div>
            <div className='flex flex-wrap gap-2'>
                {/* YEAR SELECT */}
                <Select value={selectedYear} onValueChange={onYearChange}>
                    <SelectTrigger
                        className='focus:ring-primary-500 w-37.5 focus:ring-2 focus:ring-offset-2'
                        aria-label='Select publication year'>
                        <SelectValue placeholder={t('content.year')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>{t('content.all_year')}</SelectItem>
                        {years.map((y) => (
                            <SelectItem key={y} value={y}>
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* AUTHOR SELECT */}
                {authors !== undefined && authors.length > 0 && (
                    <Select value={selectedAuthor} onValueChange={onAuthorChange}>
                        <SelectTrigger
                            className='focus:ring-primary-500 w-37.5 focus:ring-2 focus:ring-offset-2'
                            aria-label='Select author'>
                            <SelectValue placeholder={t('content.writer')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>{t('content.all_writer')}</SelectItem>
                            {authors.map((author) => (
                                <SelectItem key={author.value} value={author.value}>
                                    {author.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </div>
    );
}
