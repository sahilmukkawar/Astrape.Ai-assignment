import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addToCart as addApi, getCart as getApi, removeFromCart as removeApi, updateCartItem as updateApi } from '../services/cart';
import type { Cart } from '../services/cart';
import type { Item } from '../services/items';
import { useAuth } from './AuthContext';
import { useNotify } from './NotifyContext';

type CartState = {
  cart: Cart | null;
  fetchCart: () => Promise<void>;
  addToCart: (itemId: string, quantity?: number, item?: Item) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartState | undefined>(undefined);

const STORAGE_KEY = 'cart_cache';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState<Cart | null>(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const { notify } = useNotify();

  useEffect(() => {
    if (cart) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const value = useMemo<CartState>(() => ({
    cart,
    fetchCart: async () => {
      try {
        if (!token) return;
        const data = await getApi();
        setCart(data);
      } catch {
        // ignore (e.g., unauthenticated)
      }
    },
    addToCart: async (itemId, quantity = 1, item?: Item) => {
      if (token) {
        const data = await addApi(itemId, quantity);
        setCart(data);
        notify('Added to cart', 'success');
      } else {
        notify('Login required', 'error');
        try { sessionStorage.setItem('pending_add', JSON.stringify({ itemId, quantity })); } catch {}
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
    },
    updateItem: async (itemId, quantity) => {
      if (token) {
        const data = await updateApi(itemId, quantity);
        setCart(data);
        notify(quantity <= 0 ? 'Removed from cart' : 'Quantity updated', 'info');
      } else {
        setCart((prev) => {
          if (!prev) return prev;
          const updated = { ...prev, items: prev.items.map((i: any) => i.item._id === itemId ? { ...i, quantity } : i).filter((i: any) => i.quantity > 0) };
          return updated;
        });
        notify(quantity <= 0 ? 'Removed from cart' : 'Quantity updated', 'info');
      }
    },
    removeItem: async (itemId) => {
      if (token) {
        const data = await removeApi(itemId);
        setCart(data);
        notify('Removed from cart', 'error');
      } else {
        setCart((prev) => {
          if (!prev) return prev;
          return { ...prev, items: prev.items.filter((i: any) => i.item._id !== itemId) } as Cart;
        });
        notify('Removed from cart', 'error');
      }
    },
    clearCart: async () => {
      if (token) {
        // remove all by setting quantity to 0 one by one
        const ids = (cart?.items || []).map((i: any) => i.item._id)
        for (const id of ids) {
          try { await updateApi(id, 0) } catch {}
        }
        const data = await getApi();
        setCart(data);
      } else {
        setCart({ user: 'guest', items: [] } as any)
      }
    }
  }), [cart, token]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};


