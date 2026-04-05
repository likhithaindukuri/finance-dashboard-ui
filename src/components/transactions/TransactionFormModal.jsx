import { useState } from "react";

const emptyForm = {
  date: "",
  description: "",
  amount: "",
  category: "",
  type: "expense",
};

function formStateFromInitial(initial) {
  if (initial) {
    return {
      date: initial.date,
      description: initial.description,
      amount: String(initial.amount),
      category: initial.category,
      type: initial.type,
    };
  }
  return {
    ...emptyForm,
    date: new Date().toISOString().slice(0, 10),
  };
}

function TransactionFormModal({ onClose, onSave, initial }) {
  const [form, setForm] = useState(() => formStateFromInitial(initial));

  function handleSubmit(e) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.date || !form.description.trim() || !form.category.trim()) {
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }
    onSave({
      date: form.date,
      description: form.description.trim(),
      amount,
      category: form.category.trim(),
      type: form.type,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="txn-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl transition-transform duration-200 dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="txn-modal-title"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          {initial ? "Edit transaction" : "Add transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Date
            </label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Description
            </label>
            <input
              type="text"
              required
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Amount (₹)
            </label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Category
            </label>
            <input
              type="text"
              required
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionFormModal;
