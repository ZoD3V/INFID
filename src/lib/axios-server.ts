import { API_BASE_URL } from '@/lib/api-endpoints';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import Cookies from 'js-cookie';
import { toast } from 'sonner';

export interface ApiResponse<T> {
    status_code: number;
    message: string;
    data: T;
}

export const apiBase = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// configuration automation for add lag every request
// apiBase.interceptors.request.use((config) => {
//     const locale = Cookies.get('NEXT_LOCALE') || 'id';
//     config.params = { ...config.params, lang: locale };
//     return config;
// });

apiBase.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined') {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error('Error', { description: errorMessage });
        }
        return Promise.reject(error);
    }
);
