import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function MainLayout({ children }) {
  const location = useLocation();
  const { role, setRole, theme, toggleTheme } = useAppContext();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        location.pathname === path
          ? "bg-white/15 text-white"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col bg-gray-100 text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100 md:flex-row">
      <aside className="flex shrink-0 flex-col border-b border-gray-800 bg-gray-900 text-white md:w-60 md:border-b-0 md:border-r">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-gray-800 p-4 md:block">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Finance UI</h2>
            <p className="mt-0.5 hidden text-xs text-gray-400 sm:block">
              Dashboard & transactions
            </p>
          </div>
          <div className="min-w-[140px] flex-1 md:mt-4 md:w-full md:flex-none">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <nav className="flex gap-1 px-3 py-3 md:flex-col md:py-0 md:pb-4">
          {navItem("/", "Dashboard")}
          {navItem("/transactions", "Transactions")}
        </nav>

        <div className="mt-auto border-t border-gray-800 p-3 md:p-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            <span aria-hidden>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="hidden sm:inline">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
            <span className="sm:hidden">Theme</span>
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-5 md:p-6">
        <div className="mx-auto w-full max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;
