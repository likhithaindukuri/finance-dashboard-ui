import { Fragment } from "react";

function TransactionTable({ groups, role, onEdit }) {
  const totalRows = groups.reduce((n, g) => n + g.items.length, 0);

  if (totalRows === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white/80 p-12 text-center transition-colors duration-200 dark:border-gray-600 dark:bg-gray-900/80">
        <p className="text-gray-600 dark:text-gray-400">
          No transactions match your filters.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Try clearing search or widening your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-gray-50 text-left text-gray-600 dark:bg-gray-800/80 dark:text-gray-300">
            <tr>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 text-right font-medium">Amount</th>
              {role === "admin" && (
                <th className="p-4 text-right font-medium">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-gray-200">
            {groups.map((group) => (
              <Fragment key={group.key}>
                {group.label && (
                  <tr className="bg-gray-100/90 dark:bg-gray-800/50">
                    <td
                      colSpan={role === "admin" ? 6 : 5}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
                    >
                      {group.label}
                    </td>
                  </tr>
                )}
                {group.items.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-gray-100 transition-colors duration-150 hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-800/40"
                  >
                    <td className="whitespace-nowrap p-4">{t.date}</td>
                    <td className="p-4">{t.description}</td>
                    <td className="p-4">{t.category}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium transition-colors ${
                          t.type === "income"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td
                      className={`p-4 text-right font-medium tabular-nums ${
                        t.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      ₹ {t.amount.toLocaleString()}
                    </td>
                    {role === "admin" && (
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => onEdit(t)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
