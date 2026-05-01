const Database = require("better-sqlite3");

const db = new Database("expenses.db");

db.exec(`
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  amount INTEGER,
  category TEXT,
  description TEXT,
  date TEXT,
  created_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_date ON expenses(date);
`);

module.exports = db;