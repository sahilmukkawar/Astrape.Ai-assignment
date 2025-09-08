import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, login as loginApi, signup as signupApi } from '../services/auth';
import { useNotify } from './NotifyContext';

type User = { id: string; name: string; email: string } | null;

type AuthContextState = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const { notify } = useNotify();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getMe().then(async (u) => {
        setUser(u);
        try {
          const pending = sessionStorage.getItem('pending_add');
          if (pending) {
            sessionStorage.removeItem('pending_add');
          }
        } catch {}
      }).catch(() => setUser(null));
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const value = useMemo<AuthContextState>(() => ({
    user,
    token,
    login: async (email, password) => {
      const data = await loginApi({ email, password });
      setToken(data.token);
      notify('Logged in successfully', 'success');
    },
    signup: async (name, email, password) => {
      const data = await signupApi({ name, email, password });
      setToken(data.token);
      notify('Account created', 'success');
    },
    logout: () => {
      setToken(null)
      notify('Logged out', 'info')
    }
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


