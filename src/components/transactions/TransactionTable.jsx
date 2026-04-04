function TransactionTable({ transactions }) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Type</th>
              <th className="text-right p-4">Amount</th>
            </tr>
          </thead>
  
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{t.date}</td>
                <td className="p-4">{t.description}</td>
                <td className="p-4">{t.category}</td>
  
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
  
                <td
                  className={`p-4 text-right font-medium ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TransactionTable;