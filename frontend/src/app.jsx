import React, { useEffect, useState } from "react";

const API = "http://localhost:3000/expenses";

export default function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: ""
  });

  async function load() {
    const res = await fetch(API + "?sort=date_desc");
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        id: crypto.randomUUID()
      })
    });

    setForm({ amount: "", category: "", date: "" });
    load();
  }

  const total = data.reduce((sum, e) => sum + e.amount / 100, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form className="form" onSubmit={submit}>
        <input
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          required
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />

        <button type="submit">Add</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr key={e.id}>
              <td>₹{e.amount / 100}</td>
              <td>{e.category}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
}