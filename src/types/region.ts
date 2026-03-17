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
    name: string;
    description: string | null;
    members: Member[];
}
