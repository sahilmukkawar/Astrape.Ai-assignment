import { useEffect, useState } from 'react';
import { fetchItems, type Item } from '../services/items';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{ search?: string; category?: string; minPrice?: number; maxPrice?: number }>({});
  const { addToCart } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchItems({
      search: filters.search || '',
      category: filters.category || '',
      minPrice: filters.minPrice ?? '',
      maxPrice: filters.maxPrice ?? ''
    })
      .then(setItems)
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="container">
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input placeholder="Search" onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} />
        <input placeholder="Category" onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))} />
        <input placeholder="Min Price" type="number" onChange={(e) => setFilters((f) => ({ ...f, minPrice: Number(e.target.value) }))} />
        <input placeholder="Max Price" type="number" onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid-products">
          {items.map((p) => (
            <div key={p._id} className="card">
              <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6 }} />
              <h3 style={{ margin: '8px 0' }}>{p.name}</h3>
              <p style={{ minHeight: 40 }}>{p.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="price">₹{p.price}</span>
                <button className="btn" onClick={() => addToCart(p._id, 1, p)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


