import { useMemo, useState } from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import { useAppContext } from "../context/AppContext";
import {
  groupTransactions,
  sortTransactions,
  uniqueCategories,
} from "../utils/transactions";
import { exportTransactionsCSV, exportTransactionsJSON } from "../utils/export";

function Transactions() {
  const {
    role,
    transactions,
    addTransaction,
    updateTransaction,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [groupBy, setGroupBy] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const categories = useMemo(
    () => uniqueCategories(transactions),
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q);

      const matchesType = typeFilter === "all" || t.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  const sorted = useMemo(
    () => sortTransactions(filteredTransactions, sortBy),
    [filteredTransactions, sortBy]
  );

  const groups = useMemo(
    () => groupTransactions(sorted, groupBy),
    [sorted, groupBy]
  );

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(t) {
    setEditing(t);
    setModalOpen(true);
  }

  function handleSave(payload) {
    if (editing) {
      updateTransaction(editing.id, payload);
    } else {
      addTransaction(payload);
    }
  }

  return (
    <div className="animate-page-enter w-full min-w-0 max-w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Transactions
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Filter, sort, group, and export your activity. Admins can add or edit
        rows (saved in this browser).
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {role === "admin" && (
            <button
              type="button"
              onClick={openAdd}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              + Add transaction
            </button>
          )}
          <button
            type="button"
            onClick={() => exportTransactionsCSV(sorted)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => exportTransactionsJSON(sorted)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Export JSON
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {sorted.length}
          </span>{" "}
          of {transactions.length}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <input
            type="search"
            placeholder="Search description, category, type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-indigo-500 xl:col-span-2"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="date-desc">Date · newest</option>
            <option value="date-asc">Date · oldest</option>
            <option value="amount-desc">Amount · high</option>
            <option value="amount-asc">Amount · low</option>
          </select>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="none">No grouping</option>
            <option value="category">Group by category</option>
            <option value="month">Group by month</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <TransactionTable
          groups={groups}
          role={role}
          onEdit={openEdit}
        />
      </div>

      {modalOpen && (
        <TransactionFormModal
          key={editing?.id ?? "new"}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initial={editing}
        />
      )}
    </div>
  );
}

export default Transactions;
