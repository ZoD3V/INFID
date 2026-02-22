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
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',
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
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni3.png'
                },
                {
                    id: 3,
                    name: 'Rini Kartika',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni1.png'
                },
                {
                    id: 7,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni4.png'
                },
                {
                    id: 7,
                    name: 'Sari Probowo',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni2.png'
                },
                {
                    id: 7,
                    name: 'Probowo',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

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
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni7.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni8.png'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

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
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni2.png'
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
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni2.png'
                },
                {
                    id: 3,
                    name: 'Bona Tua P.P',
                    role: 'Deputy Director for Program',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

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
                    image: '/images/testimoni3.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni4.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni5.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
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
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni5.png'
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
                    image: '/images/testimoni2.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
                },
                {
                    id: 3,
                    name: 'Bona Tua P.P',
                    role: 'Deputy Director for Program',
                    image: '/images/testimoni1.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
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
                    image: '/images/testimoni3.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni4.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    image: '/images/testimoni5.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
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
