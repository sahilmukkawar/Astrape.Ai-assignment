import axios from 'axios';

// Resolve API base URL with sane fallbacks for dev and prod.
// Priority: VITE_API_URL (domain or full base) → VITE_BACKEND_URL + '/api' → '/api' (Vite proxy or same-origin)
const viteEnv: any = (import.meta as any).env || {};
let apiBaseUrl: string | undefined = viteEnv.VITE_API_URL as string | undefined;
if (!apiBaseUrl && viteEnv.VITE_BACKEND_URL) {
  const base = String(viteEnv.VITE_BACKEND_URL).replace(/\/$/, '');
  apiBaseUrl = `${base}/api`;
}
if (!apiBaseUrl) {
  apiBaseUrl = '/api';
}
// If VITE_API_URL is a domain root (e.g., https://example.com), ensure '/api' suffix
if (/^https?:\/\//i.test(apiBaseUrl) && !/\/api\/?$/i.test(apiBaseUrl)) {
  apiBaseUrl = apiBaseUrl.replace(/\/$/, '') + '/api';
}

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

apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    try {
      const cfg = error?.config || {};
      const method = (cfg.method || 'get').toUpperCase();
      const url = (cfg.baseURL || '') + (cfg.url || '');
      // eslint-disable-next-line no-console
      console.error(`[API ${method}] ${url} → ${error?.response?.status || 'ERR'}`, error?.response?.data || error?.message);
    } catch {}
    return Promise.reject(error);
  }
);

export default apiClient;


