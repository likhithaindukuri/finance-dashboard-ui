import { useState } from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import { useAppContext } from "../context/AppContext";

function Transactions() {
  // ✅ get role + transactions from context
  const { role, transactions } = useAppContext();

  // search input
  const [search, setSearch] = useState("");

  // filter type
  const [typeFilter, setTypeFilter] = useState("all");

  // filtering logic
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "all" || t.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Transactions
      </h1>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-48"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* ✅ Admin Only Button */}
      {role === "admin" && (
        <button className="mb-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          + Add Transaction
        </button>
      )}

      {/* Table */}
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default Transactions;