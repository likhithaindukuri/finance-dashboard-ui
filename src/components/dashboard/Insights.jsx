function Insights({ transactions }) {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  let highestCategory = "—";
  let highestAmount = 0;
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expenses;

  const byMonth = {};
  transactions.forEach((t) => {
    const key = t.date.slice(0, 7);
    if (!byMonth[key]) {
      byMonth[key] = { income: 0, expense: 0 };
    }
    if (t.type === "income") byMonth[key].income += t.amount;
    else byMonth[key].expense += t.amount;
  });

  const monthKeys = Object.keys(byMonth).sort();
  let monthCompare = null;
  if (monthKeys.length >= 2) {
    const prev = monthKeys[monthKeys.length - 2];
    const curr = monthKeys[monthKeys.length - 1];
    const deltaExpense = byMonth[curr].expense - byMonth[prev].expense;
    const pct =
      byMonth[prev].expense > 0
        ? Math.round((deltaExpense / byMonth[prev].expense) * 100)
        : null;
    monthCompare = {
      prev,
      curr,
      prevExpense: byMonth[prev].expense,
      currExpense: byMonth[curr].expense,
      deltaExpense,
      pct,
    };
  }

  let message = "";
  if (savings > 0) {
    message = "You are spending less than you earn for the selected data.";
  } else if (savings < 0) {
    message = "Expenses exceed income — worth reviewing discretionary spend.";
  } else {
    message = "Income and expenses are balanced.";
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Insights
      </h3>

      <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <li>
          <span className="text-gray-500 dark:text-gray-400">
            Highest spending category:{" "}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {highestCategory}
            {highestAmount > 0 && (
              <span className="font-normal text-gray-600 dark:text-gray-400">
                {" "}
                (₹ {highestAmount.toLocaleString()})
              </span>
            )}
          </span>
        </li>

        <li>
          <span className="text-gray-500 dark:text-gray-400">
            Net (income − expenses):{" "}
          </span>
          <span
            className={`font-medium tabular-nums ${
              savings >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            ₹ {savings.toLocaleString()}
          </span>
        </li>

        {monthCompare && (
          <li>
            <span className="text-gray-500 dark:text-gray-400">
              Monthly comparison (expenses):{" "}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {monthCompare.prev} → {monthCompare.curr}: ₹{" "}
              {monthCompare.prevExpense.toLocaleString()} → ₹{" "}
              {monthCompare.currExpense.toLocaleString()}
            </span>
            {monthCompare.pct !== null && (
              <span className="ml-1 text-gray-600 dark:text-gray-400">
                (
                {monthCompare.deltaExpense >= 0 ? "+" : ""}
                {monthCompare.pct}% vs prior month)
              </span>
            )}
          </li>
        )}

        <li className="text-gray-600 dark:text-gray-400">{message}</li>
      </ul>
    </div>
  );
}

export default Insights;
