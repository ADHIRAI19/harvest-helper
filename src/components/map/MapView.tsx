import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { Mandi } from '@/data/mandis';
import { Navigation, Clock, MapPin } from 'lucide-react';
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
  mandis: Mandi[];
  userLocation?: { lat: number; lng: number } | null;
  selectedMandi?: Mandi | null;
  onMandiSelect?: (mandi: Mandi) => void;
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

// Calculate distance between two points
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Estimate travel time (assuming 40 km/h average speed for rural roads)
const estimateTravelTime = (distanceKm: number): string => {
  const hours = distanceKm / 40;
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
};

export const MapView: React.FC<MapViewProps> = ({
  mandis,
  userLocation,
  selectedMandi,
  onMandiSelect,
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
    : selectedMandi
    ? [selectedMandi.lat, selectedMandi.lng]
    : defaultCenter;

  const zoom = userLocation || selectedMandi ? 10 : 5;

  // Generate simple route (straight line for demo)
  useEffect(() => {
    if (showRoute && userLocation && selectedMandi) {
      setRoutePoints([
        [userLocation.lat, userLocation.lng],
        [selectedMandi.lat, selectedMandi.lng],
      ]);
    } else {
      setRoutePoints([]);
    }
  }, [showRoute, userLocation, selectedMandi]);

  const handleShowRoute = () => {
    setShowRoute(!showRoute);
  };

  // Calculate distance for selected mandi
  const selectedDistance = userLocation && selectedMandi
    ? calculateDistance(userLocation.lat, userLocation.lng, selectedMandi.lat, selectedMandi.lng)
    : null;

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

        {/* Mandi Markers */}
        {mandis.map((mandi) => {
          const distance = userLocation 
            ? calculateDistance(userLocation.lat, userLocation.lng, mandi.lat, mandi.lng)
            : null;
          const travelTime = distance ? estimateTravelTime(distance) : null;
          
          return (
            <Marker
              key={mandi.id}
              position={[mandi.lat, mandi.lng]}
              icon={selectedMandi?.id === mandi.id ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => onMandiSelect?.(mandi),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[180px]">
                  <p className="font-semibold text-foreground">
                    {language === 'ta' ? mandi.nameTa : mandi.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{mandi.district}, {mandi.state}</p>
                  <p className="text-xs text-muted-foreground mt-1">{mandi.type} Market</p>
                  
                  {distance && (
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border">
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        {distance.toFixed(1)} km
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {travelTime}
                      </span>
                    </div>
                  )}
                  
                  {cropName && currentPrice && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">{cropName} Price</p>
                      <p className="font-bold text-primary">₹{currentPrice.toLocaleString()}/Qt</p>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Major Crops:</p>
                    <p className="text-xs font-medium">{mandi.majorCrops.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

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

      {/* Route Info Panel */}
      {userLocation && selectedMandi && selectedDistance && (
        <div className="absolute top-4 left-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <p className="font-semibold text-sm">{language === 'ta' ? selectedMandi.nameTa : selectedMandi.name}</p>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {selectedDistance.toFixed(1)} km
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {estimateTravelTime(selectedDistance)}
            </span>
          </div>
        </div>
      )}

      {/* Route Button */}
      {userLocation && selectedMandi && (
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