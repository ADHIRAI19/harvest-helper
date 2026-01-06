import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { MapView } from '@/components/map/MapView';
import { useAppContext } from '@/hooks/useAppContext';
import { markets, getNearbyMarkets } from '@/data/locations';

const MapPage = () => {
  const { userLocation, selectedMarket, setSelectedMarket, selectedCrop } = useAppContext();
  const displayMarkets = userLocation ? getNearbyMarkets(userLocation.lat, userLocation.lng, 10) : markets.slice(0, 20);

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <MapView
          markets={displayMarkets}
          userLocation={userLocation}
          selectedMarket={selectedMarket}
          onMarketSelect={setSelectedMarket}
          cropName={selectedCrop?.name}
          currentPrice={selectedCrop ? 2200 : undefined}
        />
      </div>
    </Layout>
  );
};

export default MapPage;
