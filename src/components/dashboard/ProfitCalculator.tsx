import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Coins, TrendingUp, Sprout } from 'lucide-react';
import { Crop } from '@/data/crops';
import { cn } from '@/lib/utils';

interface ProfitCalculatorProps {
  crop: Crop;
  currentPrice: number;
}

interface CalculatorInputs {
  landArea: number;
  seedCost: number;
  fertilizerCost: number;
  laborCost: number;
  irrigationCost: number;
  otherCost: number;
}

interface CalculatorResult {
  totalCost: number;
  expectedYield: number;
  grossRevenue: number;
  netProfit: number;
  profitMargin: number;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ crop, currentPrice }) => {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    landArea: 1,
    seedCost: 2000,
    fertilizerCost: 5000,
    laborCost: 8000,
    irrigationCost: 3000,
    otherCost: 2000,
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const calculateProfit = () => {
    const totalCost = 
      inputs.seedCost + 
      inputs.fertilizerCost + 
      inputs.laborCost + 
      inputs.irrigationCost + 
      inputs.otherCost;
    
    const expectedYield = crop.avgYieldPerAcre * inputs.landArea;
    const grossRevenue = expectedYield * currentPrice;
    const netProfit = grossRevenue - totalCost;
    const profitMargin = totalCost > 0 ? ((netProfit / totalCost) * 100) : 0;

    setResult({
      totalCost,
      expectedYield,
      grossRevenue,
      netProfit,
      profitMargin,
    });
  };

  const getProfitVariant = (): 'success' | 'warning' | 'danger' => {
    if (!result) return 'warning';
    if (result.profitMargin > 30) return 'success';
    if (result.profitMargin > 10) return 'warning';
    return 'danger';
  };

  const inputFields = [
    { key: 'landArea', label: t('dashboard.calculator.landArea'), icon: Sprout },
    { key: 'seedCost', label: t('dashboard.calculator.seedCost'), icon: Coins },
    { key: 'fertilizerCost', label: t('dashboard.calculator.fertilizerCost'), icon: Coins },
    { key: 'laborCost', label: t('dashboard.calculator.laborCost'), icon: Coins },
    { key: 'irrigationCost', label: t('dashboard.calculator.irrigationCost'), icon: Coins },
    { key: 'otherCost', label: t('dashboard.calculator.otherCost'), icon: Coins },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.calculator.title')}</h3>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {inputFields.map(({ key, label, icon: Icon }) => (
          <div key={key} className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon className="h-3 w-3" />
              {label}
            </Label>
            <Input
              type="number"
              value={inputs[key as keyof CalculatorInputs]}
              onChange={(e) => handleInputChange(key as keyof CalculatorInputs, e.target.value)}
              className="bg-muted/50"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={calculateProfit}
        className="w-full bg-gradient-primary hover:opacity-90 mb-6"
      >
        {t('dashboard.calculator.calculate')}
      </Button>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label={t('dashboard.calculator.totalCost')}
              value={`₹${result.totalCost.toLocaleString()}`}
              variant="default"
            />
            <ResultCard
              label={t('dashboard.calculator.expectedYield')}
              value={`${result.expectedYield.toFixed(1)} Qt`}
              variant="default"
            />
            <ResultCard
              label={t('dashboard.calculator.grossRevenue')}
              value={`₹${result.grossRevenue.toLocaleString()}`}
              variant="default"
            />
            <ResultCard
              label={t('dashboard.calculator.netProfit')}
              value={`₹${result.netProfit.toLocaleString()}`}
              variant={getProfitVariant()}
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>

          {/* Profit Margin Indicator */}
          <div className={cn(
            'p-4 rounded-lg text-center',
            result.netProfit > 0 ? 'bg-success/10' : 'bg-destructive/10'
          )}>
            <p className="text-sm text-muted-foreground mb-1">Profit Margin</p>
            <p className={cn(
              'text-2xl font-bold',
              result.netProfit > 0 ? 'text-success' : 'text-destructive'
            )}>
              {result.profitMargin.toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ResultCardProps {
  label: string;
  value: string;
  variant: 'default' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, variant, icon }) => {
  const variantStyles = {
    default: 'bg-muted/50',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className={cn('p-4 rounded-lg', variantStyles[variant])}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
};
