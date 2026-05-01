# Fenmo# Expense Tracker

## Tech Choices
- Node.js + Express
- SQLite (better-sqlite3)
- Vanilla JS frontend

## Key Decisions
- Amount stored in paise (INTEGER) to avoid float precision issues
- Idempotency handled using client-provided UUID
- SQLite for simplicity + persistence

## Trade-offs
- No authentication
- No pagination
- Minimal validation

## Not Implemented
- Advanced error handling UI
- Tests
- Category analytics

## Run

### Backend
cd backend
npm install
npm start

### Frontend
Open index.html in browser