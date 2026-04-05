# Finance Dashboard UI

**Frontend Developer Intern Assignment**

An interactive finance dashboard built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**. It uses **mock data** plus **local persistence** so you can demonstrate filtering, role-based UI, and edits without a backend.

---

## What’s included (assignment coverage)

### Dashboard overview

- Summary cards: **Total balance**, **Total income**, **Total expenses**
- **Balance trend** (time-based line chart; transactions sorted by date for a correct running balance)
- **Spending breakdown** (categorical donut chart)
- **Insights**: highest spending category, net savings, **month-over-month expense comparison** when multiple months exist, plus a short observation
- **Empty state** when there are no transactions

### Transactions

- Table: **Date**, **Description**, **Category**, **Type**, **Amount**
- **Search** across description, category, and type
- **Filters**: type (all / income / expense), **category**
- **Sort**: date (new/old), amount (high/low)
- **Group by**: none, **category**, or **month** (section headers in the table)
- **Export**: **CSV** and **JSON** of the **currently filtered & sorted** list

### Role-based UI (simulated)

- **Viewer**: read-only; no add/edit controls
- **Admin**: **Add transaction**, **Edit** per row, changes persisted in **localStorage**
- Role stored in localStorage and switchable from the sidebar

### State management

- **React Context** (`AppContext`): transactions, role, theme, and CRUD helpers

### UI / UX

- **Dark mode** toggle (persisted); `index.html` snippet avoids a flash of the wrong theme on load
- **Responsive** layout: stacked header/nav on small screens, sidebar + main on `md+`
- **Transitions**: hover states, page enter animation, modal backdrop
- Full-width app shell (no fixed `1126px` root container)

---

## Optional enhancements (implemented)

| Feature | Notes |
|--------|--------|
| Dark mode | Sidebar toggle + `dark` class on `<html>`; chart/tooltip colors follow theme |
| Data persistence | `transactions`, `role`, `theme` in `localStorage` |
| Animations | `.animate-page-enter` for route content; transitions on cards, rows, modal |
| Export | `src/utils/export.js` — CSV + JSON download |
| Advanced filter / group | Category filter + group by category or month |

---

## Demo

<video src="public/FinanceDashboard.mp4" controls width="100%"></video>

---

## Tech stack

- React 19, Vite 8, React Router 7  
- Tailwind CSS 4 (`@tailwindcss/vite`)  
- Recharts  

---

## Setup

```bash
git clone https://github.com/likhithaindukuri/finance-dashboard-ui.git
cd finance-dashboard-ui
npm install
npm run dev
```

## Project layout (high level)

- `src/context/AppContext.jsx` — global state & persistence  
- `src/pages/` — Dashboard, Transactions  
- `src/components/dashboard/` — cards, charts, insights  
- `src/components/transactions/` — table, add/edit modal  
- `src/data/mockData.js` — seed transactions (includes two months for insights)  
- `src/utils/transactions.js` — sort & group helpers  
- `src/utils/export.js` — CSV / JSON export 
