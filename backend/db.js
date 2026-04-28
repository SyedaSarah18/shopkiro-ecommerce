const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'shop.db');
const SCHEMA_PATH = path.join(__dirname, '../database/init.sql');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize schema and seed data if DB is new
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='products'").get();
if (!tables) {
  const sql = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(sql);
  console.log('Database initialized with schema and seed data.');
}

module.exports = db;
