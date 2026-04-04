function SummaryCard({ title, amount }) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-semibold mt-2">₹ {amount.toLocaleString()}</p>
      </div>
    );
  }
  
  export default SummaryCard;