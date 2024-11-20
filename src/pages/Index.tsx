import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "@/services/stockApi";
import StockTable from "@/components/StockTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const { data: stocks = [], isLoading, isError } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
    staleTime: 60000, // Cache data for 1 minute
    refetchInterval: 60000, // Refetch every minute
    retry: 2, // Retry failed requests twice
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow px-4">
        <h1 className="text-3xl font-bold mb-6">Stock Market Overview</h1>
        <div className="space-y-6">
          <StockTable stocks={stocks} isLoading={isLoading} />
          {isError && (
            <p className="text-red-500 text-center">
              Failed to load stock data. Please try again later.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;