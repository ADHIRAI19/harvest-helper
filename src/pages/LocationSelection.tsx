import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/hooks/useAppContext';
import { states, getDistrictsByState, getMarketsByDistrict } from '@/data/locations';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';

const LocationSelection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    selectedCrop, selectedState, setSelectedState,
    selectedDistrict, setSelectedDistrict,
    selectedMarket, setSelectedMarket, setUserLocation,
  } = useAppContext();

  const districts = selectedState ? getDistrictsByState(selectedState) : [];
  const markets = selectedDistrict && selectedState ? getMarketsByDistrict(selectedDistrict, selectedState) : [];

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          navigate('/dashboard');
        },
        () => alert('Unable to get your location')
      );
    }
  };

  const handleContinue = () => {
    if (selectedMarket) navigate('/dashboard');
  };

  if (!selectedCrop) {
    navigate('/crops');
    return null;
  }

  return (
    <Layout>
      <div className="container max-w-lg px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="text-xl">{selectedCrop.icon}</span>
            <span>{i18n.language === 'ta' ? selectedCrop.nameTa : selectedCrop.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t('location.title')}</h1>
          <p className="text-muted-foreground">{t('location.subtitle')}</p>
        </div>

        <div className="space-y-4 bg-card p-6 rounded-xl border border-border shadow-soft">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('location.state')}</label>
            <Select value={selectedState} onValueChange={(v) => { setSelectedState(v); setSelectedDistrict(''); setSelectedMarket(null); }}>
              <SelectTrigger><SelectValue placeholder={t('location.state')} /></SelectTrigger>
              <SelectContent>
                {states.map(s => <SelectItem key={s.code} value={s.code}>{i18n.language === 'ta' ? s.nameTa : s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('location.district')}</label>
            <Select value={selectedDistrict} onValueChange={(v) => { setSelectedDistrict(v); setSelectedMarket(null); }} disabled={!selectedState}>
              <SelectTrigger><SelectValue placeholder={t('location.district')} /></SelectTrigger>
              <SelectContent>
                {districts.map(d => <SelectItem key={d.name} value={d.name}>{i18n.language === 'ta' ? d.nameTa : d.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('location.market')}</label>
            <Select value={selectedMarket?.name || ''} onValueChange={(v) => setSelectedMarket(markets.find(m => m.name === v) || null)} disabled={!selectedDistrict}>
              <SelectTrigger><SelectValue placeholder={t('location.market')} /></SelectTrigger>
              <SelectContent>
                {markets.map(m => <SelectItem key={m.name} value={m.name}>{i18n.language === 'ta' ? m.nameTa : m.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button variant="outline" className="w-full gap-2" onClick={handleUseLocation}>
            <Navigation className="h-4 w-4" />
            {t('location.useLocation')}
          </Button>

          <Button className="w-full gap-2 bg-gradient-primary hover:opacity-90" onClick={handleContinue} disabled={!selectedMarket}>
            {t('location.continue')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LocationSelection;
