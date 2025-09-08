import axios from 'axios';

// Prefer explicit env var; otherwise, use relative '/api' so Vite proxy or same-origin works.
const apiBaseUrl = (import.meta as any).env?.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;


