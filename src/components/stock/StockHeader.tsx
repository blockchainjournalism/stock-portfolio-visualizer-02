import React from 'react';

interface StockHeaderProps {
  name: string;
  symbol: string;
  priceTarget?: number;
}

const StockHeader = ({ name, symbol, priceTarget }: StockHeaderProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <h2 className="text-2xl text-gray-600 mb-4">{symbol}</h2>
      {priceTarget && (
        <div className="bg-accent/10 rounded-lg p-4 inline-block">
          <p className="text-sm font-medium text-accent mb-1">Price Target</p>
          <p className="text-2xl font-bold text-accent">{formatNumber(priceTarget)}</p>
        </div>
      )}
    </div>
  );
};

export default StockHeader;