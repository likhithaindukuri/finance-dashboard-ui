# Finance Dashboard UI

**Frontend Developer Intern Assignment – Zorvyn**

An interactive finance dashboard built with React demonstrating:

- Modular UI components  
- State management  
- Role-based UI behavior  
- Data visualization  
- Responsive design  
- Mock data handling  

---

## Project Overview

This project simulates a user interface for tracking financial activity. Users can view their overall financial summary, explore transactions, and gain insights into their spending patterns. The application emphasizes clean design, intuitive navigation, and functional frontend architecture.

---

## Features Implemented

### 1. Dashboard Overview
- **Summary Cards:** Display Total Balance, Total Income, and Total Expenses.  
- **Balance Trend Chart:** Time-based visualization of running balance using Recharts.  
- **Responsive Layout:** Works on different screen sizes without breaking layout.  

### 2. Transactions Page
- **Transactions Table:** Lists all transactions with Date, Amount, Category, and Type.  
- **Search & Filter:** Quickly find transactions by description, category, or type.  

### 3. Role-Based UI
- **Admin Role:** Can simulate adding/editing transactions (frontend only).  
- **Viewer Role:** Can only view data.  
- **Role Switching:** Done via a dropdown toggle.  

### 4. Insights Section
- Auto-calculated financial insights:  
  - Highest spending category  
  - Monthly comparison of expenses  
  - Quick observations from mock data  

### 5. State Management
- Application state handled via React Context API.  
- Tracks transactions, filters, and selected user role.  

### 6. Data Handling
- Uses mock JSON data (`src/data/mockData.js`) to simulate transactions.  
- Includes data persistence using local storage.  

### 7. UI / UX Enhancements
- Full-width layout with professional sidebar navigation.  
- Clean, modern UI using Tailwind CSS.  
- Reduced top padding for immediate content visibility.  
- Responsive and accessible design for laptop screens.  

---

## Project Structure

```plaintext
src/
│
├── components/
│   ├── common/
│   ├── dashboard/
│   │   ├── SummaryCard.jsx
│   │   └── BalanceChart.jsx
│   └── transactions/
├── context/
│   └── AppContext.jsx
├── data/
│   └── mockData.js
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── Transactions.jsx
├── styles/
├── utils/
│   └── helpers.js
├── App.jsx
└── main.jsx


## Technologies Used

- React (Frontend Framework)  
- Vite (Fast React project setup)  
- Tailwind CSS (Styling & layout)  
- Recharts (Charts & data visualization)  
- React Router DOM (Routing)  
- Local Storage (Data persistence)  

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/likhithaindukuri/finance-dashboard-ui.git
cd finance-dashboard-ui

## Setup Instructions

2. **Install dependencies**
```bash
npm install

3. **Run the development server**
```bash
npm run dev

## Approach & Highlights

- Focused on modular and scalable folder structure for easy maintenance.
- Used React Context for simple, effective state management.
- Created dynamic charts using running balance calculations.
- Implemented role-based UI simulation to differentiate admin and viewer functionality.
- Clean layout with full-width dashboard to maximize screen space.
- Reduced extra padding to improve content visibility from top-left.

---

## Screenshots / Demo

*(Optional: Add screenshots of your dashboard pages or deployed app here)*

---

## Future Enhancements (Optional)

- Dark mode toggle for professional UI
- CSV/JSON export of transactions
- Animations and transitions for better UX
- Advanced filtering/grouping options

---

## Conclusion

This project demonstrates frontend development skills, UI design thinking, and state management. All core requirements of the Zorvyn Finance Dashboard assignment are implemented with a professional, clean, and responsive design.