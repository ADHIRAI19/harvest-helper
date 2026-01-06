export interface Crop {
  id: string;
  name: string;
  nameTa: string;
  category: 'grains' | 'vegetables' | 'fruits' | 'cashCrops' | 'pulses';
  icon: string;
  avgYieldPerAcre: number; // in quintals
  growingPeriod: string;
}

export const crops: Crop[] = [
  // Grains
  { id: 'rice', name: 'Rice', nameTa: 'அரிசி', category: 'grains', icon: '🌾', avgYieldPerAcre: 20, growingPeriod: '120-150 days' },
  { id: 'wheat', name: 'Wheat', nameTa: 'கோதுமை', category: 'grains', icon: '🌾', avgYieldPerAcre: 15, growingPeriod: '120-150 days' },
  { id: 'maize', name: 'Maize', nameTa: 'மக்காச்சோளம்', category: 'grains', icon: '🌽', avgYieldPerAcre: 25, growingPeriod: '90-120 days' },
  { id: 'millets', name: 'Millets', nameTa: 'தினை', category: 'grains', icon: '🌾', avgYieldPerAcre: 8, growingPeriod: '70-90 days' },
  { id: 'bajra', name: 'Bajra', nameTa: 'கம்பு', category: 'grains', icon: '🌾', avgYieldPerAcre: 10, growingPeriod: '80-95 days' },
  { id: 'jowar', name: 'Jowar', nameTa: 'சோளம்', category: 'grains', icon: '🌾', avgYieldPerAcre: 12, growingPeriod: '100-120 days' },
  
  // Vegetables
  { id: 'onion', name: 'Onion', nameTa: 'வெங்காயம்', category: 'vegetables', icon: '🧅', avgYieldPerAcre: 100, growingPeriod: '90-120 days' },
  { id: 'tomato', name: 'Tomato', nameTa: 'தக்காளி', category: 'vegetables', icon: '🍅', avgYieldPerAcre: 150, growingPeriod: '60-90 days' },
  { id: 'potato', name: 'Potato', nameTa: 'உருளைக்கிழங்கு', category: 'vegetables', icon: '🥔', avgYieldPerAcre: 80, growingPeriod: '90-120 days' },
  { id: 'chillies', name: 'Chillies', nameTa: 'மிளகாய்', category: 'vegetables', icon: '🌶️', avgYieldPerAcre: 30, growingPeriod: '120-150 days' },
  { id: 'brinjal', name: 'Brinjal', nameTa: 'கத்திரிக்காய்', category: 'vegetables', icon: '🍆', avgYieldPerAcre: 120, growingPeriod: '60-80 days' },
  { id: 'cabbage', name: 'Cabbage', nameTa: 'முட்டைகோஸ்', category: 'vegetables', icon: '🥬', avgYieldPerAcre: 100, growingPeriod: '90-120 days' },
  
  // Fruits
  { id: 'banana', name: 'Banana', nameTa: 'வாழைப்பழம்', category: 'fruits', icon: '🍌', avgYieldPerAcre: 200, growingPeriod: '12-14 months' },
  { id: 'coconut', name: 'Coconut', nameTa: 'தேங்காய்', category: 'fruits', icon: '🥥', avgYieldPerAcre: 50, growingPeriod: '6-7 years (first harvest)' },
  { id: 'mango', name: 'Mango', nameTa: 'மாம்பழம்', category: 'fruits', icon: '🥭', avgYieldPerAcre: 40, growingPeriod: '4-6 years (first harvest)' },
  { id: 'papaya', name: 'Papaya', nameTa: 'பப்பாளி', category: 'fruits', icon: '🍈', avgYieldPerAcre: 80, growingPeriod: '9-12 months' },
  { id: 'grapes', name: 'Grapes', nameTa: 'திராட்சை', category: 'fruits', icon: '🍇', avgYieldPerAcre: 60, growingPeriod: '2-3 years (first harvest)' },
  
  // Cash Crops
  { id: 'cotton', name: 'Cotton', nameTa: 'பருத்தி', category: 'cashCrops', icon: '☁️', avgYieldPerAcre: 8, growingPeriod: '150-180 days' },
  { id: 'sugarcane', name: 'Sugarcane', nameTa: 'கரும்பு', category: 'cashCrops', icon: '🎋', avgYieldPerAcre: 350, growingPeriod: '12-18 months' },
  { id: 'groundnut', name: 'Groundnut', nameTa: 'நிலக்கடலை', category: 'cashCrops', icon: '🥜', avgYieldPerAcre: 10, growingPeriod: '100-130 days' },
  { id: 'soybean', name: 'Soybean', nameTa: 'சோயாபீன்', category: 'cashCrops', icon: '🫘', avgYieldPerAcre: 12, growingPeriod: '80-120 days' },
  { id: 'sunflower', name: 'Sunflower', nameTa: 'சூரியகாந்தி', category: 'cashCrops', icon: '🌻', avgYieldPerAcre: 8, growingPeriod: '80-120 days' },
  { id: 'turmeric', name: 'Turmeric', nameTa: 'மஞ்சள்', category: 'cashCrops', icon: '🟡', avgYieldPerAcre: 25, growingPeriod: '7-9 months' },
  
  // Pulses
  { id: 'chickpea', name: 'Chickpea', nameTa: 'கொண்டைக்கடலை', category: 'pulses', icon: '🫘', avgYieldPerAcre: 8, growingPeriod: '90-120 days' },
  { id: 'lentil', name: 'Lentil', nameTa: 'பருப்பு', category: 'pulses', icon: '🫘', avgYieldPerAcre: 6, growingPeriod: '80-110 days' },
  { id: 'greengram', name: 'Green Gram', nameTa: 'பச்சைப்பயறு', category: 'pulses', icon: '🫛', avgYieldPerAcre: 5, growingPeriod: '60-75 days' },
  { id: 'blackgram', name: 'Black Gram', nameTa: 'உளுந்து', category: 'pulses', icon: '🫘', avgYieldPerAcre: 6, growingPeriod: '70-90 days' },
  { id: 'redgram', name: 'Red Gram', nameTa: 'துவரம் பருப்பு', category: 'pulses', icon: '🫘', avgYieldPerAcre: 6, growingPeriod: '150-180 days' },
];

export const getCropById = (id: string): Crop | undefined => {
  return crops.find(crop => crop.id === id);
};

export const getCropsByCategory = (category: Crop['category']): Crop[] => {
  return crops.filter(crop => crop.category === category);
};
