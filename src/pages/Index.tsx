import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "@/services/stockApi";
import StockTable from "@/components/StockTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const { data: stocks = [], isLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Stock Market Overview</h1>
        <div className="space-y-6">
          <StockTable stocks={stocks} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;