import { API_BASE_URL } from '@/lib/api-endpoints';

import axios from 'axios';
import { toast } from 'sonner';

// Pastikan sudah install sonner

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
        const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan pada server';

        toast.error('Gagal memuat data', {
            description: errorMessage
        });

        return Promise.reject(error);
    }
);
