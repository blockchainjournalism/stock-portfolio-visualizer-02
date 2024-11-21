import { toast } from "@/components/ui/use-toast";

const API_KEY = "tGgEwEGYdbqh35uXZzhhYYMz7CYpCTlD";
const BASE_URL = "https://financialmodelingprep.com/api/v3";

const CACHE_KEY = 'stockData';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  marketCap: number;
  volume: number;
  beta?: number;
  lastDividend?: number;
  eps?: number;
  pe?: number;
  sharesOutstanding?: number;
  industry?: string;
  sector?: string;
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
    const cachedData = getCachedData();
    if (cachedData) {
      return cachedData;
    }

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
      volume: stock.volume || 0,
      beta: stock.beta,
      lastDividend: stock.lastDiv,
      eps: stock.eps,
      pe: stock.pe,
      sharesOutstanding: stock.sharesOutstanding,
      industry: stock.industry,
      sector: stock.sector
    }));

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

export const fetchStockProfile = async (symbol: string): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/profile/${symbol}?apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Failed to fetch stock profile:", error);
    return null;
  }
};

export const fetchPriceTarget = async (symbol: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/price-target?symbol=${symbol}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0].priceTarget || null;
  } catch (error) {
    console.error("Failed to fetch price target:", error);
    return null;
  }
};