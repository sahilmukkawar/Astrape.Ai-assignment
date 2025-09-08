import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type Notice = { id: number; message: string; type?: 'info' | 'success' | 'error' };

type NotifyContextState = {
  notify: (message: string, type?: Notice['type']) => void;
};

const NotifyContext = createContext<NotifyContextState | undefined>(undefined);

export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  const notify = useCallback((message: string, type: Notice['type'] = 'info') => {
    const id = Date.now() + Math.random();
    setNotices((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setNotices((prev) => prev.filter((n) => n.id !== id)), 3000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotifyContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', top: 12, right: 12, display: 'grid', gap: 8, zIndex: 1000 }}>
        {notices.map((n) => (
          <div key={n.id} style={{
            background: n.type === 'error' ? '#fee2e2' : n.type === 'success' ? '#dcfce7' : '#e5e7eb',
            color: '#111827',
            border: '1px solid #d1d5db',
            borderLeft: `4px solid ${n.type === 'error' ? '#ef4444' : n.type === 'success' ? '#22c55e' : '#3b82f6'}`,
            borderRadius: 6,
            padding: '10px 12px',
            minWidth: 220,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {n.message}
          </div>
        ))}
      </div>
    </NotifyContext.Provider>
  );
};

export const useNotify = () => {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error('useNotify must be used within NotifyProvider');
  return ctx;
};


