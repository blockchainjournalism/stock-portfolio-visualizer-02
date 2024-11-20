import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchStocks, fetchPriceTarget } from "@/services/stockApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import StockHeader from "@/components/stock/StockHeader";
import StockMetrics from "@/components/stock/StockMetrics";
import StockDetails from "@/components/stock/StockDetails";
import { useEffect } from "react";

const StockDetail = () => {
  const { symbol } = useParams();

  const { data: stocks = [], isLoading: isLoadingStocks } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: priceTarget } = useQuery({
    queryKey: ["priceTarget", symbol],
    queryFn: () => fetchPriceTarget(symbol!),
    enabled: !!symbol,
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

  if (isLoadingStocks) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow px-4">
        <StockHeader 
          name={stock.name} 
          symbol={stock.symbol} 
          priceTarget={priceTarget || undefined}
          currentPrice={stock.price}
        />
        <StockMetrics 
          price={stock.price}
          change={stock.change}
          volume={stock.volume}
          marketCap={stock.marketCap}
        />
        <StockDetails 
          price={stock.price}
          volume={stock.volume}
        />
      </main>
      <Footer />
    </div>
  );
};

export default StockDetail;