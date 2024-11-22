import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchStocks, fetchStockProfile, fetchPriceTarget } from "@/services/stockApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import StockHeader from "@/components/stock/StockHeader";
import StockDetails from "@/components/stock/StockDetails";
import AnalystTargets from "@/components/stock/AnalystTargets";
import SimilarStocks from "@/components/stock/SimilarStocks";
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

  const { data: profile } = useQuery({
    queryKey: ["stockProfile", symbol],
    queryFn: () => fetchStockProfile(symbol!),
    enabled: !!symbol,
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
      document.title = `${stock.name} (${stock.symbol}) Stock Hedef Fiyat ve Detayları`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `${stock.name} (${stock.symbol}) hissesi için güncel Stock Hedef Fiyat, piyasa değeri, hacim ve diğer finansal bilgiler. Analist tahminleri ve hedef fiyat analizleri.`
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
          <h1 className="text-2xl font-bold mb-4">Hisse Bulunamadı</h1>
          <p>İstenen hisse sembolü bulunamadı.</p>
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
          currentPrice={stock.price}
          change={stock.change}
          volume={stock.volume}
          marketCap={stock.marketCap}
        />
        <AnalystTargets 
          currentPrice={stock.price}
          priceTarget={priceTarget || undefined}
        />
        <StockDetails 
          price={stock.price}
          volume={stock.volume}
          beta={stock.beta}
          lastDividend={stock.lastDividend}
          eps={stock.eps}
          pe={stock.pe}
          sharesOutstanding={stock.sharesOutstanding}
          industry={stock.industry}
          sector={stock.sector}
          description={profile?.description}
          ceo={profile?.ceo}
          employees={profile?.fullTimeEmployees}
          website={profile?.website}
        />
        <SimilarStocks stocks={stocks} currentSymbol={stock.symbol} />
      </main>
      <Footer />
    </div>
  );
};

export default StockDetail;