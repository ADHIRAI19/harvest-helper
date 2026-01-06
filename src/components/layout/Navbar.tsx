import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wheat, BarChart3, Map, User, LogIn, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, labelKey: 'nav.home' },
  { path: '/crops', icon: Wheat, labelKey: 'nav.crops' },
  { path: '/dashboard', icon: BarChart3, labelKey: 'nav.dashboard' },
  { path: '/map', icon: Map, labelKey: 'nav.map' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, language, setLanguage } = useAppContext();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border hidden md:block">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="text-2xl">🌾</span>
          <span className="text-gradient">Harvest Planner</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ path, icon: Icon, labelKey }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  isActive
                    ? 'text-primary bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{t(labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2"
          >
            <Languages className="h-4 w-4" />
            <span className="font-medium">{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </Button>

          {user ? (
            <Link to="/profile">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span>{t('nav.profile')}</span>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90">
                <LogIn className="h-4 w-4" />
                <span>{t('auth.login')}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
