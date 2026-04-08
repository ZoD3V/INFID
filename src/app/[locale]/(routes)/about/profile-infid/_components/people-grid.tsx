import { LTPeople } from '@/types/leadership-timeline';

interface PeopleGridProps {
    title: string;
    data: LTPeople[];
    onItemClick: (person: LTPeople) => void;
}

export const PeopleGrid = ({ title, data, onItemClick }: PeopleGridProps) => {
    return (
        <div className='flex flex-col'>
            <h2 className='text-primary-500 mb-8 text-3xl font-bold'>{title}</h2>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {data.map((person) => {
                    return (
                        <div
                            key={person.id}
                            className='group cursor-pointer rounded-lg border border-slate-200 bg-slate-100/50 p-3 transition-all hover:shadow-md'
                            onClick={() => onItemClick(person)}>
                            <div className='relative mb-4 aspect-square h-70 w-full overflow-hidden rounded-lg bg-slate-200'>
                                <img
                                    src={person.image ? person.image : '/images/placeholder-square.png'}
                                    alt={person.name}
                                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/placeholder-square.png';
                                    }}
                                />
                            </div>

                            <h3 className='line-clamp-1 text-center font-bold text-slate-900'>{person.name}</h3>

                            <p className='text-primary-500 mb-2 line-clamp-1 text-center text-sm font-medium'>
                                {person.occupation}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PeopleGrid;
