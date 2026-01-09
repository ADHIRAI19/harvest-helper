import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { MapView } from '@/components/map/MapView';
import { useAppContext } from '@/hooks/useAppContext';
import { mandis, getNearbyMandis, Mandi } from '@/data/mandis';

const MapPage = () => {
  const { userLocation, selectedCrop } = useAppContext();
  const [selectedMandi, setSelectedMandi] = useState<Mandi | null>(null);
  
  const displayMandis = userLocation 
    ? getNearbyMandis(userLocation.lat, userLocation.lng, 20) 
    : mandis;

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <MapView
          mandis={displayMandis}
          userLocation={userLocation}
          selectedMandi={selectedMandi}
          onMandiSelect={setSelectedMandi}
          cropName={selectedCrop?.name}
          currentPrice={selectedCrop ? 2200 : undefined}
        />
      </div>
    </Layout>
  );
};

export default MapPage;
