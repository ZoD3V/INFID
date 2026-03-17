import { ApiResponse, apiBase } from './axios-server';
import { AxiosRequestConfig } from 'axios';

export const apiRequest = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiBase.get<ApiResponse<T>>(url, config).then((res) => res.data),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiBase.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiBase.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiBase.delete<ApiResponse<T>>(url, config).then((res) => res.data)
};
