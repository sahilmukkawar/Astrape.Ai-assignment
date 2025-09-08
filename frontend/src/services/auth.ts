import api from './api';

export const signup = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data).then((r) => r.data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data).then((r) => r.data);

export const getMe = () => api.get('/auth/me').then((r) => r.data);


