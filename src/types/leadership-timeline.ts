export interface LTPeople {
    id: number;
    name: string;
    occupation: string;
    image: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    publications: Publication[];
}

export interface Publication {
    id: number;
    author: {
        id: number;
    };
    status: string;
    featured: boolean;
    published_at: string;
    cover: string | null;
    translations: Translation[];
    created_at: string;
    updated_at: string;
    views?: number;
    comments: Comment[];
}

export interface Translation {
    id: number;
    post_id: number;
    language: string;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    comment: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}

export interface LeadershipTimeline {
    id: number;
    title: string;
    description: DescriptionTranslation[];
    order: number;
    people: LTPeople[];
    images: string[];
}

export interface Comment {
    id: number;
    comment: string;
    email: string;
    name: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}

export interface DescriptionTranslation {
    id: number;
    language: string;
    text: string;
    created_at: string;
    updated_at: string;
}
