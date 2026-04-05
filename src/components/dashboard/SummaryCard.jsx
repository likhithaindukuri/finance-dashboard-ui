function SummaryCard({ title, amount }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-gray-900 dark:text-white">
        ₹ {amount.toLocaleString()}
      </p>
    </div>
  );
}

export default SummaryCard;
