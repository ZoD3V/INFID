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
                    image: '/images/testimoni1.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        },
                        {
                            id: 3,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        },
                        {
                            id: 4,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        },
                        {
                            id: 5,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
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

                    image: '/images/testimoni3.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Rini Kartika',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni1.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 7,
                    name: 'Sari Wahyuni',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni4.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 7,
                    name: 'Sari Probowo',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni2.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 7,
                    name: 'Probowo',
                    role: 'Program Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni2.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
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

                    image: '/images/testimoni7.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    image: '/images/testimoni8.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni8.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Rini Kartika',
                    role: 'Design & Quality Manager',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni8.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
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

                    image: '/images/testimoni2.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
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

                    image: '/images/testimoni2.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Bona Tua P.P',
                    role: 'Deputy Director for Program',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.',

                    image: '/images/testimoni1.png',
                    publications: [
                        {
                            id: 1,
                            category: 'KERTAS KEBIJAKAN',
                            date: '10 Jan 2025',
                            title: 'Transisi Energi yang Berkeadilan untuk Semua',
                            views: 345,
                            comments: 10,
                            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=200&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            category: 'KERTAS KEBIJAKAN',
                            date: '12 Feb 2025',
                            title: 'Analisis Dampak Lingkungan Berbasis Komunitas',
                            views: 120,
                            comments: 5,
                            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop'
                        }
                    ]
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
                    image: '/images/testimoni8.png',
                    description:
                        'Seorang profesional dengan pengalaman lebih dari 20 tahun di bidang pemberdayaan masyarakat dan pengembangan organisasi. Memiliki komitmen kuat terhadap kemandirian ekonomi rakyat dan pembangunan berbasis komunitas.'
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
    ]

    // nanti tinggal tambah struktur lain
    // dewanPengurus, dewanPengawas, dll
};
