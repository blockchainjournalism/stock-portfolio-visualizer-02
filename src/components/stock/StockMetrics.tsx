import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";

interface StockMetricsProps {
  price: number;
  change: number;
  volume: number;
  marketCap: number;
}

const StockMetrics = ({ price, change, volume, marketCap }: StockMetricsProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`;
    return formatNumber(marketCap);
  };

  const isPositiveChange = change >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Price</p>
              <h3 className="text-2xl font-bold mt-1">{formatNumber(price)}</h3>
            </div>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Change</p>
              <h3 className={`text-2xl font-bold mt-1 ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveChange ? '+' : ''}{change.toFixed(2)}%
              </h3>
            </div>
            {isPositiveChange ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Volume</p>
              <h3 className="text-2xl font-bold mt-1">{volume.toLocaleString()}</h3>
            </div>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Market Cap</p>
              <h3 className="text-2xl font-bold mt-1">{formatMarketCap(marketCap)}</h3>
            </div>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockMetrics;