export interface Job {
    id: number;
    title: string;
    image: string;
    position: string | null;
    description: string;
    location: string;
    work_location_type: string;
    employment_type: string;
    closing_date: string;
    link: string | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        current_page: number;
    };
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}
