import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://astrape-ai-assignment-2.onrender.com/api' || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;


