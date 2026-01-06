import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AppProvider } from "./hooks/useAppContext";
import Index from "./pages/Index";
import CropSelection from "./pages/CropSelection";
import LocationSelection from "./pages/LocationSelection";
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/crops" element={<CropSelection />} />
              <Route path="/location" element={<LocationSelection />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
