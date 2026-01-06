import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { CropCard } from '@/components/crops/CropCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { crops, Crop } from '@/data/crops';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = Crop['category'] | 'all';

const CropSelection = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const categories: { key: Category; labelKey: string }[] = [
    { key: 'all', labelKey: 'All' },
    { key: 'grains', labelKey: 'crops.categories.grains' },
    { key: 'vegetables', labelKey: 'crops.categories.vegetables' },
    { key: 'fruits', labelKey: 'crops.categories.fruits' },
    { key: 'cashCrops', labelKey: 'crops.categories.cashCrops' },
    { key: 'pulses', labelKey: 'crops.categories.pulses' },
  ];

  const filteredCrops = useMemo(() => {
    return crops.filter(crop => {
      const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.nameTa.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('crops.title')}</h1>
          <p className="text-muted-foreground">{t('crops.subtitle')}</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('crops.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(({ key, labelKey }) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={cn(selectedCategory === key && 'bg-gradient-primary')}
            >
              {key === 'all' ? 'All' : t(labelKey)}
            </Button>
          ))}
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {filteredCrops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No crops found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CropSelection;
