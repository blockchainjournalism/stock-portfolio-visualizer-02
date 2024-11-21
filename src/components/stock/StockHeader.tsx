import React from 'react';
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockHeaderProps {
  name: string;
  symbol: string;
  priceTarget?: number;
  currentPrice: number;
  change: number;
  volume: number;
  marketCap: number;
}

const StockHeader = ({ 
  name, 
  symbol, 
  currentPrice,
  change,
  volume,
  marketCap 
}: StockHeaderProps) => {
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

  return (
    <div className="mb-8">
      <div className="bg-card-blue rounded-lg p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{name} ({symbol})</h1>
          <Button variant="ghost" className="text-white hover:text-white/80">
            <ExternalLink className="h-5 w-5 mr-2" />
            Al-Sat
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Fiyat</p>
            <p className="text-2xl font-bold">{formatNumber(currentPrice)}</p>
          </div>
          
          <div>
            <p className="text-white/70 text-sm mb-1">Değişim (24s)</p>
            <div className="flex items-center">
              {change >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400 mr-1" />
              )}
              <p className={`text-2xl font-bold ${
                change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-white/70 text-sm mb-1">Hacim (24s)</p>
            <p className="text-2xl font-bold">{volume.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-white/70 text-sm mb-1">Piyasa Değeri</p>
            <p className="text-2xl font-bold">{formatMarketCap(marketCap)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;