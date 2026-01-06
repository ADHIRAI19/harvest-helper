import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { TrendingUp, Cloud, Calculator, Bell, Wheat, MapPin } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  const features = [
    { icon: TrendingUp, titleKey: 'home.features.prices.title', descKey: 'home.features.prices.desc' },
    { icon: Cloud, titleKey: 'home.features.weather.title', descKey: 'home.features.weather.desc' },
    { icon: Calculator, titleKey: 'home.features.profit.title', descKey: 'home.features.profit.desc' },
    { icon: Bell, titleKey: 'home.features.alerts.title', descKey: 'home.features.alerts.desc' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl animate-float">🌾</div>
          <div className="absolute top-40 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>🌽</div>
          <div className="absolute bottom-40 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>🍅</div>
          <div className="absolute bottom-20 right-1/3 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🧅</div>
        </div>

        <div className="container relative z-10 text-center px-4 py-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Wheat className="h-4 w-4" />
            <span>Smart Farming Assistant</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t('home.tagline')}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/crops">
              <Button size="lg" className="gap-2 bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
                <TrendingUp className="h-5 w-5" />
                {t('home.checkPrice')}
              </Button>
            </Link>
            <Link to="/crops">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                <Calculator className="h-5 w-5" />
                {t('home.calculateProfit')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, titleKey, descKey }, index) => (
              <div
                key={titleKey}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-medium transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Markets Covered' },
              { value: '30+', label: 'Crops Tracked' },
              { value: '15', label: 'States' },
              { value: '24/7', label: 'Price Updates' },
            ].map(({ value, label }) => (
              <div key={label} className="p-6">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
