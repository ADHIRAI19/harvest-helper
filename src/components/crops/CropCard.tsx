import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Crop } from '@/data/crops';
import { useAppContext } from '@/hooks/useAppContext';
import { cn } from '@/lib/utils';

interface CropCardProps {
  crop: Crop;
  size?: 'sm' | 'md' | 'lg';
}

export const CropCard: React.FC<CropCardProps> = ({ crop, size = 'md' }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { setSelectedCrop } = useAppContext();

  const handleClick = () => {
    setSelectedCrop(crop);
    navigate('/location');
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-2 bg-card rounded-xl border border-border',
        'hover:border-primary/50 hover:shadow-medium hover:scale-105 transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'cursor-pointer',
        sizeClasses[size]
      )}
    >
      <span className={cn('transition-transform duration-300 group-hover:scale-110', iconSizes[size])}>
        {crop.icon}
      </span>
      <span className={cn(
        'font-medium text-center text-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base'
      )}>
        {i18n.language === 'ta' ? crop.nameTa : crop.name}
      </span>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </button>
  );
};
