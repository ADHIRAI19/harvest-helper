import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wheat, BarChart3, Map, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, labelKey: 'nav.home' },
  { path: '/crops', icon: Wheat, labelKey: 'nav.crops' },
  { path: '/dashboard', icon: BarChart3, labelKey: 'nav.dashboard' },
  { path: '/map', icon: Map, labelKey: 'nav.map' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-lg transition-all duration-200',
                isActive
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'animate-bounce-subtle')} />
              <span className="text-[10px] font-medium">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
