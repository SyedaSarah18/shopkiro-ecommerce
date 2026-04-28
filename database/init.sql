CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT,
  rating REAL DEFAULT 4.0,
  review_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, description, price, emoji, category, rating, review_count) VALUES
  ('Wireless Headphones', 'Premium noise-cancelling over-ear headphones with 30hr battery life.', 79.99, '🎧', 'Electronics', 4.5, 128),
  ('Running Shoes', 'Lightweight breathable sneakers perfect for daily runs and gym sessions.', 59.99, '👟', 'Footwear', 4.3, 95),
  ('Coffee Maker', 'Programmable 12-cup drip coffee maker with built-in grinder.', 49.99, '☕', 'Kitchen', 4.6, 210),
  ('Yoga Mat', 'Non-slip eco-friendly yoga mat, 6mm thick with carrying strap.', 29.99, '🧘', 'Sports', 4.4, 74),
  ('Sunglasses', 'Polarized UV400 protection sunglasses with titanium frame.', 39.99, '🕶️', 'Accessories', 4.2, 56),
  ('Backpack', '30L waterproof hiking backpack with laptop compartment.', 54.99, '🎒', 'Bags', 4.7, 183),
  ('Smartwatch', 'Fitness tracker with heart rate monitor, GPS, and 7-day battery.', 129.99, '⌚', 'Electronics', 4.4, 302),
  ('Cookbook', 'The Complete Guide to Mediterranean Cooking — 250+ recipes.', 24.99, '📚', 'Books', 4.8, 441),
  ('Desk Lamp', 'LED desk lamp with adjustable brightness and USB charging port.', 34.99, '💡', 'Home', 4.3, 88),
  ('Water Bottle', 'Insulated stainless steel bottle, keeps drinks cold 24hrs.', 19.99, '🍶', 'Sports', 4.6, 267),
  ('Mechanical Keyboard', 'Compact TKL mechanical keyboard with RGB backlight, blue switches.', 89.99, '⌨️', 'Electronics', 4.5, 159),
  ('Scented Candle', 'Hand-poured soy wax candle, lavender & vanilla scent, 50hr burn.', 18.99, '🕯️', 'Home', 4.7, 312),
  ('Wireless Mouse', 'Ergonomic silent wireless mouse with 18-month battery life.', 29.99, '🖱️', 'Electronics', 4.4, 97),
  ('Protein Powder', 'Whey protein isolate, chocolate flavor, 2lb bag, 25g protein/serving.', 44.99, '💪', 'Health', 4.3, 188),
  ('Succulent Plant', 'Live mini succulent in ceramic pot, low maintenance indoor plant.', 14.99, '🌵', 'Garden', 4.9, 523),
  ('Portable Charger', '20000mAh power bank with fast charging, dual USB-C ports.', 39.99, '🔋', 'Electronics', 4.5, 214),
  ('Throw Blanket', 'Super soft fleece throw blanket 50x60in, machine washable.', 27.99, '🛋️', 'Home', 4.8, 376),
  ('Resistance Bands', 'Set of 5 latex resistance bands for home workouts, various strengths.', 22.99, '🏋️', 'Sports', 4.4, 142),
  ('Instant Camera', 'Retro-style instant film camera with 10-shot film pack included.', 69.99, '📷', 'Electronics', 4.2, 89),
  ('Wooden Chess Set', 'Handcrafted wooden chess set with folding board and storage.', 34.99, '♟️', 'Games', 4.6, 67);

INSERT INTO reviews (product_id, author, rating, comment) VALUES
  (1, 'Alex M.', 5, 'Amazing sound quality and the noise cancellation is top notch!'),
  (1, 'Sarah K.', 4, 'Very comfortable for long sessions. Battery life is as advertised.'),
  (1, 'James T.', 5, 'Best headphones I have owned. Worth every penny.'),
  (2, 'Maria L.', 4, 'Great fit and very lightweight. Perfect for my morning runs.'),
  (2, 'Tom B.', 5, 'Super comfortable and durable. Highly recommend!'),
  (3, 'Linda H.', 5, 'Makes the best coffee. The built-in grinder is a game changer.'),
  (3, 'Chris P.', 4, 'Easy to use and clean. Great value for the price.'),
  (7, 'Emma R.', 5, 'Tracks everything accurately. Love the GPS feature.'),
  (7, 'David W.', 4, 'Solid smartwatch. Battery lasts the full 7 days easily.'),
  (8, 'Olivia S.', 5, 'Incredible cookbook. Every recipe I tried turned out amazing.');
