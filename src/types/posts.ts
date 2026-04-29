export type AttachmentFileType = 'audio' | 'pdf' | 'image' | 'video' | string;

export interface Attachment {
    id: number;
    file_path: string;
    aria: string | null;
    type: AttachmentFileType;
    role: 'attachment' | string;
    created_at: string;
    updated_at: string;
}

export interface AttachmentListProps {
    attachments: Attachment[];
}
export interface Author {
    id: number | null;
    name: string | null;
}

export interface Category {
    id: number;
    name: CategoryTranslation[];
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface CategoryTranslation {
    language: string;
    text: string;
    displayText?: string;
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
    attachments: Attachment[];
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
    published_at: string;
    cover: string;
    translations: PostTranslation[];
    youtube_link?: string;
    audio_link?: string;
    audio?: string;
    tags: Tags[];
    views?: number;
    comments: Comment[];
    assets: { file_path: string }[];
    created_at: string;
    updated_at: string;
}
