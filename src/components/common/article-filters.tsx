import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, getLangText } from '@/lib/utils';
import { Category } from '@/types/posts';

import { YearPicker } from '../ui/year-picker';
import { useLocale, useTranslations } from 'next-intl';

export interface FilterOption {
    label: string;
    value: string;
}

interface ArticleFiltersProps {
    categories: Category[];
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
    const locale = useLocale();

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
                role='tablist'
                aria-label='Filter news by category'>
                {categories.map((item, index) => {
                    const label = getLangText(item.name, locale);
                    const labelId = getLangText(item.name, locale, false);
                    const isActive = selectedCategory === labelId;

                    return (
                        <Button
                            key={index}
                            size='sm'
                            role='tab'
                            id={`tab-news-${item.slug}`}
                            aria-selected={isActive}
                            aria-label={locale === 'en' ? `Filter by ${label}` : `Filter berdasarkan ${label}`}
                            className={cn(
                                'rounded-full transition-all focus-visible:outline-none',
                                'focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-inset',
                                isActive
                                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                    : 'hover:bg-primary-600 border-none bg-slate-100 text-slate-600 shadow-none hover:text-white'
                            )}
                            variant={isActive ? 'default' : 'outline'}
                            onClick={() => onCategoryChange(labelId)}>
                            {label}
                        </Button>
                    );
                })}
            </div>
            <div className='flex flex-wrap gap-2'>
                {/* YEAR SELECT */}

                <YearPicker selectedYear={selectedYear} onYearChange={onYearChange} t={t} />

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
