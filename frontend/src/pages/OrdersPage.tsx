import { useEffect, useState } from 'react';
import { listOrders, type Order } from '../services/orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    listOrders().then(setOrders).catch(() => setOrders([]));
  }, []);
  return (
    <div className="container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {orders.map((o) => (
            <div key={o._id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Order #{o._id.slice(-6)}</strong>
                <span>₹{o.total}</span>
              </div>
              <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                {o.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 8, alignItems: 'center' }}>
                    <img src={it.imageUrl} style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 6 }} />
                    <div>
                      <div>{it.name}</div>
                      <div style={{ color: '#64748b' }}>Qty: {it.quantity}</div>
                    </div>
                    <div>₹{it.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


