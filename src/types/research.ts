export interface Research {
    id: number;
    name: string;
    occupation: string;
    image: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    description?: string | null;
}

interface Description {
    language: string;
    text: string;
}

interface Author {
    id: number;
}

interface PublicationTranslation {
    id: number;
    language: string;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface Publication {
    id: number;
    author: Author;
    status: string;
    featured: boolean;
    published_at: string;
    cover: string;
    youtube_link: string;
    translations: PublicationTranslation[];
    comments: any[];
    views: number;
    created_at: string;
    updated_at: string;
}

export interface ResearchPerson {
    id: number;
    name: string;
    occupation: string | null;
    email: string | null;
    social_media: string;
    description: Description[];
    image: string;
    publications: Publication[];
}
