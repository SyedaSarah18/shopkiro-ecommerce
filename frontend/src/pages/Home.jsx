import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Stars({ rating }) {
  const full = Math.round(rating);
  return <span>{'★'.repeat(full)}{'☆'.repeat(5 - full)} {rating.toFixed(1)}</span>;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to ShopKiro</h1>
        <p>Discover our curated collection of {products.length} amazing products</p>
      </div>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card" onClick={() => navigate(`/product/${p.id}`)}>
            <div className="emoji">{p.emoji}</div>
            <h3>{p.name}</h3>
            <div className="category">{p.category}</div>
            <div className="price">${p.price.toFixed(2)}</div>
            <div className="rating"><Stars rating={p.rating} /> ({p.review_count})</div>
          </div>
        ))}
      </div>
    </div>
  );
}
