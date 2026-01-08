import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Crop } from '@/data/crops';
import { Market } from '@/data/locations';
import i18n, { LanguageCode } from '@/i18n';

interface AppContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  selectedCrop: Crop | null;
  setSelectedCrop: (crop: Crop | null) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedMarket: Market | null;
  setSelectedMarket: (market: Market | null) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [language, setLanguageState] = useState<LanguageCode>((localStorage.getItem('language') as LanguageCode) || 'en');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        session,
        isLoading,
        selectedCrop,
        setSelectedCrop,
        selectedState,
        setSelectedState,
        selectedDistrict,
        setSelectedDistrict,
        selectedMarket,
        setSelectedMarket,
        language,
        setLanguage: handleSetLanguage,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
