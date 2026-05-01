const db = require("../db");

exports.createExpense = (expense) => {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO expenses
    (id, amount, category, description, date, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    expense.id,
    expense.amount,
    expense.category,
    expense.description,
    expense.date,
    expense.created_at
  );

  return expense;
};

exports.getExpenses = ({ category, sort }) => {
  let query = `SELECT * FROM expenses`;
  const params = [];

  if (category) {
    query += ` WHERE category = ?`;
    params.push(category);
  }

  if (sort === "date_desc") {
    query += ` ORDER BY date DESC`;
  }

  return db.prepare(query).all(...params);
};