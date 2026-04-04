import { createContext, useContext, useEffect, useState } from "react";
import { transactions as mockTransactions } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {

  // ---- load transactions from localStorage ----
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  // ---- load role from localStorage ----
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "viewer";
  });

  // ---- persist transactions ----
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // ---- persist role ----
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);