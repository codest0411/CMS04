import axios from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshed = await useAuthStore.getState().refresh();
      if (refreshed) {
        originalRequest.headers.Authorization = `Bearer ${refreshed}`;
        return api(originalRequest);
      }
      toast.error('⚠️ Session expired. Please log in again.');
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || 'Request failed. Try again.';
    toast.error(`🚫 ${message}`);
    return Promise.reject(error);
  }
);

export const extractData = (response) => response?.data?.data ?? response?.data ?? [];

export const fetcher = async (url) => {
  const response = await api.get(url);
  return extractData(response);
};

export default api;
