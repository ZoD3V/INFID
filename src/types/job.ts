export interface LanguageText {
    language: string;
    text: string;
}

export interface Job {
    id: number;
    title: string;
    image: string;
    position: string | null;
    description: Description[];
    location: string;
    category: string;
    attachment: string;
    work_location_type: string;
    employment_type: string;
    closing_date: string;
    link: string | null;
}

export interface Description {
    language: string;
    text: string;
}

export interface JobsResponse {
    data: Job[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
    category_filter: {
        id: string[];
        en: string[];
    };
    status_code: number;
    message: string;
}
