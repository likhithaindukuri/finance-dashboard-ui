import SummaryCard from "../components/dashboard/SummaryCard";
import { transactions } from "../data/mockData";
import BalanceChart from "../components/dashboard/BalanceChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import Insights from "../components/dashboard/Insights";

function Dashboard() {
  // calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // create running balance data
  let runningBalance = 0;

  const chartData = transactions.map((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;

    return {
      date: t.date.slice(5), // MM-DD
      balance: runningBalance,
    };
  });

  // spending by category
  const categoryMap = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

  const spendingData = Object.keys(categoryMap).map((category) => ({
    category,
    value: categoryMap[category],
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={totalBalance} />
        <SummaryCard title="Total Income" amount={totalIncome} />
        <SummaryCard title="Total Expenses" amount={totalExpenses} />
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart data={chartData} />
        <SpendingChart data={spendingData} />
      </div>
      <div className="mt-8">
        <Insights transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;