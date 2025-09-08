import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// no notify needed here
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, fetchCart, updateItem, removeItem } = useCart();
  const { token } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const total = (cart?.items || []).reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {!cart || cart.items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {!token && (
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: 10, borderRadius: 6 }}>
              Login to save your cart to your account.
            </div>
          )}
          {cart.items.map(({ item, quantity }) => (
            <div key={item._id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 12, alignItems: 'center' }}>
              <img src={item.imageUrl} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }} />
              <div>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div>₹{item.price}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateItem(item._id, Math.max(0, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => updateItem(item._id, quantity + 1)}>+</button>
                <button onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <strong>Total: ₹{total}</strong>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              {token ? (
                <button className="btn" onClick={() => nav('/checkout/address')}>Proceed to payment</button>
              ) : (
                <Link to="/login"><button className="btn secondary">Login to proceed</button></Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


