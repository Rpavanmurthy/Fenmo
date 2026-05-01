# Expense Tracker (Full-Stack)

A minimal **production-like Expense Tracker** built with:

*  Node.js + Express (Backend API)
* React + Vite (Frontend)
* SQLite (Persistence)
* Redis (Idempotency / retry safety)
* Docker (Local infra)

---

## Features

* Add expenses (amount, category, date)
* View list of expenses
* Filter by category
* Sort by date (newest first)
* View total of visible expenses
* Idempotent API (safe retries)
* Handles real-world conditions (refresh, retry)

---

##  Architecture

```
Frontend (React - Vite)
        ↓
Backend API (Node + Express)
        ↓
SQLite (data)
        ↓
Redis (idempotency cache)
```

---

## Project Structure

```
expense-tracker/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── db.js
│   ├── redis.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
│
└── docker-compose.yml
```

---

## Local Setup

### Clone the repo

```
git clone https://github.com/<your-username>/fenmo.git
cd fenmo
```

---

### Start Redis (Docker)

```
docker run -d -p 6379:6379 redis
```

---

### Run Backend

```
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:3000
```

---

### Run Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Deployment

### Backend (Render)

* Create Web Service
* Root: `backend`
* Build: `npm install`
* Start: `npm start`
* Add Redis instance
* Add env:

```
REDIS_URL=<your-redis-url>
```

---

### Frontend (Vercel)

* Import `frontend`
* Framework: Vite
* Add env:

```
VITE_API_URL=https://your-backend-url/expenses
```

---

## Key Design Decisions

### 1. Money Handling

* Stored as **integer (paise)** instead of float
* Avoids precision issues

---

### 2. Idempotency (Important)

* Each request includes a unique `id`
* Redis caches processed requests
* Prevents duplicate entries on retries

---

### 3. Database Choice

* SQLite used for simplicity and portability
* Suitable for small-scale apps

---

### 4. API Design

#### POST `/expenses`

Create expense

#### GET `/expenses`

Supports:

* `category` filter
* `sort=date_desc`
* pagination

---

## Testing

Basic API tests using:

* Jest
* Supertest

Run:

```
npm test
```

---

## What this project demonstrates

* Full-stack system design
* API correctness under retries
* Handling real-world network issues
* Clean architecture & separation
* Production-like thinking

---

## Author

Pavan Murthy

---
