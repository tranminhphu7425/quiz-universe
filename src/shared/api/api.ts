// src/shared/api/api.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
        if (cleanUrl === '/question-banks') fallbackUrl = `${import.meta.env.BASE_URL}api/question-banks/all.json`;
        if (cleanUrl === '/subjects') fallbackUrl = `${import.meta.env.BASE_URL}api/subjects/all.json`;

        const res = await fetch(fallbackUrl);
        if (res.ok) {
          const data = await res.json();
          // If the original request expects a paginated format and the fallback is /all
          if (!url.includes('/all') && (cleanUrl === '/question-banks' || cleanUrl === '/subjects')) {
            return { content: data, totalElements: data.length, totalPages: 1, size: data.length, number: 0 } as any;
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
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.warn(`[API Fallback] Failed to fetch ${url}, trying static JSON...`);
      try {
        const cleanUrl = url.split('?')[0];
        let fallbackUrl = `${import.meta.env.BASE_URL}api${cleanUrl.startsWith('/') ? cleanUrl : '/' + cleanUrl}.json`;
        
        if (cleanUrl === '/question-banks') fallbackUrl = `${import.meta.env.BASE_URL}api/question-banks/all.json`;
        if (cleanUrl === '/subjects') fallbackUrl = `${import.meta.env.BASE_URL}api/subjects/all.json`;

        const res = await fetch(fallbackUrl);
        if (res.ok) {
          const data = await res.json();
          if (!url.includes('/all') && (cleanUrl === '/question-banks' || cleanUrl === '/subjects')) {
            return { content: data, totalElements: data.length, totalPages: 1, size: data.length, number: 0 } as any;
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