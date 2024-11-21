import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StockChartsProps {
  price: number;
  volume: number;
}

const StockCharts = ({ price, volume }: StockChartsProps) => {
  // Generate mock data for demonstration
  const generateMockData = () => {
    const data = [];
    const basePrice = price;
    const baseVolume = volume;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString(),
        price: basePrice * (0.95 + Math.random() * 0.1),
        volume: baseVolume * (0.8 + Math.random() * 0.4),
      });
    }
    return data;
  };

  const data = generateMockData();

  const chartConfig = {
    price: {
      color: "#2C74B3",
      label: "Price"
    },
    volume: {
      color: "#144272",
      label: "Volume"
    },
    area: {
      color: "#0A2647",
      label: "Price Area"
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Price History (30 Days)</h3>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval={6}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={chartConfig.price.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Volume Trend</h3>
            <div className="h-[250px]">
              <ChartContainer config={chartConfig}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    interval={6}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="volume"
                    fill={chartConfig.volume.color}
                    opacity={0.8}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Price Area Chart</h3>
            <div className="h-[250px]">
              <ChartContainer config={chartConfig}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    interval={6}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={chartConfig.area.color}
                    fill={chartConfig.price.color}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockCharts;