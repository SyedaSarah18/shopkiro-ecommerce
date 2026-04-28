const express = require('express');
const router = express.Router();
const db = require('../db');

// GET cart items with product details
router.get('/', (req, res) => {
  const items = db.prepare(`
    SELECT c.id as id, c.product_id, c.quantity, p.name, p.description, p.price, p.emoji, p.category, p.rating, p.review_count
    FROM cart_items c 
    JOIN products p ON c.product_id = p.id
  `).all();
  res.json(items);
});

// POST add item to cart
router.post('/', (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  
  const existing = db.prepare('SELECT * FROM cart_items WHERE product_id = ?').get(product_id);
  
  if (existing) {
    const stmt = db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?');
    stmt.run(quantity, product_id);
    res.json({ message: 'Cart updated', id: existing.id });
  } else {
    const stmt = db.prepare('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)');
    const result = stmt.run(product_id, quantity);
    res.json({ message: 'Item added to cart', id: result.lastInsertRowid });
  }
});

// PUT update cart item quantity
router.put('/:id', (req, res) => {
  const { quantity } = req.body;
  const stmt = db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?');
  stmt.run(quantity, req.params.id);
  res.json({ message: 'Quantity updated' });
});

// DELETE remove item from cart
router.delete('/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM cart_items WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ message: 'Item removed from cart' });
});

module.exports = router;
