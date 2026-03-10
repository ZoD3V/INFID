import { API_BASE_URL } from '@/lib/api-endpoints';

import axios from 'axios';
import { toast } from 'sonner';

export interface ApiResponse<T> {
    data: T[];
}

export const apiBase = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiBase.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'an error occurred on the server';

        toast.error('Failed to load data', {
            description: errorMessage
        });

        return Promise.reject(error);
    }
);
