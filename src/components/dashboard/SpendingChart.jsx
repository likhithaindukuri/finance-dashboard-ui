import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
  } from "recharts";
  
  function SpendingChart({ data }) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-medium mb-4">Spending Breakdown</h3>
  
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="category"
                outerRadius={100}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
  
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default SpendingChart;