import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface FilterOption {
    label: string;
    value: string;
}

interface ArticleFiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (value: string) => void;

    authors: FilterOption[];
    selectedAuthor: string;
    onAuthorChange: (value: string) => void;

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
    return (
        <div className={cn('container flex flex-col gap-4 md:justify-between lg:flex-row lg:items-center', className)}>
            <div className='flex flex-wrap gap-2'>
                {categories.map((item) => (
                    <Button
                        key={item}
                        size='sm'
                        className={cn(
                            'rounded-full transition-all',
                            selectedCategory !== item && 'border-none bg-slate-100 shadow-none'
                        )}
                        variant={selectedCategory === item ? 'default' : 'outline'}
                        onClick={() => onCategoryChange(item)}>
                        {item}
                    </Button>
                ))}
            </div>

            <div className='flex flex-wrap gap-2'>
                {/* Select Tahun */}
                <Select value={selectedYear} onValueChange={onYearChange}>
                    <SelectTrigger className='w-37.5'>
                        <SelectValue placeholder='Tahun' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>Semua Tahun</SelectItem>
                        {years.map((y) => (
                            <SelectItem key={y} value={y}>
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Select Penulis */}
                <Select value={selectedAuthor} onValueChange={onAuthorChange}>
                    <SelectTrigger className='w-37.5'>
                        <SelectValue placeholder='Penulis' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>Semua Penulis</SelectItem>
                        {authors.map((author) => (
                            <SelectItem key={author.value} value={author.value}>
                                {author.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
