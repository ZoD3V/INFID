export interface Author {
    id: number | null;
    name: string | null;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface PostTranslation {
    id: number;
    post_id: number;
    language: string;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
    assets: any[];
}

export interface Post {
    id: number;
    author: Author;
    category: Category;
    status: 'published' | 'draft' | string;
    featured: boolean;
    published_at: string;
    cover: string;
    translations: PostTranslation[];
    tags: any[];
    comments: any[];
    created_at: string;
    updated_at: string;
}
