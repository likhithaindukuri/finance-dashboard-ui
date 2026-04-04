import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111827",
          color: "white",
          padding: "20px"
        }}
      >
        <h2>Finance UI</h2>

        <nav style={{ marginTop: "20px" }}>
          <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>
          <p><Link to="/transactions" style={{ color: "white" }}>Transactions</Link></p>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

    </div>
  );
}

export default MainLayout;