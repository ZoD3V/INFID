interface PostTranslation {
    id: number;
    post_id: number;
    language: string;
    title: string;
    slug: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Post {
    id: number;
    category_id: number;
    category: Category;
    translations: PostTranslation[];
}

export type PeopleType = 'organization' | 'research_fellow' | 'historical';

interface Person {
    id: number;
    name: string;
    occupation: string;
    type: PeopleType;
    row_num: number;
}

interface Partner {
    id: number;
    name: string;
}

interface Member {
    id: number;
    name: string;
    region: string;
}

export interface GlobalSearch {
    posts: Post[];
    jobs: { id: number; title: string }[];
    people: {
        organization?: Person[];
        research_fellow?: Person[];
        historical?: Person[];
    };
    partners: Partner[];
    members: Member[];
}

export interface NavChild {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    children?: NavChild[];
}
