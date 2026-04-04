import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function MainLayout({ children }) {
  const location = useLocation();

  const { role, setRole } = useAppContext();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`block px-3 py-2 rounded-lg transition ${
        location.pathname === path
          ? "bg-gray-700"
          : "hover:bg-gray-800"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-semibold">Finance UI</h2>

        <div className="mt-4">
          <label className="text-sm text-gray-400">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full bg-gray-800 text-white p-2 rounded-lg"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2">
          {navItem("/", "Dashboard")}
          {navItem("/transactions", "Transactions")}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;