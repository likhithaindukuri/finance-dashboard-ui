import TransactionTable from "../components/transactions/TransactionTable";
import { transactions } from "../data/mockData";

function Transactions() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Transactions
      </h1>

      <TransactionTable transactions={transactions} />
    </div>
  );
}

export default Transactions;