import React from 'react';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  icon: string;
  title: string;
  value: string | number;
  unit?: string;
  variant?: 'default' | 'warning' | 'danger';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  icon,
  title,
  value,
  unit,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'bg-card border-border',
    warning: 'bg-warning/10 border-warning/30',
    danger: 'bg-destructive/10 border-destructive/30',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 hover:shadow-soft',
        variantStyles[variant]
      )}
    >
      <span className="text-3xl mb-2">{icon}</span>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-xl font-bold text-foreground mt-1">
        {value}
        {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
      </p>
    </div>
  );
};
