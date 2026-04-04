import SummaryCard from "../components/dashboard/SummaryCard";
import { transactions } from "../data/mockData";

function Dashboard() {
  // calculate totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={totalBalance} />
        <SummaryCard title="Total Income" amount={totalIncome} />
        <SummaryCard title="Total Expenses" amount={totalExpenses} />
      </div>
    </div>
  );
}

export default Dashboard;