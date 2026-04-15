export interface LTPeople {
    id: number;
    name: string;
    occupation: string;
    image: string | null;
    description: string;
    email: string | null;
    phone: string | null;
}

export interface LeadershipTimeline {
    id: number;
    title: string;
    description: DescriptionTranslation[];
    order: number;
    peoples: LTPeople[];
}

export interface DescriptionTranslation {
    id: number;
    language: string;
    text: string;
    created_at: string;
    updated_at: string;
}
