import { Stock } from "@/services/stockApi";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SimilarStocksProps {
  stocks: Stock[];
  currentSymbol: string;
}

const SimilarStocks = ({ stocks, currentSymbol }: SimilarStocksProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  const similarStocks = stocks
    .filter((stock) => stock.symbol !== currentSymbol)
    .filter((stock) => stock.sector === stocks.find(s => s.symbol === currentSymbol)?.sector)
    .slice(0, 10);

  if (similarStocks.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Benzer Hisseler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarStocks.map((stock) => (
          <Link key={stock.symbol} to={`/stock/${stock.symbol}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{stock.symbol}</h3>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{formatNumber(stock.price)}</span>
                  <span className={`${
                    stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarStocks;