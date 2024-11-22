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
  const displayTarget = priceTarget || currentPrice;
  const lowTarget = displayTarget * 0.8;
  const highTarget = displayTarget * 1.2;

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
            Ortalama Hedef Fiyat: {formatPrice(displayTarget)}
          </p>
          <p className="text-sm text-white/70 mb-6">
            {priceTarget ? "25 analistin hedef fiyat tahminine dayanmaktadır" : "Hedef fiyat bulunmadığından mevcut fiyat gösterilmektedir"}
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
              <p className="font-bold">{formatPrice(lowTarget)}</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-1">Ortalama Hedef</p>
              <p className="font-bold">{formatPrice(displayTarget)}</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-1">Yüksek Hedef</p>
              <p className="font-bold">{formatPrice(highTarget)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalystTargets;