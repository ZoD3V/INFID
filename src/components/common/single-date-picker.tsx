'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { format, isValid, parse } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

function toYMD(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

function parseYMD(ymd?: string): Date | undefined {
    if (!ymd) return undefined;
    const parsedDate = parse(ymd, 'yyyy-MM-dd', new Date());
    return isValid(parsedDate) ? parsedDate : undefined;
}

interface Props {
    value?: string;
    onChange: (date?: string) => void;
    className?: string;
}

export function SingleDatePicker({ value, onChange, className }: Props) {
    const initialDate = React.useMemo(() => parseYMD(value) || new Date(), [value]);

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(() => parseYMD(value));

    const [month, setMonth] = React.useState<Date>(initialDate);

    React.useEffect(() => {
        const parsed = parseYMD(value);
        if (parsed?.getTime() !== selectedDate?.getTime()) {
            setSelectedDate(parsed);
            setMonth(parsed ?? new Date());
        }
    }, [value]);

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;

        setSelectedDate(date);
        setMonth(date);
        onChange(toYMD(date));
    };

    const label = React.useMemo(() => {
        const dateObj = parseYMD(value);
        return dateObj ? format(dateObj, 'MMMM d, yyyy', { locale: id }) : 'dd/mm/yyyy';
    }, [value]);

    return (
        <div className={cn('w-full lg:w-fit', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        size='sm'
                        className={cn(
                            'w-full justify-start text-left font-normal lg:w-fit',
                            !value && 'text-muted-foreground'
                        )}>
                        <span className='truncate'>{label}</span>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                        mode='single'
                        selected={selectedDate}
                        onSelect={handleSelect}
                        month={month}
                        onMonthChange={setMonth}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
