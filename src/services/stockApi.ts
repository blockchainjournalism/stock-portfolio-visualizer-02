import { toast } from "@/components/ui/use-toast";

const API_KEY = "tGgEwEGYdbqh35uXZzhhYYMz7CYpCTlD"; // Using the provided API key
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
    const response = await fetch(
      `${BASE_URL}/stock-screener?apikey=${API_KEY}&limit=100&exchange=NASDAQ`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch stocks");
    }
    return await response.json();
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch stock data. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
};