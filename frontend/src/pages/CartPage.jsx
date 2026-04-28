import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartPage({ onCartChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const res = await fetch('/api/cart');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (cartId, qty) => {
    if (qty < 1) return;
    await fetch(`/api/cart/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    });
    fetchCart();
    onCartChange();
  };

  const removeItem = async (cartId) => {
    await fetch(`/api/cart/${cartId}`, { method: 'DELETE' });
    fetchCart();
    onCartChange();
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (loading) return <div className="loading">Loading cart...</div>;

  if (items.length === 0) return (
    <div className="container">
      <div className="cart-empty">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <p>Your cart is empty.</p>
        <Link to="/" style={{ color: '#e94560', marginTop: '1rem', display: 'inline-block' }}>
          Continue Shopping →
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 style={{ marginBottom: '1.5rem' }}>Shopping Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span className="cart-emoji">{item.emoji}</span>
                  <Link to={`/product/${item.product_id}`} className="cart-product-name">
                    {item.name}
                  </Link>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="cart-total">
          Total: <span>${total.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: '#555', alignSelf: 'center', fontSize: '0.9rem' }}>
            ← Continue Shopping
          </Link>
          <button className="btn-checkout" onClick={() => alert('Checkout coming soon!')}>
            Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
