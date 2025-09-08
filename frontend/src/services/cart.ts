import api from './api';
import type { Item } from './items';

export type CartItem = { item: Item; quantity: number };
export type Cart = { user: string; items: CartItem[] };

export const getCart = () => api.get<Cart>('/cart').then((r) => r.data);
export const addToCart = (itemId: string, quantity = 1) =>
  api.post<Cart>('/cart', { itemId, quantity }).then((r) => r.data);
export const updateCartItem = (itemId: string, quantity: number) =>
  api.put<Cart>('/cart', { itemId, quantity }).then((r) => r.data);
export const removeFromCart = (itemId: string) =>
  api.delete<Cart>(`/cart/${itemId}`).then((r) => r.data);


