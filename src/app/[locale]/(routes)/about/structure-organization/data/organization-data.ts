// data/organizationStructure.ts
export type Person = {
    id: number;
    name: string;
    role: string;
    image: string;
};

export type OrganizationLevel = {
    level: number;
    title?: string;
    members: Person[];
};

export const organizationStructures = {
    sekretariat_infid: [
        {
            level: 1,
            members: [
                {
                    id: 1,
                    name: 'Siti Khoirun Ni’mah',
                    role: 'Executive Director',
                    image: '/images/testimoni1.png'
                }
            ]
        },
        {
            level: 2,
            members: [
                {
                    id: 2,
                    name: 'Yudi Santosa',
                    role: 'Finance Manager',
                    image: '/images/testimoni3.png'
                },
                {
                    id: 3,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni1.png'
                },
                {
                    id: 7,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni4.png'
                },
                {
                    id: 7,
                    name: 'Sari Probowo',
                    role: 'Program Manager',
                    image: '/images/testimoni2.png'
                },
                {
                    id: 7,
                    name: 'Probowo',
                    role: 'Program Manager',
                    image: '/images/testimoni2.png'
                }
            ]
        },
        {
            level: 3,
            members: [
                {
                    id: 4,
                    name: 'Yudi Santosa',
                    role: 'Finance Manager',
                    image: '/images/testimoni7.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png'
                }
            ]
        }
    ],
    dewan_pengurus: [
        {
            level: 1,
            members: [
                {
                    id: 1,
                    name: 'Siti Khoirun khodijah',
                    role: 'Executive Director',
                    image: '/images/testimoni8.png'
                }
            ]
        },
        {
            level: 2,
            members: [
                {
                    id: 2,
                    name: 'A.D. Erlani',
                    role: 'Deputy Director of Organizational Governance',
                    image: '/images/testimoni2.png'
                },
                {
                    id: 3,
                    name: 'Bona Tua P.P',
                    role: 'Deputy Director for Program',
                    image: '/images/testimoni1.png'
                }
            ]
        },
        {
            level: 3,
            members: [
                {
                    id: 4,
                    name: 'Yudi Santosa',
                    role: 'Finance Manager',
                    image: '/images/testimoni3.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni4.png'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni5.png'
                }
            ]
        }
    ],
    dewan_pengawas: [
        {
            level: 1,
            members: [
                {
                    id: 1,
                    name: 'Siti Khoirun khodijah',
                    role: 'Executive Director',
                    image: '/images/testimoni8.png'
                }
            ]
        },
        {
            level: 2,
            members: [
                {
                    id: 2,
                    name: 'A.D. Erlani',
                    role: 'Deputy Director of Organizational Governance',
                    image: '/images/testimoni2.png'
                },
                {
                    id: 3,
                    name: 'Bona Tua P.P',
                    role: 'Deputy Director for Program',
                    image: '/images/testimoni1.png'
                }
            ]
        },
        {
            level: 3,
            members: [
                {
                    id: 4,
                    name: 'Yudi Santosa',
                    role: 'Finance Manager',
                    image: '/images/testimoni3.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni4.png'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni5.png'
                }
            ]
        }
    ],
    penasehat_ahli: [
        {
            level: 1,
            members: [
                {
                    id: 1,
                    name: 'Siti Khoirun khodijah',
                    role: 'Executive Director',
                    image: '/images/testimoni8.png'
                }
            ]
        },
        {
            level: 2,
            members: [
                {
                    id: 2,
                    name: 'A.D. Erlani',
                    role: 'Deputy Director of Organizational Governance',
                    image: '/images/testimoni2.png'
                },
                {
                    id: 3,
                    name: 'Bona Tua P.P',
                    role: 'Deputy Director for Program',
                    image: '/images/testimoni1.png'
                }
            ]
        },
        {
            level: 3,
            members: [
                {
                    id: 4,
                    name: 'Yudi Santosa',
                    role: 'Finance Manager',
                    image: '/images/testimoni3.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni4.png'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni5.png'
                }
            ]
        }
    ]

    // nanti tinggal tambah struktur lain
    // dewanPengurus, dewanPengawas, dll
};
