const API = "http://localhost:3000/expenses";

export async function getExpenses(params = "") {
  const res = await fetch(`${API}?${params}`);
  return res.json();
}

export async function createExpense(data) {
  return fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
}