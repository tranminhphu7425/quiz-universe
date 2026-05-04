// src/shared/api/api.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token =
          localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;


        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('auth_token');
          sessionStorage.removeItem('auth_token');
          window.location.href = `${import.meta.env.BASE_URL}login`;
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.warn(`[API Fallback] Failed to fetch ${url}, trying static JSON...`);
      try {
        const cleanUrl = url.split('?')[0];
        let fallbackUrl = `${import.meta.env.BASE_URL}api${cleanUrl.startsWith('/') ? cleanUrl : '/' + cleanUrl}.json`;

        // Maps paginated endpoints to /all.json for static fallback
        if (cleanUrl === '/question-banks' || cleanUrl === '/question-banks/search') fallbackUrl = `${import.meta.env.BASE_URL}api/question-banks/all.json`;
        if (cleanUrl === '/subjects') fallbackUrl = `${import.meta.env.BASE_URL}api/subjects/all.json`;

        const res = await fetch(fallbackUrl);
        if (res.ok) {
          toast.success("Mất kết nối máy chủ. Đang tải dữ liệu cục bộ...", { id: 'api-fallback', duration: 4000 });
          const data = await res.json();
          // If the original request expects a paginated format and the fallback is /all
          if (!url.includes('/all') && (cleanUrl === '/question-banks' || cleanUrl === '/question-banks/search' || cleanUrl === '/subjects')) {
            const searchParams = new URLSearchParams(url.split('?')[1] || '');
            const page = parseInt(config?.params?.page?.toString() ?? searchParams.get('page') ?? '0', 10);
            const size = parseInt(config?.params?.size?.toString() ?? searchParams.get('size') ?? '10', 10);
            const keyword = (config?.params?.keyword?.toString() ?? searchParams.get('keyword') ?? '').toLowerCase();
            const sort = config?.params?.sort?.toString() ?? searchParams.get('sort') ?? '';

            let filtered = data;

            if (keyword) {
              const normKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              filtered = data.filter((item: any) => {
                const name = item.name ? item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                const desc = item.description ? item.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                const code = item.code ? item.code.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                return name.includes(normKeyword) || desc.includes(normKeyword) || code.includes(normKeyword);
              });
            }

            if (sort) {
              const [field, dir] = sort.split(',');
              filtered.sort((a: any, b: any) => {
                const valA = a[field] ?? (field === 'bankCount' || field === 'questionCount' ? 0 : "");
                const valB = b[field] ?? (field === 'bankCount' || field === 'questionCount' ? 0 : "");
                if (typeof valA === 'string' && typeof valB === 'string') {
                  const cmp = valA.localeCompare(valB, 'vi', { sensitivity: 'base' });
                  return dir === 'desc' ? -cmp : cmp;
                }
                if (typeof valA === 'number' && typeof valB === 'number') {
                  return dir === 'desc' ? valB - valA : valA - valB;
                }
                return 0;
              });
            }

            const totalElements = filtered.length;
            const totalPages = Math.ceil(totalElements / size);
            const start = page * size;
            const pagedContent = filtered.slice(start, start + size);

            return {
              content: pagedContent,
              totalElements,
              totalPages,
              size,
              number: page,
              first: page === 0,
              last: page >= totalPages - 1,
              empty: totalElements === 0
            } as any;
          }
          return data;
        }
      } catch (fallbackError) {
        console.error(`[API Fallback] Static JSON also failed for ${url}`);
      }
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch<T>(url, data, config).then(r => r.data);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

export const apiService = new ApiService();



class PublicApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      // const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      // return response.data;
      //cho try luôn lỗi để test catch
      const error = new Error("Test catch");
      throw error;
      
    } catch (error) {
      console.warn(`[API Fallback] Failed to fetch ${url}, trying static JSON...`);
      try {
        const cleanUrl = url.split('?')[0];
        let fallbackUrl = `${import.meta.env.BASE_URL}api${cleanUrl.startsWith('/') ? cleanUrl : '/' + cleanUrl}.json`;

        if (cleanUrl === '/question-banks' || cleanUrl === '/question-banks/search') fallbackUrl = `${import.meta.env.BASE_URL}api/question-banks/all.json`;
        if (cleanUrl === '/subjects') fallbackUrl = `${import.meta.env.BASE_URL}api/subjects/all.json`;

        const res = await fetch(fallbackUrl);
        if (res.ok) {
          toast.success("Mất kết nối máy chủ. Đang tải dữ liệu cục bộ...", { id: 'api-fallback', duration: 4000 });
          const data = await res.json();
          // If the original request expects a paginated format and the fallback is /all
          if (!url.includes('/all') && (cleanUrl === '/question-banks' || cleanUrl === '/question-banks/search' || cleanUrl === '/subjects')) {
            const searchParams = new URLSearchParams(url.split('?')[1] || '');
            const page = parseInt(config?.params?.page?.toString() ?? searchParams.get('page') ?? '0', 10);
            const size = parseInt(config?.params?.size?.toString() ?? searchParams.get('size') ?? '10', 10);
            const keyword = (config?.params?.keyword?.toString() ?? searchParams.get('keyword') ?? '').toLowerCase();
            const sort = config?.params?.sort?.toString() ?? searchParams.get('sort') ?? '';

            let filtered = data;

            if (keyword) {
              const normKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              filtered = data.filter((item: any) => {
                const name = item.name ? item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                const desc = item.description ? item.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                const code = item.code ? item.code.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
                return name.includes(normKeyword) || desc.includes(normKeyword) || code.includes(normKeyword);
              });
            }

            if (sort) {
              const [field, dir] = sort.split(',');
              filtered.sort((a: any, b: any) => {
                const valA = a[field] ?? (field === 'bankCount' || field === 'questionCount' ? 0 : "");
                const valB = b[field] ?? (field === 'bankCount' || field === 'questionCount' ? 0 : "");
                if (typeof valA === 'string' && typeof valB === 'string') {
                  const cmp = valA.localeCompare(valB, 'vi', { sensitivity: 'base' });
                  return dir === 'desc' ? -cmp : cmp;
                }
                if (typeof valA === 'number' && typeof valB === 'number') {
                  return dir === 'desc' ? valB - valA : valA - valB;
                }
                return 0;
              });
            }

            const totalElements = filtered.length;
            const totalPages = Math.ceil(totalElements / size);
            const start = page * size;
            const pagedContent = filtered.slice(start, start + size);

            return {
              content: pagedContent,
              totalElements,
              totalPages,
              size,
              number: page,
              first: page === 0,
              last: page >= totalPages - 1,
              empty: totalElements === 0
            } as any;
          }
          return data;
        }

      } catch (fallbackError) {
        console.error(`[API Fallback] Static JSON also failed for ${url}`);
      }
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch<T>(url, data, config).then(r => r.data);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

export const publicApiService = new PublicApiService();