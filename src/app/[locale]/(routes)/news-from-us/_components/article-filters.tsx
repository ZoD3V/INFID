import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    category: string;
    setCategory: (v: string) => void;
    year: string;
    setYear: (v: string) => void;
    author: string;
    setAuthor: (v: string) => void;
};

export function ArticleFilters({ category, setCategory, year, setYear, author, setAuthor }: Props) {
    return (
        <div className='container flex flex-col gap-4 md:flex-row md:justify-between lg:items-center'>
            {/* Kategori */}
            <div className='flex flex-wrap gap-2'>
                {['Semua', 'Kegiatan', 'Cerita Perubahan', 'Siaran Pers'].map((item) => (
                    <Button
                        key={item}
                        size='sm'
                        className={`rounded-full ${category !== item && 'border-none bg-slate-100 shadow-none'}`}
                        variant={category === item ? 'default' : 'outline'}
                        onClick={() => setCategory(item)}>
                        {item}
                    </Button>
                ))}
            </div>

            {/* Filter kanan */}
            <div className='flex gap-2'>
                <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className='w-30'>
                        <SelectValue placeholder='Tahun' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>Tahun</SelectItem>
                        <SelectItem value='2023'>2023</SelectItem>
                        <SelectItem value='2024'>2024</SelectItem>
                        <SelectItem value='2025'>2025</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={author} onValueChange={setAuthor}>
                    <SelectTrigger className='w-35'>
                        <SelectValue placeholder='Penulis' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>Penulis</SelectItem>
                        <SelectItem value='Samantha'>Samantha</SelectItem>
                        <SelectItem value='Joko'>Joko</SelectItem>
                        <SelectItem value='Rudi'>Rudi</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
