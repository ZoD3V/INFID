'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { CalendarIcon } from 'lucide-react';

interface YearPickerProps {
    selectedYear?: string;
    onYearChange: (year: string) => void;
    t: (key: string) => string;
}

export function YearPicker({ selectedYear, onYearChange, t }: YearPickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1990 + 2 }, (_, i) => (currentYear + 1 - i).toString());

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    size='sm'
                    aria-haspopup='grid'
                    aria-expanded={isOpen}
                    aria-label={`${t('content.year')}: ${selectedYear === 'all' ? t('content.all_year') : selectedYear}`}
                    className={cn(
                        'text-primary-500 w-fit justify-between text-right font-medium focus:ring-2 focus:ring-offset-2',
                        !selectedYear && 'text-muted-foreground'
                    )}>
                    <CalendarIcon className='mr-5 h-5 w-5' aria-hidden='true' />
                    {selectedYear === 'all' ? t('content.all_year') : selectedYear || t('content.year')}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64 p-2'>
                <div className='flex flex-col space-y-2' role='dialog' aria-label={t('content.year')}>
                    <p id='year-picker-title' className='border-b py-2 text-center text-sm font-medium'>
                        {t('content.year')}
                    </p>
                    <ScrollArea className='h-64'>
                        <div className='grid grid-cols-3 gap-2 p-1' role='grid' aria-labelledby='year-picker-title'>
                            <Button
                                variant={selectedYear === 'all' ? 'default' : 'ghost'}
                                className='col-span-3 text-sm'
                                size='sm'
                                role='gridcell'
                                aria-selected={selectedYear === 'all'}
                                onClick={() => {
                                    onYearChange('all');
                                    setIsOpen(false);
                                }}>
                                {t('content.all_year')}
                            </Button>

                            {years.map((year) => (
                                <Button
                                    key={year}
                                    size='sm'
                                    variant={selectedYear === year ? 'default' : 'ghost'}
                                    className='text-sm'
                                    role='gridcell'
                                    aria-selected={selectedYear === year}
                                    onClick={() => {
                                        onYearChange(year);
                                        setIsOpen(false);
                                    }}>
                                    <span className='sr-only'>{t('content.year')}</span>
                                    {year}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </PopoverContent>
        </Popover>
    );
}
