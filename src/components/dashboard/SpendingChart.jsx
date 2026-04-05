import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { useAppContext } from "../../context/AppContext";

const COLORS_LIGHT = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
  "#a855f7",
];

const COLORS_DARK = [
  "#818cf8",
  "#4ade80",
  "#fbbf24",
  "#f472b6",
  "#22d3ee",
  "#c084fc",
];

function SpendingChart({ data }) {
  const { theme } = useAppContext();
  const isDark = theme === "dark";
  const palette = isDark ? COLORS_DARK : COLORS_LIGHT;

  if (!data.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-600 dark:bg-gray-900">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No expense categories yet. Spending breakdown appears when you
          record expenses.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        Spending breakdown
      </h3>

      <div className="h-[280px] w-full min-h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius="78%"
              innerRadius="42%"
              paddingAngle={2}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={palette[index % palette.length]}
                  stroke={isDark ? "#0f172a" : "#fff"}
                  strokeWidth={1}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#fff",
                border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
                borderRadius: 8,
                color: isDark ? "#f1f5f9" : "#111827",
              }}
            />
            <Legend
              wrapperStyle={{ color: isDark ? "#cbd5e1" : "#374151" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingChart;
