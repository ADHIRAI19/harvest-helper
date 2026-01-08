import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { Market } from '@/data/locations';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  markets: Market[];
  userLocation?: { lat: number; lng: number } | null;
  selectedMarket?: Market | null;
  onMarketSelect?: (market: Market) => void;
  cropName?: string;
  currentPrice?: number;
}

// Component to handle map center changes
const MapCenterUpdater: React.FC<{ center: LatLngTuple; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Separate component for market popup content to avoid context issues
const MarketPopupContent: React.FC<{
  market: Market;
  language: string;
  cropName?: string;
  currentPrice?: number;
}> = ({ market, language, cropName, currentPrice }) => (
  <div className="p-2 min-w-[150px]">
    <p className="font-semibold text-foreground">
      {language === 'ta' ? market.nameTa : market.name}
    </p>
    <p className="text-sm text-muted-foreground">{market.district}</p>
    {cropName && currentPrice && (
      <div className="mt-2 pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">{cropName} Price</p>
        <p className="font-bold text-primary">₹{currentPrice.toLocaleString()}/Qt</p>
      </div>
    )}
  </div>
);

export const MapView: React.FC<MapViewProps> = ({
  markets,
  userLocation,
  selectedMarket,
  onMarketSelect,
  cropName,
  currentPrice,
}) => {
  const { language } = useAppContext();
  const [showRoute, setShowRoute] = useState(false);
  const [routePoints, setRoutePoints] = useState<LatLngTuple[]>([]);

  // Default center (India center)
  const defaultCenter: LatLngTuple = [20.5937, 78.9629];
  const center: LatLngTuple = userLocation
    ? [userLocation.lat, userLocation.lng]
    : selectedMarket
    ? [selectedMarket.lat, selectedMarket.lng]
    : defaultCenter;

  const zoom = userLocation || selectedMarket ? 10 : 5;

  // Generate simple route (straight line for demo)
  useEffect(() => {
    if (showRoute && userLocation && selectedMarket) {
      setRoutePoints([
        [userLocation.lat, userLocation.lng],
        [selectedMarket.lat, selectedMarket.lng],
      ]);
    } else {
      setRoutePoints([]);
    }
  }, [showRoute, userLocation, selectedMarket]);

  const handleShowRoute = () => {
    setShowRoute(!showRoute);
  };

  // Pre-compute market display names to avoid context issues in Popup
  const marketDisplayNames = markets.reduce((acc, market) => {
    acc[market.name] = language === 'ta' ? market.nameTa : market.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-medium">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <MapCenterUpdater center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center p-2">
                <p className="font-semibold text-primary">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Market Markers */}
        {markets.map((market) => (
          <Marker
            key={market.name}
            position={[market.lat, market.lng]}
            icon={selectedMarket?.name === market.name ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onMarketSelect?.(market),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[150px]">
                <p className="font-semibold text-foreground">
                  {marketDisplayNames[market.name]}
                </p>
                <p className="text-sm text-muted-foreground">{market.district}</p>
                {cropName && currentPrice && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">{cropName} Price</p>
                    <p className="font-bold text-primary">₹{currentPrice.toLocaleString()}/Qt</p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route Line */}
        {routePoints.length > 0 && (
          <Polyline
            positions={routePoints}
            color="hsl(122, 39%, 30%)"
            weight={4}
            dashArray="10, 10"
          />
        )}
      </MapContainer>

      {/* Route Button */}
      {userLocation && selectedMarket && (
        <Button
          onClick={handleShowRoute}
          className="absolute bottom-4 right-4 z-[1000] gap-2 shadow-lg"
          variant={showRoute ? 'secondary' : 'default'}
        >
          <Navigation className="h-4 w-4" />
          {showRoute ? 'Hide Route' : 'Show Route'}
        </Button>
      )}
    </div>
  );
};