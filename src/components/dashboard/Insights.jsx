function Insights({ transactions }) {
    // ---- highest spending category ----
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
  
    const categoryTotals = {};
  
    expenseTransactions.forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    });
  
    let highestCategory = "N/A";
    let highestAmount = 0;
  
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = category;
      }
    });
  
    // ---- income vs expense ----
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  
    const savings = income - expenses;
  
    // ---- insight message ----
    let message = "";
  
    if (savings > 0) {
      message = "You are saving money this month ";
    } else if (savings < 0) {
      message = "Expenses exceeded income ⚠️";
    } else {
      message = "Income and expenses are balanced.";
    }
  
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold mb-4">
          Financial Insights
        </h3>
  
        <div className="space-y-3 text-gray-700">
          <p>
            Highest spending category:
            <span className="font-medium"> {highestCategory}</span>
          </p>
  
          <p>
            Monthly savings:
            <span className="font-medium">
              {" "}
              ₹ {savings.toLocaleString()}
            </span>
          </p>
  
          <p className="text-sm text-gray-500">{message}</p>
        </div>
      </div>
    );
  }
  
  export default Insights;