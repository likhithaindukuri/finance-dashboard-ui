import { createContext, useContext, useEffect, useState } from "react";
import { transactions as mockTransactions } from "../data/mockData";

const AppContext = createContext();

function nextId(list) {
  return list.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "viewer";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function addTransaction(payload) {
    setTransactions((prev) => [
      ...prev,
      { id: nextId(prev), ...payload },
    ]);
  }

  function updateTransaction(id, payload) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...payload, id: t.id } : t))
    );
  }

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        theme,
        setTheme,
        toggleTheme,
        addTransaction,
        updateTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook is colocated with provider for a small app; Fast Refresh expects component-only exports in some setups.
// eslint-disable-next-line react-refresh/only-export-components -- context hook paired with provider
export const useAppContext = () => useContext(AppContext);
