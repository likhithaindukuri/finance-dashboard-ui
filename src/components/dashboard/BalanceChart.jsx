import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAppContext } from "../../context/AppContext";

function BalanceChart({ data }) {
  const { theme } = useAppContext();
  const isDark = theme === "dark";
  const grid = isDark ? "#334155" : "#e5e7eb";
  const axis = isDark ? "#94a3b8" : "#6b7280";
  const lineColor = isDark ? "#818cf8" : "#4f46e5";

  if (!data.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-600 dark:bg-gray-900">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add transactions to see your balance trend over time.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        Balance trend
      </h3>

      <div className="h-[280px] w-full min-h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis dataKey="date" tick={{ fill: axis, fontSize: 12 }} />
            <YAxis tick={{ fill: axis, fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#fff",
                border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
                borderRadius: 8,
                color: isDark ? "#f1f5f9" : "#111827",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BalanceChart;
