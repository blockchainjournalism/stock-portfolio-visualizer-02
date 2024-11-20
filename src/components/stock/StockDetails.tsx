import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface StockDetailsProps {
  price: number;
  volume: number;
}

const StockDetails = ({ price, volume }: StockDetailsProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">52 Week High</span>
              <span className="font-medium">{formatNumber(price * 1.5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">52 Week Low</span>
              <span className="font-medium">{formatNumber(price * 0.7)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Average Volume</span>
              <span className="font-medium">{(volume * 0.8).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">P/E Ratio</span>
              <span className="font-medium">{(Math.random() * 30 + 10).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Trading Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Open</span>
              <span className="font-medium">{formatNumber(price * 0.995)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Previous Close</span>
              <span className="font-medium">{formatNumber(price * 0.99)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Day High</span>
              <span className="font-medium">{formatNumber(price * 1.02)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Day Low</span>
              <span className="font-medium">{formatNumber(price * 0.98)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockDetails;