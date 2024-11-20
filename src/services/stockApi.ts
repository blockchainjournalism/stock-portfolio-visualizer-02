import { toast } from "@/components/ui/use-toast";

const API_KEY = "tGgEwEGYdbqh35uXZzhhYYMz7CYpCTlD";
const BASE_URL = "https://financialmodelingprep.com/api/v3";

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  marketCap: number;
  volume: number;
}

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    // Using stock screener endpoint which provides more reliable data
    const response = await fetch(
      `${BASE_URL}/stock-screener?apikey=${API_KEY}&limit=100&exchange=NASDAQ&isActivelyTrading=true`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from API");
    }

    return data.map((stock: any) => ({
      symbol: stock.symbol,
      name: stock.companyName,
      price: stock.price,
      change: stock.changes || 0,
      changesPercentage: stock.changesPercentage || 0,
      marketCap: stock.marketCap || 0,
      volume: stock.volume || 0
    }));
  } catch (error) {
    console.error("Failed to fetch stocks:", error);
    toast({
      title: "Error",
      description: "Failed to fetch stock data. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
};