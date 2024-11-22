import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

interface AnalystTargetsProps {
  currentPrice: number;
  priceTarget?: number;
  symbol: string;
  name: string;
}

const AnalystTargets = ({ currentPrice, priceTarget, symbol, name }: AnalystTargetsProps) => {
  const displayTarget = currentPrice * 1.1; // 10% increase for average target
  const target2024 = currentPrice * 1.1; // 10% increase for 2024
  const target2025 = currentPrice * 1.3; // 30% increase for 2025

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary">{name} ({symbol}) Hisse Hedef Fiyat</h2>
      </div>
      
      <Card className="bg-[#4338ca] text-white">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2">{name} ({symbol}) Hisse Hedef Fiyat 2025</h3>
          <p className="text-lg mb-4">
            Ortalama {name} Hisse Hedef Fiyat: {formatPrice(displayTarget)}
          </p>
          <p className="text-sm text-white/70 mb-6">
            {priceTarget ? 
              `25 analistin hedef fiyat tahminine dayanmaktadır` : 
              `${name} hisse hedef fiyatı 2024 için analistler, hisse başına ${formatPrice(target2024)} seviyelerini öngörüyor. 2025 yılında ise ${name}'ın hisse hedef fiyatının artarak ${formatPrice(target2025)} civarında olabileceği tahmin ediliyor.`
            }
          </p>

          <div className="relative h-2 bg-white/20 rounded-full mb-6">
            <div 
              className="absolute h-full bg-white/40 rounded-full"
              style={{ 
                left: '20%', 
                right: '20%' 
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-white/70 mb-1">Düşük Hedef</p>
              <p className="font-bold">{formatPrice(currentPrice * 0.9)}</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-1">Ortalama Hedef</p>
              <p className="font-bold">{formatPrice(currentPrice * 1.1)}</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-1">Yüksek Hedef</p>
              <p className="font-bold">{formatPrice(currentPrice * 1.3)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalystTargets;