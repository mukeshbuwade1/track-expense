# Expense Tracker

A production-ready full-stack expense tracking application.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite, TanStack Query, Zustand, React Hook Form + Zod, Tailwind CSS, Recharts
- **Backend:** Node.js + Express + TypeScript, Mongoose, JWT + HTTP-only refresh cookie
- **Database:** MongoDB Atlas

## Getting Started

### 1. Server Setup

```bash
cd server
cp .env.example .env
# Fill in your MongoDB Atlas URI and JWT secrets
npm install
npm run dev
```

### 2. Client Setup

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and proxies `/api` calls to `http://localhost:5000`.

## Environment Variables (server/.env)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_ACCESS_SECRET` | Secret for access tokens (min 32 chars) |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens (min 32 chars) |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry (default: `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry (default: `7d`) |
| `CLIENT_URL` | Frontend origin for CORS (default: `http://localhost:5173`) |
| `PORT` | Server port (default: `5000`) |

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET  /api/auth/me`

### Expenses (protected)
- `GET    /api/expenses` — list with `page, limit, search, category, startDate, endDate`
- `POST   /api/expenses`
- `GET    /api/expenses/:id`
- `PUT    /api/expenses/:id`
- `DELETE /api/expenses/:id`

### Dashboard (protected)
- `GET /api/dashboard/summary`

## Features

- ✅ Add / Edit / Delete Expenses
- ✅ Search Expenses (debounced)
- ✅ Filter by Category + Date Range
- ✅ Paginated Expense History
- ✅ Dashboard: Total, Monthly, Category Breakdown
- ✅ Monthly Bar Chart (Recharts)
- ✅ Category Pie Chart (Recharts)
- ✅ Recent Transactions Widget
- ✅ User Authentication (JWT + HTTP-only cookie)
- ✅ Dark Mode (persisted)
- ✅ Responsive UI (mobile-first Tailwind)
- ✅ Screen-level Error Boundaries with Home button
- ✅ Form Validation (Zod + React Hook Form)
- ✅ Toast Notifications
