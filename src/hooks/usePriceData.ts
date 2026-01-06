import { useState, useEffect, useMemo } from 'react';
import { Crop } from '@/data/crops';
import { Market } from '@/data/locations';

export interface PricePoint {
  date: string;
  price: number;
  minPrice: number;
  maxPrice: number;
}

export interface MarketPrice {
  market: Market;
  price: number;
  trend: 'up' | 'down' | 'stable';
}

interface UsePriceDataResult {
  currentPrice: number;
  priceHistory: PricePoint[];
  marketComparison: MarketPrice[];
  trend: 'up' | 'down' | 'stable';
  demand: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high';
  isLoading: boolean;
}

// Generate realistic mock price data based on crop
const generateMockPriceData = (crop: Crop, days: number = 30): PricePoint[] => {
  const basePrices: Record<string, number> = {
    rice: 2200,
    wheat: 2400,
    maize: 1850,
    millets: 2800,
    bajra: 2100,
    jowar: 2600,
    onion: 1800,
    tomato: 2500,
    potato: 1200,
    chillies: 8500,
    brinjal: 2000,
    cabbage: 1500,
    banana: 3500,
    coconut: 2800,
    mango: 6000,
    papaya: 2200,
    grapes: 4500,
    cotton: 6200,
    sugarcane: 320,
    groundnut: 5800,
    soybean: 4200,
    sunflower: 5500,
    turmeric: 8000,
    chickpea: 5200,
    lentil: 6000,
    greengram: 7200,
    blackgram: 6800,
    redgram: 6500,
  };

  const basePrice = basePrices[crop.id] || 3000;
  const volatility = 0.08; // 8% volatility
  const data: PricePoint[] = [];
  
  let currentPrice = basePrice;
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random walk with slight upward trend
    const change = (Math.random() - 0.48) * basePrice * volatility;
    currentPrice = Math.max(basePrice * 0.7, Math.min(basePrice * 1.3, currentPrice + change));
    
    const variance = basePrice * 0.05;
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice),
      minPrice: Math.round(currentPrice - variance),
      maxPrice: Math.round(currentPrice + variance),
    });
  }

  return data;
};

export const usePriceData = (
  crop: Crop | null,
  market: Market | null,
  nearbyMarkets: Market[] = []
): UsePriceDataResult => {
  const [isLoading, setIsLoading] = useState(true);

  // Generate price data
  const priceHistory = useMemo(() => {
    if (!crop) return [];
    return generateMockPriceData(crop, 30);
  }, [crop]);

  const currentPrice = useMemo(() => {
    if (priceHistory.length === 0) return 0;
    return priceHistory[priceHistory.length - 1].price;
  }, [priceHistory]);

  const trend = useMemo((): 'up' | 'down' | 'stable' => {
    if (priceHistory.length < 7) return 'stable';
    const recent = priceHistory.slice(-7);
    const avgRecent = recent.reduce((sum, p) => sum + p.price, 0) / 7;
    const avgPrevious = priceHistory.slice(-14, -7).reduce((sum, p) => sum + p.price, 0) / 7;
    
    const change = ((avgRecent - avgPrevious) / avgPrevious) * 100;
    if (change > 2) return 'up';
    if (change < -2) return 'down';
    return 'stable';
  }, [priceHistory]);

  const demand = useMemo((): 'low' | 'medium' | 'high' => {
    if (!crop) return 'medium';
    // Simulate demand based on crop type and season
    const demandMap: Record<string, 'low' | 'medium' | 'high'> = {
      rice: 'high',
      wheat: 'high',
      onion: 'high',
      tomato: 'medium',
      cotton: 'medium',
      sugarcane: 'high',
    };
    return demandMap[crop.id] || 'medium';
  }, [crop]);

  const riskLevel = useMemo((): 'low' | 'medium' | 'high' => {
    if (trend === 'down' && demand === 'low') return 'high';
    if (trend === 'up' && demand === 'high') return 'low';
    return 'medium';
  }, [trend, demand]);

  const marketComparison = useMemo((): MarketPrice[] => {
    if (!crop || !market) return [];
    
    const allMarkets = [market, ...nearbyMarkets.slice(0, 4)];
    return allMarkets.map((m, index) => {
      const variance = (Math.random() - 0.5) * currentPrice * 0.1;
      const marketPrice = Math.round(currentPrice + variance);
      const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
      
      return {
        market: m,
        price: marketPrice,
        trend: index === 0 ? trend : trends[Math.floor(Math.random() * 3)],
      };
    });
  }, [crop, market, nearbyMarkets, currentPrice, trend]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [crop, market]);

  return {
    currentPrice,
    priceHistory,
    marketComparison,
    trend,
    demand,
    riskLevel,
    isLoading,
  };
};
