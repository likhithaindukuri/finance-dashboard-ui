import SummaryCard from "../components/dashboard/SummaryCard";
import { useAppContext } from "../context/AppContext";
import BalanceChart from "../components/dashboard/BalanceChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import Insights from "../components/dashboard/Insights";

function Dashboard() {
  const { transactions } = useAppContext();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const sortedForTrend = [...transactions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const chartData = sortedForTrend.reduce(
    (acc, t) => {
      const balance =
        acc.running + (t.type === "income" ? t.amount : -t.amount);
      return {
        running: balance,
        rows: [...acc.rows, { date: t.date.slice(5), balance }],
      };
    },
    { running: 0, rows: [] }
  ).rows;

  const categoryMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

  const spendingData = Object.keys(categoryMap).map((category) => ({
    category,
    value: categoryMap[category],
  }));

  return (
    <div className="animate-page-enter w-full min-w-0 max-w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard overview
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Summary, trends, and spending mix from your stored transactions.
      </p>

      {transactions.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-600 dark:bg-gray-900">
          <p className="text-gray-700 dark:text-gray-300">
            No transactions yet. Switch to{" "}
            <span className="font-medium">Admin</span> on the Transactions page
            to add your first entry (data stays in this browser).
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <SummaryCard title="Total balance" amount={totalBalance} />
            <SummaryCard title="Total income" amount={totalIncome} />
            <SummaryCard title="Total expenses" amount={totalExpenses} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BalanceChart data={chartData} />
            <SpendingChart data={spendingData} />
          </div>

          <div className="mt-6">
            <Insights transactions={transactions} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
