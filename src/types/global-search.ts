export interface GlobalSearch {
    posts: Post[];
    jobs: Job[];
    people: Person[];
}

export interface Post {
    id: number;
    category_id: number;
    category: Category;
    translations: Translation[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface Translation {
    id: number;
    post_id: number;
    language: string;
    title: string;
    slug: string;
}

export interface Job {
    id: number;
    title: string;
}

export interface Person {
    id: number;
    name: string;
    occupation: string;
}
