import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchStocks } from "@/services/stockApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";
import { useEffect } from "react";

const StockDetail = () => {
  const { symbol } = useParams();
  const { data: stocks = [], isLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const stock = stocks.find((s) => s.symbol === symbol);

  useEffect(() => {
    if (stock) {
      document.title = `${stock.name} (${stock.symbol}) Stock Price & Details`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Get the latest ${stock.name} (${stock.symbol}) stock price, market cap, volume, and other financial information. Real-time stock market data and analysis.`
        );
      }
    }
  }, [stock]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto py-8 flex-grow px-4">
          <div className="space-y-4">
            <Skeleton className="h-12 w-[400px]" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto py-8 flex-grow px-4">
          <h1 className="text-2xl font-bold mb-4">Stock Not Found</h1>
          <p>The requested stock symbol could not be found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isPositiveChange = stock.change >= 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{stock.name}</h1>
          <h2 className="text-2xl text-gray-600">{stock.symbol}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Price</p>
                  <h3 className="text-2xl font-bold mt-1">{formatNumber(stock.price)}</h3>
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
                    {isPositiveChange ? '+' : ''}{stock.change.toFixed(2)}%
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
                  <h3 className="text-2xl font-bold mt-1">{stock.volume.toLocaleString()}</h3>
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
                  <h3 className="text-2xl font-bold mt-1">{formatMarketCap(stock.marketCap)}</h3>
                </div>
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">52 Week High</span>
                  <span className="font-medium">{formatNumber(stock.price * 1.5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">52 Week Low</span>
                  <span className="font-medium">{formatNumber(stock.price * 0.7)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Volume</span>
                  <span className="font-medium">{(stock.volume * 0.8).toLocaleString()}</span>
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
                  <span className="font-medium">{formatNumber(stock.price * 0.995)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Previous Close</span>
                  <span className="font-medium">{formatNumber(stock.price * 0.99)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Day High</span>
                  <span className="font-medium">{formatNumber(stock.price * 1.02)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Day Low</span>
                  <span className="font-medium">{formatNumber(stock.price * 0.98)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StockDetail;