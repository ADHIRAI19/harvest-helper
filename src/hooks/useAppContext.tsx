import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Crop } from '@/data/crops';
import { Market } from '@/data/locations';

interface AppContextType {
  // Auth
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  
  // Selection
  selectedCrop: Crop | null;
  setSelectedCrop: (crop: Crop | null) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedMarket: Market | null;
  setSelectedMarket: (market: Market | null) => void;
  
  // Language
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
  
  // User location
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
  
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'ta';
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'ta') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
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
