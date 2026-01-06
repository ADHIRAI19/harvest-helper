import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingUp, TrendingDown, Info, Clock } from 'lucide-react';

interface AlertCardProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  timestamp?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  type,
  title,
  message,
  timestamp,
}) => {
  const typeStyles = {
    success: {
      bg: 'bg-success/10 border-success/30',
      icon: <TrendingUp className="h-5 w-5 text-success" />,
      title: 'text-success',
    },
    warning: {
      bg: 'bg-warning/10 border-warning/30',
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      title: 'text-warning',
    },
    danger: {
      bg: 'bg-destructive/10 border-destructive/30',
      icon: <TrendingDown className="h-5 w-5 text-destructive" />,
      title: 'text-destructive',
    },
    info: {
      bg: 'bg-info/10 border-info/30',
      icon: <Info className="h-5 w-5 text-info" />,
      title: 'text-info',
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      className={cn(
        'flex gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-soft',
        styles.bg
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className={cn('font-semibold', styles.title)}>{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
        {timestamp && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Clock className="h-3 w-3" />
            <span>{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};
