import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-color-light">No data available</p>;
  }

  return (
    <div  className="bg-surface mt-6 p-2 rounded-md">
       <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip}/>
        <Legend content={<CustomLegend/>}/>
      </PieChart>
    </ResponsiveContainer>
    </div>
   
  );
};

export default CustomPieChart;
