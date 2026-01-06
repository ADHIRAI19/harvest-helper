import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  variant = 'default',
  icon,
}) => {
  const { t } = useTranslation();

  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-success/10 border-success/30',
    warning: 'bg-warning/10 border-warning/30',
    danger: 'bg-destructive/10 border-destructive/30',
  };

  const valueColors = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-destructive',
  };

  const trendIcons = {
    up: <TrendingUp className="h-5 w-5 text-success" />,
    down: <TrendingDown className="h-5 w-5 text-destructive" />,
    stable: <Minus className="h-5 w-5 text-muted-foreground" />,
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-4 shadow-soft transition-all duration-300 hover:shadow-medium',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn('text-2xl font-bold mt-1', valueColors[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {trend && trendIcons[trend]}
          {icon}
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-primary opacity-5" />
    </div>
  );
};
