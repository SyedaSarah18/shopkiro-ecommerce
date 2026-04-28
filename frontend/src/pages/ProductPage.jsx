import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Stars({ rating }) {
  const full = Math.round(rating);
  return <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>;
}

export default function ProductPage({ onCartChange }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); });
  }, [id]);

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id, quantity: qty })
    });
    setAdded(true);
    onCartChange();
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="loading">Product not found.</div>;

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back to products</Link>
      <div className="product-detail">
        <div className="product-emoji-box">{product.emoji}</div>
        <div className="product-info">
          <span className="category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="price">${product.price.toFixed(2)}</div>
          <p className="description">{product.description}</p>
          <div className="qty-row">
            <span>Quantity:</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-display">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
          </div>
          <button className="btn-primary" onClick={addToCart}>
            🛒 Add to Cart
          </button>
          {added && <p className="added-msg">✓ Added to cart!</p>}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews ({product.reviews?.length || 0})</h2>
        {product.reviews?.length === 0 && <p style={{ color: '#888' }}>No reviews yet.</p>}
        {product.reviews?.map(r => (
          <div key={r.id} className="review-card">
            <div className="review-header">
              <span className="author">{r.author}</span>
              <Stars rating={r.rating} />
            </div>
            <p className="comment">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
