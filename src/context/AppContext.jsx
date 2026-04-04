import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer"); // default role

  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
}

// custom hook (professional practice)
export function useAppContext() {
  return useContext(AppContext);
}