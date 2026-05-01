const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const redis = require("../redis");

// POST (idempotent)
router.post("/", async (req, res) => {
  const { amount, category, description, date, id } = req.body;

  const key = `expense:${id}`;

  const exists = await redis.get(key);
  if (exists) {
    return res.json(JSON.parse(exists));
  }

  const expense = {
    id: id || uuidv4(),
    amount: Math.round(amount * 100),
    category,
    description,
    date,
    created_at: new Date().toISOString()
  };

  db.prepare(`
    INSERT OR IGNORE INTO expenses VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    expense.id,
    expense.amount,
    expense.category,
    expense.description,
    expense.date,
    expense.created_at
  );

  await redis.set(key, JSON.stringify(expense), "EX", 3600);

  res.json(expense);
});

// GET with pagination
router.get("/", (req, res) => {
  const { category, sort, page = 1, limit = 10 } = req.query;

  let query = "SELECT * FROM expenses";
  let params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  if (sort === "date_desc") {
    query += " ORDER BY date DESC";
  }

  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), (page - 1) * limit);

  const data = db.prepare(query).all(...params);

  res.json(data);
});

module.exports = router;