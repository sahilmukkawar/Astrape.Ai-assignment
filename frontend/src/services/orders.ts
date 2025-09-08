import api from './api';

export type OrderItem = { item: string; name: string; price: number; quantity: number; imageUrl: string };
export type Order = { _id: string; items: OrderItem[]; total: number; createdAt: string; paymentMethod: string };

export const createOrder = (payload: { address: any; paymentMethod: 'cod' | 'card' }) =>
  api.post<Order>('/orders', payload).then((r) => r.data);

export const listOrders = () => api.get<Order[]>('/orders').then((r) => r.data);


