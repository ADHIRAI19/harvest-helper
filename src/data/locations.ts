export interface State {
  code: string;
  name: string;
  nameTa: string;
}

export interface District {
  name: string;
  nameTa: string;
  stateCode: string;
}

export interface Market {
  name: string;
  nameTa: string;
  district: string;
  stateCode: string;
  lat: number;
  lng: number;
}

export const states: State[] = [
  { code: 'TN', name: 'Tamil Nadu', nameTa: 'தமிழ்நாடு' },
  { code: 'AP', name: 'Andhra Pradesh', nameTa: 'ஆந்திரப் பிரதேசம்' },
  { code: 'KA', name: 'Karnataka', nameTa: 'கர்நாடகா' },
  { code: 'KL', name: 'Kerala', nameTa: 'கேரளா' },
  { code: 'MH', name: 'Maharashtra', nameTa: 'மகாராஷ்டிரா' },
  { code: 'GJ', name: 'Gujarat', nameTa: 'குஜராத்' },
  { code: 'RJ', name: 'Rajasthan', nameTa: 'ராஜஸ்தான்' },
  { code: 'UP', name: 'Uttar Pradesh', nameTa: 'உத்தரப் பிரதேசம்' },
  { code: 'MP', name: 'Madhya Pradesh', nameTa: 'மத்தியப் பிரதேசம்' },
  { code: 'PB', name: 'Punjab', nameTa: 'பஞ்சாப்' },
  { code: 'HR', name: 'Haryana', nameTa: 'ஹரியாணா' },
  { code: 'WB', name: 'West Bengal', nameTa: 'மேற்கு வங்காளம்' },
  { code: 'OR', name: 'Odisha', nameTa: 'ஒடிசா' },
  { code: 'TS', name: 'Telangana', nameTa: 'தெலங்கானா' },
  { code: 'BR', name: 'Bihar', nameTa: 'பீகார்' },
];

export const districts: District[] = [
  // Tamil Nadu
  { name: 'Chennai', nameTa: 'சென்னை', stateCode: 'TN' },
  { name: 'Coimbatore', nameTa: 'கோயம்புத்தூர்', stateCode: 'TN' },
  { name: 'Madurai', nameTa: 'மதுரை', stateCode: 'TN' },
  { name: 'Salem', nameTa: 'சேலம்', stateCode: 'TN' },
  { name: 'Trichy', nameTa: 'திருச்சி', stateCode: 'TN' },
  { name: 'Thanjavur', nameTa: 'தஞ்சாவூர்', stateCode: 'TN' },
  { name: 'Tirunelveli', nameTa: 'திருநெல்வேலி', stateCode: 'TN' },
  { name: 'Erode', nameTa: 'ஈரோடு', stateCode: 'TN' },
  
  // Andhra Pradesh
  { name: 'Vijayawada', nameTa: 'விஜயவாடா', stateCode: 'AP' },
  { name: 'Guntur', nameTa: 'குண்டூர்', stateCode: 'AP' },
  { name: 'Kurnool', nameTa: 'கர்னூல்', stateCode: 'AP' },
  { name: 'Anantapur', nameTa: 'அனந்தபூர்', stateCode: 'AP' },
  
  // Karnataka
  { name: 'Bangalore', nameTa: 'பெங்களூர்', stateCode: 'KA' },
  { name: 'Mysore', nameTa: 'மைசூர்', stateCode: 'KA' },
  { name: 'Hubli', nameTa: 'ஹுப்பளி', stateCode: 'KA' },
  { name: 'Belgaum', nameTa: 'பெல்காம்', stateCode: 'KA' },
  
  // Kerala
  { name: 'Kochi', nameTa: 'கொச்சி', stateCode: 'KL' },
  { name: 'Thiruvananthapuram', nameTa: 'திருவனந்தபுரம்', stateCode: 'KL' },
  { name: 'Kozhikode', nameTa: 'கோழிக்கோடு', stateCode: 'KL' },
  
  // Maharashtra
  { name: 'Mumbai', nameTa: 'மும்பை', stateCode: 'MH' },
  { name: 'Pune', nameTa: 'புனே', stateCode: 'MH' },
  { name: 'Nagpur', nameTa: 'நாக்பூர்', stateCode: 'MH' },
  { name: 'Nashik', nameTa: 'நாசிக்', stateCode: 'MH' },
  
  // Gujarat
  { name: 'Ahmedabad', nameTa: 'அகமதாபாத்', stateCode: 'GJ' },
  { name: 'Surat', nameTa: 'சூரத்', stateCode: 'GJ' },
  { name: 'Rajkot', nameTa: 'ராஜ்கோட்', stateCode: 'GJ' },
  
  // Rajasthan
  { name: 'Jaipur', nameTa: 'ஜெய்ப்பூர்', stateCode: 'RJ' },
  { name: 'Jodhpur', nameTa: 'ஜோத்பூர்', stateCode: 'RJ' },
  { name: 'Kota', nameTa: 'கோட்டா', stateCode: 'RJ' },
  
  // Uttar Pradesh
  { name: 'Lucknow', nameTa: 'லக்னோ', stateCode: 'UP' },
  { name: 'Kanpur', nameTa: 'கான்பூர்', stateCode: 'UP' },
  { name: 'Agra', nameTa: 'ஆக்ரா', stateCode: 'UP' },
  { name: 'Varanasi', nameTa: 'வாரணாசி', stateCode: 'UP' },
  
  // Madhya Pradesh
  { name: 'Bhopal', nameTa: 'போபால்', stateCode: 'MP' },
  { name: 'Indore', nameTa: 'இந்தூர்', stateCode: 'MP' },
  { name: 'Jabalpur', nameTa: 'ஜபல்பூர்', stateCode: 'MP' },
  
  // Punjab
  { name: 'Ludhiana', nameTa: 'லுதியானா', stateCode: 'PB' },
  { name: 'Amritsar', nameTa: 'அமிர்தசரஸ்', stateCode: 'PB' },
  { name: 'Jalandhar', nameTa: 'ஜலந்தர்', stateCode: 'PB' },
  
  // Haryana
  { name: 'Chandigarh', nameTa: 'சண்டிகர்', stateCode: 'HR' },
  { name: 'Karnal', nameTa: 'கர்னால்', stateCode: 'HR' },
  { name: 'Hisar', nameTa: 'ஹிசார்', stateCode: 'HR' },
  
  // West Bengal
  { name: 'Kolkata', nameTa: 'கொல்கத்தா', stateCode: 'WB' },
  { name: 'Howrah', nameTa: 'ஹவ்ரா', stateCode: 'WB' },
  
  // Odisha
  { name: 'Bhubaneswar', nameTa: 'புவனேஸ்வர்', stateCode: 'OR' },
  { name: 'Cuttack', nameTa: 'கட்டாக்', stateCode: 'OR' },
  
  // Telangana
  { name: 'Hyderabad', nameTa: 'ஹைதராபாத்', stateCode: 'TS' },
  { name: 'Warangal', nameTa: 'வாரங்கல்', stateCode: 'TS' },
  { name: 'Karimnagar', nameTa: 'கரிம்நகர்', stateCode: 'TS' },
  
  // Bihar
  { name: 'Patna', nameTa: 'பாட்னா', stateCode: 'BR' },
  { name: 'Gaya', nameTa: 'கயா', stateCode: 'BR' },
];

export const markets: Market[] = [
  // Tamil Nadu Markets
  { name: 'Koyambedu Market', nameTa: 'கோயம்பேடு சந்தை', district: 'Chennai', stateCode: 'TN', lat: 13.0694, lng: 80.1948 },
  { name: 'Mettupalayam Market', nameTa: 'மேட்டுப்பாளையம் சந்தை', district: 'Coimbatore', stateCode: 'TN', lat: 11.2990, lng: 76.9366 },
  { name: 'Oddanchatram Market', nameTa: 'ஒட்டன்சத்திரம் சந்தை', district: 'Madurai', stateCode: 'TN', lat: 10.4858, lng: 77.7519 },
  { name: 'Salem New Bus Stand Market', nameTa: 'சேலம் புது பேருந்து நிலையம் சந்தை', district: 'Salem', stateCode: 'TN', lat: 11.6644, lng: 78.1460 },
  { name: 'Thanjavur APMC', nameTa: 'தஞ்சாவூர் ஏபிஎம்சி', district: 'Thanjavur', stateCode: 'TN', lat: 10.7870, lng: 79.1378 },
  { name: 'Trichy Main Market', nameTa: 'திருச்சி பிரதான சந்தை', district: 'Trichy', stateCode: 'TN', lat: 10.7905, lng: 78.7047 },
  { name: 'Erode Regulated Market', nameTa: 'ஈரோடு ஒழுங்கமைக்கப்பட்ட சந்தை', district: 'Erode', stateCode: 'TN', lat: 11.3410, lng: 77.7172 },
  
  // Andhra Pradesh Markets
  { name: 'Vijayawada Market Yard', nameTa: 'விஜயவாடா சந்தை முற்றம்', district: 'Vijayawada', stateCode: 'AP', lat: 16.5062, lng: 80.6480 },
  { name: 'Guntur Mirchi Yard', nameTa: 'குண்டூர் மிளகாய் முற்றம்', district: 'Guntur', stateCode: 'AP', lat: 16.3067, lng: 80.4365 },
  { name: 'Kurnool APMC', nameTa: 'கர்னூல் ஏபிஎம்சி', district: 'Kurnool', stateCode: 'AP', lat: 15.8281, lng: 78.0373 },
  
  // Karnataka Markets
  { name: 'APMC Yeshwantpur', nameTa: 'ஏபிஎம்சி யெஷ்வந்த்பூர்', district: 'Bangalore', stateCode: 'KA', lat: 13.0285, lng: 77.5418 },
  { name: 'Mysore APMC', nameTa: 'மைசூர் ஏபிஎம்சி', district: 'Mysore', stateCode: 'KA', lat: 12.2958, lng: 76.6394 },
  { name: 'Hubli APMC', nameTa: 'ஹுப்பளி ஏபிஎம்சி', district: 'Hubli', stateCode: 'KA', lat: 15.3647, lng: 75.1240 },
  
  // Kerala Markets
  { name: 'Ernakulam Market', nameTa: 'எர்ணாகுளம் சந்தை', district: 'Kochi', stateCode: 'KL', lat: 9.9816, lng: 76.2999 },
  { name: 'Chalai Market', nameTa: 'சாலை சந்தை', district: 'Thiruvananthapuram', stateCode: 'KL', lat: 8.4875, lng: 76.9525 },
  
  // Maharashtra Markets
  { name: 'Vashi APMC', nameTa: 'வாஷி ஏபிஎம்சி', district: 'Mumbai', stateCode: 'MH', lat: 19.0760, lng: 72.9984 },
  { name: 'Gultekdi Market Yard', nameTa: 'குல்டேக்டி சந்தை முற்றம்', district: 'Pune', stateCode: 'MH', lat: 18.4969, lng: 73.8674 },
  { name: 'Lasalgaon Onion Market', nameTa: 'லசல்காவ் வெங்காய சந்தை', district: 'Nashik', stateCode: 'MH', lat: 20.1451, lng: 74.2381 },
  
  // Gujarat Markets
  { name: 'Unjha APMC', nameTa: 'உஞ்சா ஏபிஎம்சி', district: 'Ahmedabad', stateCode: 'GJ', lat: 23.8027, lng: 72.3941 },
  { name: 'Surat APMC', nameTa: 'சூரத் ஏபிஎம்சி', district: 'Surat', stateCode: 'GJ', lat: 21.1702, lng: 72.8311 },
  
  // Punjab Markets
  { name: 'Ludhiana Grain Market', nameTa: 'லுதியானா தானிய சந்தை', district: 'Ludhiana', stateCode: 'PB', lat: 30.9010, lng: 75.8573 },
  { name: 'Amritsar Mandi', nameTa: 'அமிர்தசரஸ் மண்டி', district: 'Amritsar', stateCode: 'PB', lat: 31.6340, lng: 74.8723 },
  
  // Haryana Markets
  { name: 'Karnal Grain Market', nameTa: 'கர்னால் தானிய சந்தை', district: 'Karnal', stateCode: 'HR', lat: 29.6857, lng: 76.9905 },
  { name: 'Hisar Mandi', nameTa: 'ஹிசார் மண்டி', district: 'Hisar', stateCode: 'HR', lat: 29.1492, lng: 75.7217 },
  
  // Uttar Pradesh Markets
  { name: 'Lucknow Mandi', nameTa: 'லக்னோ மண்டி', district: 'Lucknow', stateCode: 'UP', lat: 26.8467, lng: 80.9462 },
  { name: 'Agra Mandi', nameTa: 'ஆக்ரா மண்டி', district: 'Agra', stateCode: 'UP', lat: 27.1767, lng: 78.0081 },
  
  // Madhya Pradesh Markets
  { name: 'Bhopal Mandi', nameTa: 'போபால் மண்டி', district: 'Bhopal', stateCode: 'MP', lat: 23.2599, lng: 77.4126 },
  { name: 'Indore Mandi', nameTa: 'இந்தூர் மண்டி', district: 'Indore', stateCode: 'MP', lat: 22.7196, lng: 75.8577 },
  
  // Telangana Markets
  { name: 'Hyderabad Agricultural Market', nameTa: 'ஹைதராபாத் விவசாய சந்தை', district: 'Hyderabad', stateCode: 'TS', lat: 17.3850, lng: 78.4867 },
  { name: 'Warangal Market Yard', nameTa: 'வாரங்கல் சந்தை முற்றம்', district: 'Warangal', stateCode: 'TS', lat: 17.9784, lng: 79.5941 },
  
  // West Bengal Markets
  { name: 'Kolkata Fruit Market', nameTa: 'கொல்கத்தா பழ சந்தை', district: 'Kolkata', stateCode: 'WB', lat: 22.5726, lng: 88.3639 },
  
  // Bihar Markets
  { name: 'Patna Mandi', nameTa: 'பாட்னா மண்டி', district: 'Patna', stateCode: 'BR', lat: 25.6093, lng: 85.1376 },
];

export const getDistrictsByState = (stateCode: string): District[] => {
  return districts.filter(d => d.stateCode === stateCode);
};

export const getMarketsByDistrict = (district: string, stateCode: string): Market[] => {
  return markets.filter(m => m.district === district && m.stateCode === stateCode);
};

export const getNearbyMarkets = (lat: number, lng: number, limit: number = 5): Market[] => {
  return markets
    .map(market => ({
      ...market,
      distance: Math.sqrt(Math.pow(market.lat - lat, 2) + Math.pow(market.lng - lng, 2)),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};
