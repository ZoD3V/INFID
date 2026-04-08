export interface LTPeople {
    id: number;
    name: string;
    occupation: string;
    image: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
}

export interface LeadershipTimeline {
    id: number;
    title: string;
    description: string | null;
    order: number;
    peoples: LTPeople[];
}
