import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Factory, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Percent,
  Award
} from 'lucide-react';

interface StockDetailsProps {
  price: number;
  volume: number;
  beta?: number;
  lastDividend?: number;
  eps?: number;
  pe?: number;
  sharesOutstanding?: number;
  industry?: string;
  sector?: string;
  description?: string;
  ceo?: string;
  employees?: number;
  website?: string;
}

const StockDetails = ({ 
  price, 
  volume,
  beta,
  lastDividend,
  eps,
  pe,
  sharesOutstanding,
  industry,
  sector,
  description,
  ceo,
  employees,
  website
}: StockDetailsProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Financial Metrics
          </h3>
          <div className="space-y-3">
            {beta !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">Beta</span>
                <span className="font-medium">{beta.toFixed(2)}</span>
              </div>
            )}
            {lastDividend !== undefined && lastDividend > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Last Dividend</span>
                <span className="font-medium">{formatNumber(lastDividend)}</span>
              </div>
            )}
            {eps !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">EPS</span>
                <span className="font-medium">{formatNumber(eps)}</span>
              </div>
            )}
            {pe !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">P/E Ratio</span>
                <span className="font-medium">{pe.toFixed(2)}</span>
              </div>
            )}
            {sharesOutstanding !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">Shares Outstanding</span>
                <span className="font-medium">{sharesOutstanding.toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Company Information
          </h3>
          <div className="space-y-3">
            {industry && (
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Industry</span>
                <span className="font-medium text-right">{industry}</span>
              </div>
            )}
            {sector && (
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Sector</span>
                <span className="font-medium text-right">{sector}</span>
              </div>
            )}
            {ceo && (
              <div className="flex justify-between items-start">
                <span className="text-gray-500">CEO</span>
                <span className="font-medium text-right">{ceo}</span>
              </div>
            )}
            {employees && (
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Employees</span>
                <span className="font-medium text-right">{employees.toLocaleString()}</span>
              </div>
            )}
            {website && (
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Website</span>
                <a 
                  href={website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-primary hover:underline text-right"
                >
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {description && (
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Company Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockDetails;