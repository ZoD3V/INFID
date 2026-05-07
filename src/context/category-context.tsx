'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { getLangText } from '@/lib/utils';
import { Category } from '@/types/posts';

interface CategoryContextType {
    categories: Category[];
    isLoading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNavCategories = async () => {
            try {
                const res = await apiRequest.get<Category[]>(API_ENDPOINTS.categories);
                const data =
                    res.data.filter(
                        (item) => getLangText(item.name) !== 'Infografis' && getLangText(item.name) !== 'Infograhic'
                    ) || [];
                setCategories(data);
            } catch (error) {
                console.error('Error fetching nav categories', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNavCategories();
    }, []);

    return <CategoryContext.Provider value={{ categories, isLoading }}>{children}</CategoryContext.Provider>;
};

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
};
