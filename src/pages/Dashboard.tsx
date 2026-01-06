import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { PriceCard } from '@/components/dashboard/PriceCard';
import { PriceChart } from '@/components/dashboard/PriceChart';
import { ProfitCalculator } from '@/components/dashboard/ProfitCalculator';
import { useAppContext } from '@/hooks/useAppContext';
import { usePriceData } from '@/hooks/usePriceData';
import { getNearbyMarkets } from '@/data/locations';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { selectedCrop, selectedMarket, userLocation } = useAppContext();

  const nearbyMarkets = userLocation ? getNearbyMarkets(userLocation.lat, userLocation.lng, 5) : [];
  const { currentPrice, priceHistory, marketComparison, trend, demand, riskLevel, isLoading } = usePriceData(selectedCrop, selectedMarket, nearbyMarkets);

  if (!selectedCrop) {
    navigate('/crops');
    return null;
  }

  const demandColors = { low: 'warning', medium: 'default', high: 'success' } as const;
  const riskColors = { low: 'success', medium: 'warning', high: 'danger' } as const;

  return (
    <Layout>
      <div className="container px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedCrop.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-foreground">{i18n.language === 'ta' ? selectedCrop.nameTa : selectedCrop.name}</h1>
              {selectedMarket && <p className="text-sm text-muted-foreground">{selectedMarket.name}</p>}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <PriceCard title={t('dashboard.currentPrice')} value={`₹${currentPrice.toLocaleString()}`} subtitle={t('dashboard.priceUnit')} trend={trend} />
                <PriceCard title={t('dashboard.demand')} value={t(`dashboard.${demand}`)} variant={demandColors[demand]} />
                <PriceCard title={t('dashboard.riskLevel')} value={t(`dashboard.${riskLevel}`)} variant={riskColors[riskLevel]} />
                <PriceCard title={t('dashboard.trend')} value={trend === 'up' ? '↑ Rising' : trend === 'down' ? '↓ Falling' : '→ Stable'} trend={trend} />
              </div>
              <PriceChart data={priceHistory} marketComparison={marketComparison} />
            </div>
            <div><ProfitCalculator crop={selectedCrop} currentPrice={currentPrice} /></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
