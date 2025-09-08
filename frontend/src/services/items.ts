import api from './api';

export type Item = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
};

export const fetchItems = (params?: Record<string, string | number>) =>
  api.get<Item[]>('/items', { params }).then((r) => r.data);


