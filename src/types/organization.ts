export interface OrganizationPeople {
    id: number;
    name: string;
    occupation: string;
    image: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    description?: string | null;
    publications?: OrganizationPublication[];
}

export interface OrganizationPublication {
    id: number;
    category: string;
    date: string;
    title: string;
    views: number;
    comments: number;
    image: string;
}

export interface OrganizationStructureData {
    id: number;
    title: string;
    type: string;
    order: number;
    peoples: OrganizationPeople[];
}

export interface StructureOrganizationPageProps {
    initialData: OrganizationStructureData[];
}

export interface OrganizationStructureProps {
    data: OrganizationPeople[];
    activeTitle: string;
}

export interface Person {
    id: number;
    name: string;
    occupation: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    description: string;
    image: string;
    publications: OrganizationPublication[];
}
