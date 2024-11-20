import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchStocks } from "@/services/stockApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto py-8 flex-grow px-4">
          <div className="space-y-4">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-[200px] w-full" />
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow px-4">
        <h1 className="text-3xl font-bold mb-2">{stock.name}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{stock.symbol}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Price</h3>
            <p className="text-2xl">${stock.price.toFixed(2)}</p>
            <p className={`${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </p>
          </div>
          
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Market Cap</h3>
            <p className="text-2xl">${(stock.marketCap / 1e9).toFixed(2)}B</p>
          </div>
          
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Volume</h3>
            <p className="text-2xl">{stock.volume.toLocaleString()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StockDetail;