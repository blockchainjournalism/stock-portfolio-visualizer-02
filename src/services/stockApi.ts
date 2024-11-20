import { toast } from "@/components/ui/use-toast";

const API_KEY = "tGgEwEGYdbqh35uXZzhhYYMz7CYpCTlD";
const BASE_URL = "https://financialmodelingprep.com/api/v3";

// Add localStorage caching
const CACHE_KEY = 'stockData';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  marketCap: number;
  volume: number;
}

interface CacheData {
  data: Stock[];
  timestamp: number;
}

const getCachedData = (): Stock[] | null => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp }: CacheData = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return data;
};

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
      return cachedData;
    }

    // If no cache, fetch from API
    const response = await fetch(
      `${BASE_URL}/stock-screener?apikey=${API_KEY}&limit=50&exchange=NASDAQ&isActivelyTrading=true`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from API");
    }

    const stocks = data.map((stock: any) => ({
      symbol: stock.symbol,
      name: stock.companyName,
      price: stock.price,
      change: stock.changes || 0,
      changesPercentage: stock.changesPercentage || 0,
      marketCap: stock.marketCap || 0,
      volume: stock.volume || 0
    }));

    // Cache the fetched data
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: stocks,
      timestamp: Date.now()
    }));

    return stocks;
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