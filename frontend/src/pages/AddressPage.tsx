import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddressPage() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, address, city, zip };
    sessionStorage.setItem('checkout_address', JSON.stringify(data));
    nav('/checkout/payment');
  };

  return (
    <div className="page-section">
      <div className="card-lg">
        <h2>Shipping Address</h2>
        <form className="form-large" onSubmit={handleNext}>
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div style={{ display: 'flex', gap: 12 }}>
            <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />
          </div>
          <button className="btn btn-lg" type="submit">Continue to payment</button>
        </form>
      </div>
    </div>
  );
}


