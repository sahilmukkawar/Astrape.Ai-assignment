import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotify } from '../context/NotifyContext';
import { createOrder } from '../services/orders';

export default function PaymentPage() {
  const nav = useNavigate();
  const { cart, clearCart } = useCart();
  const { notify } = useNotify();
  const [method, setMethod] = useState<'cod' | 'card'>('cod');

  const total = (cart?.items || []).reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  useEffect(() => {
    if (!sessionStorage.getItem('checkout_address')) {
      nav('/checkout/address');
    }
  }, []);

  const handlePay = async () => {
    const address = JSON.parse(sessionStorage.getItem('checkout_address') || '{}');
    const order = await createOrder({ address, paymentMethod: method });
    notify('Order placed successfully', 'success');
    await clearCart();
    sessionStorage.removeItem('checkout_address');
    nav('/orders');
  };

  return (
    <div className="page-section">
      <div className="card-lg">
        <h2>Payment</h2>
        <div className="form-large">
          <div><strong>Total: ₹{total}</strong></div>
          <div className="payment-options">
            <label>
              <input type="radio" checked={method === 'cod'} onChange={() => setMethod('cod')} /> Cash on Delivery
            </label>
            <label>
              <input type="radio" checked={method === 'card'} onChange={() => setMethod('card')} /> Card (mock)
            </label>
          </div>
          {method === 'card' && (
            <div style={{ display: 'grid', gap: 8 }}>
              <input placeholder="Card number" />
              <div style={{ display: 'flex', gap: 12 }}>
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </div>
          )}
          <button className="btn btn-lg" onClick={handlePay}>Pay now</button>
        </div>
      </div>
    </div>
  );
}


