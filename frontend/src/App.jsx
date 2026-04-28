import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const res = await fetch('/api/cart');
      const items = await res.json();
      setCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => { refreshCartCount(); }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">🛍️ ShopKiro</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage onCartChange={refreshCartCount} />} />
        <Route path="/cart" element={<CartPage onCartChange={refreshCartCount} />} />
      </Routes>
    </>
  );
}
