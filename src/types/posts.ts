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
    assets: { file_path: string }[];
}

export interface Tags {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    comment: string;
    email: string;
    name: string;
    is_approved: boolean | null;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    author: Author;
    category: Category;
    status: 'published' | 'draft' | string;
    featured: boolean;
    views?: number;
    published_at: string;
    cover: string;
    translations: PostTranslation[];
    tags: Tags[];
    comments: Comment[];
    assets: { file_path: string }[];
    created_at: string;
    updated_at: string;
}
