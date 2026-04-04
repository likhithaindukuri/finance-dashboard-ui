import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  function BalanceChart({ data }) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-medium mb-4">Balance Trend</h3>
  
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default BalanceChart;