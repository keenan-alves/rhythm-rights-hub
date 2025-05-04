
import { useId } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Split } from "@/types/music";

interface SplitPieChartProps {
  splits: Split[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: Split;
  }>;
}

const WRITER_COLORS = [
  "#8B5CF6", // primary purple
  "#6366F1", // indigo
  "#A78BFA", // purple light
  "#8B5CF6", // purple
  "#7C3AED", // purple darker
];

const PUBLISHER_COLORS = [
  "#F97316", // accent orange
  "#FB923C", // orange lighter
  "#F59E0B", // amber
  "#FBBF24", // amber lighter
  "#F59E0B", // amber
];

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded p-3 shadow-lg">
        <p className="font-semibold">{data.contributor.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.contributor.type === "writer" ? "Writer" : "Publisher"}
        </p>
        <p className="text-sm font-medium">{data.percentage}%</p>
      </div>
    );
  }

  return null;
};

export const SplitPieChart = ({ splits }: SplitPieChartProps) => {
  // Transform splits data for the chart
  const chartData = splits.map(split => ({
    name: split.contributor.name,
    value: split.percentage,
    ...split,
  }));
  
  const chartId = useId();

  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            fill="#8B5CF6"
            paddingAngle={1}
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${chartId}-${index}`}
                fill={
                  entry.contributor.type === "writer" 
                    ? WRITER_COLORS[index % WRITER_COLORS.length] 
                    : PUBLISHER_COLORS[index % PUBLISHER_COLORS.length]
                }
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
