// Founder item
export interface Founder {
    id: number;
    name: string;
    image: string;
    role: string;
    description: string;
}

interface PeopleGridProps {
    title: string;
    data: Founder[];
    onItemClick: (person: Founder) => void;
}

export const PeopleGrid = ({ title, data, onItemClick }: PeopleGridProps) => (
    <div>
        <h2 className='text-primary-500 mb-8 text-3xl font-bold'>{title}</h2>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            {data.map((person) => (
                <div
                    key={person.id}
                    className='group cursor-pointer rounded-lg border border-slate-200 bg-slate-100/50 p-3'
                    onClick={() => onItemClick(person)}>
                    <div className='relative mb-4 aspect-square h-70 w-full overflow-hidden rounded-lg'>
                        <img src={person.image} alt={person.name} className='h-full w-full object-cover' />
                    </div>

                    <h3 className='text-center font-bold text-slate-900'>{person.name}</h3>
                    <p className='text-primary-500 mb-2 text-center text-sm font-medium'>{person.role}</p>
                </div>
            ))}
        </div>
    </div>
);
