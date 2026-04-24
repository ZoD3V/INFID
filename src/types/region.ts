import { CategoryTranslation } from './posts';

export interface Member {
    id: number;
    name: string;
    address: string;
    description: string;
    emails: string[];
    phones: string[];
    website: string;
}

export interface RegionDetail {
    id: number;
    name: CategoryTranslation[];
    description: string | null;
    members: Member[];
}
