import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PricePoint, MarketPrice } from '@/hooks/usePriceData';
import { cn } from '@/lib/utils';

interface PriceChartProps {
  data: PricePoint[];
  marketComparison: MarketPrice[];
}

type TimeRange = '7' | '15' | '30';

export const PriceChart: React.FC<PriceChartProps> = ({ data, marketComparison }) => {
  const { t, i18n } = useTranslation();
  const [timeRange, setTimeRange] = useState<TimeRange>('7');
  const [chartType, setChartType] = useState<'trend' | 'comparison'>('trend');

  const filteredData = data.slice(-parseInt(timeRange));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language === 'ta' ? 'ta-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border border-border shadow-medium">
          <p className="text-sm font-medium text-foreground">{formatDate(label)}</p>
          <p className="text-lg font-bold text-primary">
            ₹{payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">per quintal</p>
        </div>
      );
    }
    return null;
  };

  const comparisonData = marketComparison.map(mp => ({
    name: mp.market.name.split(' ')[0],
    price: mp.price,
  }));

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
      {/* Chart Type Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant={chartType === 'trend' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('trend')}
          >
            {t('dashboard.trend')}
          </Button>
          <Button
            variant={chartType === 'comparison' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('comparison')}
          >
            {t('dashboard.comparison')}
          </Button>
        </div>

        {chartType === 'trend' && (
          <div className="flex gap-2">
            {(['7', '15', '30'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={cn(
                  timeRange === range && 'bg-secondary text-secondary-foreground'
                )}
              >
                {range} {t('dashboard.days7').replace('7', '')}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="h-64 w-full">
        {chartType === 'trend' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar
                dataKey="price"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
