import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Custom Bar Chart Component
const CustomBarChart = ({ data }) => {
  // Function to determine bar color based on priority
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "high":
        return "#FF1F57"; // Red
      case "medium":
        return "#FE9900"; // Orange
      case "low":
        return "#00BC7D"; // Green
      default:
        return "#00BC7D"; // Default to green if unknown
    }
  };

  // Custom Tooltip for hover display
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface shadow-md rounded-md p-2 border border-gray-300">
          <p className="metadata-font-size font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="metadata-font-size text-gray-600">
            Count:{" "}
            <span className="metadata-font-size font-medium text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Show loading or fallback if no data
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="bg-surface mt-6 p-5 rounded-md ">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* Grid background */}
          <CartesianGrid stroke="none" />

          {/* X-Axis and Y-Axis */}
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#999" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#999" }} stroke="none" />

          {/* Tooltip with custom styling */}
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

          {/* Bars */}
          <Bar
            dataKey="count"
            nameKey="priority"
            radius={[10, 10, 0, 0]} // Rounded top corners
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
