export interface Mandi {
  id: string;
  name: string;
  nameTa: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  type: 'APMC' | 'Regulated' | 'Private';
  majorCrops: string[];
}

export const mandis: Mandi[] = [
  // Tamil Nadu
  { id: 'tn-1', name: 'Koyambedu Market', nameTa: 'கோயம்பேடு சந்தை', state: 'Tamil Nadu', district: 'Chennai', lat: 13.0694, lng: 80.1948, type: 'APMC', majorCrops: ['Vegetables', 'Fruits', 'Flowers'] },
  { id: 'tn-2', name: 'Erode Regulated Market', nameTa: 'ஈரோடு ஒழுங்குபடுத்தப்பட்ட சந்தை', state: 'Tamil Nadu', district: 'Erode', lat: 11.3410, lng: 77.7172, type: 'Regulated', majorCrops: ['Turmeric', 'Cotton', 'Coconut'] },
  { id: 'tn-3', name: 'Madurai Mandi', nameTa: 'மதுரை மண்டி', state: 'Tamil Nadu', district: 'Madurai', lat: 9.9252, lng: 78.1198, type: 'APMC', majorCrops: ['Rice', 'Vegetables', 'Banana'] },
  { id: 'tn-4', name: 'Coimbatore APMC', nameTa: 'கோயம்புத்தூர் APMC', state: 'Tamil Nadu', district: 'Coimbatore', lat: 11.0168, lng: 76.9558, type: 'APMC', majorCrops: ['Vegetables', 'Coconut', 'Groundnut'] },
  { id: 'tn-5', name: 'Salem Market Yard', nameTa: 'சேலம் சந்தை முற்றம்', state: 'Tamil Nadu', district: 'Salem', lat: 11.6643, lng: 78.1460, type: 'Regulated', majorCrops: ['Tapioca', 'Mango', 'Banana'] },

  // Maharashtra
  { id: 'mh-1', name: 'Vashi APMC Market', nameTa: 'வாஷி APMC சந்தை', state: 'Maharashtra', district: 'Navi Mumbai', lat: 19.0771, lng: 72.9986, type: 'APMC', majorCrops: ['Onion', 'Potato', 'Vegetables'] },
  { id: 'mh-2', name: 'Pune Market Yard', nameTa: 'புனே சந்தை முற்றம்', state: 'Maharashtra', district: 'Pune', lat: 18.5074, lng: 73.8077, type: 'APMC', majorCrops: ['Grapes', 'Onion', 'Tomato'] },
  { id: 'mh-3', name: 'Lasalgaon Onion Market', nameTa: 'லசல்கான் வெங்காய சந்தை', state: 'Maharashtra', district: 'Nashik', lat: 20.1442, lng: 74.2354, type: 'Regulated', majorCrops: ['Onion', 'Grapes', 'Tomato'] },
  { id: 'mh-4', name: 'Nagpur Orange Market', nameTa: 'நாக்பூர் ஆரஞ்சு சந்தை', state: 'Maharashtra', district: 'Nagpur', lat: 21.1458, lng: 79.0882, type: 'APMC', majorCrops: ['Orange', 'Cotton', 'Soybean'] },
  { id: 'mh-5', name: 'Aurangabad Mandi', nameTa: 'அவுரங்காபாத் மண்டி', state: 'Maharashtra', district: 'Aurangabad', lat: 19.8762, lng: 75.3433, type: 'APMC', majorCrops: ['Cotton', 'Jowar', 'Bajra'] },

  // Delhi NCR
  { id: 'dl-1', name: 'Azadpur Mandi', nameTa: 'ஆசாத்பூர் மண்டி', state: 'Delhi', district: 'North Delhi', lat: 28.7173, lng: 77.1784, type: 'APMC', majorCrops: ['Vegetables', 'Fruits', 'Onion'] },
  { id: 'dl-2', name: 'Okhla Mandi', nameTa: 'ஓக்லா மண்டி', state: 'Delhi', district: 'South Delhi', lat: 28.5355, lng: 77.2724, type: 'APMC', majorCrops: ['Grains', 'Pulses', 'Spices'] },
  { id: 'dl-3', name: 'Ghazipur Mandi', nameTa: 'காஜிபூர் மண்டி', state: 'Delhi', district: 'East Delhi', lat: 28.6358, lng: 77.3201, type: 'APMC', majorCrops: ['Flowers', 'Fruits', 'Vegetables'] },

  // Uttar Pradesh
  { id: 'up-1', name: 'Lucknow Mandi Samiti', nameTa: 'லக்னோ மண்டி சமிதி', state: 'Uttar Pradesh', district: 'Lucknow', lat: 26.8467, lng: 80.9462, type: 'APMC', majorCrops: ['Wheat', 'Rice', 'Sugarcane'] },
  { id: 'up-2', name: 'Kanpur Grain Market', nameTa: 'கான்பூர் தானிய சந்தை', state: 'Uttar Pradesh', district: 'Kanpur', lat: 26.4499, lng: 80.3319, type: 'Regulated', majorCrops: ['Wheat', 'Pulses', 'Potato'] },
  { id: 'up-3', name: 'Varanasi Mandi', nameTa: 'வாரணாசி மண்டி', state: 'Uttar Pradesh', district: 'Varanasi', lat: 25.3176, lng: 82.9739, type: 'APMC', majorCrops: ['Rice', 'Vegetables', 'Betel Leaf'] },
  { id: 'up-4', name: 'Agra Mandi', nameTa: 'ஆக்ரா மண்டி', state: 'Uttar Pradesh', district: 'Agra', lat: 27.1767, lng: 78.0081, type: 'APMC', majorCrops: ['Potato', 'Wheat', 'Mustard'] },
  { id: 'up-5', name: 'Meerut Mandi', nameTa: 'மீரட் மண்டி', state: 'Uttar Pradesh', district: 'Meerut', lat: 28.9845, lng: 77.7064, type: 'Regulated', majorCrops: ['Sugarcane', 'Wheat', 'Jaggery'] },

  // Gujarat
  { id: 'gj-1', name: 'Unjha APMC', nameTa: 'உஞ்சா APMC', state: 'Gujarat', district: 'Mehsana', lat: 23.8039, lng: 72.3967, type: 'APMC', majorCrops: ['Cumin', 'Fennel', 'Coriander'] },
  { id: 'gj-2', name: 'Rajkot Market Yard', nameTa: 'ராஜ்கோட் சந்தை முற்றம்', state: 'Gujarat', district: 'Rajkot', lat: 22.3039, lng: 70.8022, type: 'APMC', majorCrops: ['Groundnut', 'Cotton', 'Castor'] },
  { id: 'gj-3', name: 'Ahmedabad APMC', nameTa: 'அகமதாபாத் APMC', state: 'Gujarat', district: 'Ahmedabad', lat: 23.0225, lng: 72.5714, type: 'APMC', majorCrops: ['Cotton', 'Castor', 'Wheat'] },
  { id: 'gj-4', name: 'Gondal Mandi', nameTa: 'கோண்டல் மண்டி', state: 'Gujarat', district: 'Rajkot', lat: 21.9612, lng: 70.7954, type: 'Regulated', majorCrops: ['Groundnut', 'Cotton', 'Onion'] },

  // Madhya Pradesh
  { id: 'mp-1', name: 'Indore Mandi', nameTa: 'இந்தோர் மண்டி', state: 'Madhya Pradesh', district: 'Indore', lat: 22.7196, lng: 75.8577, type: 'APMC', majorCrops: ['Soybean', 'Wheat', 'Gram'] },
  { id: 'mp-2', name: 'Bhopal Market Yard', nameTa: 'போபால் சந்தை முற்றம்', state: 'Madhya Pradesh', district: 'Bhopal', lat: 23.2599, lng: 77.4126, type: 'APMC', majorCrops: ['Wheat', 'Gram', 'Soybean'] },
  { id: 'mp-3', name: 'Neemuch Mandi', nameTa: 'நீமுச் மண்டி', state: 'Madhya Pradesh', district: 'Neemuch', lat: 24.4710, lng: 74.8640, type: 'Regulated', majorCrops: ['Garlic', 'Coriander', 'Opium Poppy'] },

  // Rajasthan
  { id: 'rj-1', name: 'Jaipur Mandi', nameTa: 'ஜெய்பூர் மண்டி', state: 'Rajasthan', district: 'Jaipur', lat: 26.9124, lng: 75.7873, type: 'APMC', majorCrops: ['Bajra', 'Wheat', 'Mustard'] },
  { id: 'rj-2', name: 'Kota Mandi', nameTa: 'கோட்டா மண்டி', state: 'Rajasthan', district: 'Kota', lat: 25.2138, lng: 75.8648, type: 'APMC', majorCrops: ['Soybean', 'Wheat', 'Coriander'] },
  { id: 'rj-3', name: 'Jodhpur Grain Market', nameTa: 'ஜோத்பூர் தானிய சந்தை', state: 'Rajasthan', district: 'Jodhpur', lat: 26.2389, lng: 73.0243, type: 'Regulated', majorCrops: ['Cumin', 'Bajra', 'Guar'] },

  // Punjab
  { id: 'pb-1', name: 'Khanna Grain Mandi', nameTa: 'கன்னா தானிய மண்டி', state: 'Punjab', district: 'Ludhiana', lat: 30.6942, lng: 76.2180, type: 'APMC', majorCrops: ['Wheat', 'Rice', 'Maize'] },
  { id: 'pb-2', name: 'Amritsar Mandi', nameTa: 'அமிர்தசரஸ் மண்டி', state: 'Punjab', district: 'Amritsar', lat: 31.6340, lng: 74.8723, type: 'APMC', majorCrops: ['Wheat', 'Rice', 'Potato'] },
  { id: 'pb-3', name: 'Jalandhar Market', nameTa: 'ஜலந்தர் சந்தை', state: 'Punjab', district: 'Jalandhar', lat: 31.3260, lng: 75.5762, type: 'Regulated', majorCrops: ['Vegetables', 'Potato', 'Wheat'] },

  // Haryana
  { id: 'hr-1', name: 'Karnal Mandi', nameTa: 'கர்னால் மண்டி', state: 'Haryana', district: 'Karnal', lat: 29.6857, lng: 76.9905, type: 'APMC', majorCrops: ['Basmati Rice', 'Wheat', 'Sugarcane'] },
  { id: 'hr-2', name: 'Hisar Grain Market', nameTa: 'ஹிசார் தானிய சந்தை', state: 'Haryana', district: 'Hisar', lat: 29.1492, lng: 75.7217, type: 'APMC', majorCrops: ['Cotton', 'Mustard', 'Wheat'] },

  // Karnataka
  { id: 'ka-1', name: 'Hubli-Dharwad APMC', nameTa: 'ஹுப்ளி-தர்வாட் APMC', state: 'Karnataka', district: 'Dharwad', lat: 15.3647, lng: 75.1240, type: 'APMC', majorCrops: ['Cotton', 'Groundnut', 'Chilli'] },
  { id: 'ka-2', name: 'Belgaum Market', nameTa: 'பெல்காம் சந்தை', state: 'Karnataka', district: 'Belgaum', lat: 15.8497, lng: 74.4977, type: 'APMC', majorCrops: ['Sugarcane', 'Jowar', 'Groundnut'] },
  { id: 'ka-3', name: 'Davangere Mandi', nameTa: 'தாவணகெரே மண்டி', state: 'Karnataka', district: 'Davangere', lat: 14.4644, lng: 75.9218, type: 'Regulated', majorCrops: ['Maize', 'Cotton', 'Groundnut'] },
  { id: 'ka-4', name: 'Mysore APMC', nameTa: 'மைசூர் APMC', state: 'Karnataka', district: 'Mysore', lat: 12.2958, lng: 76.6394, type: 'APMC', majorCrops: ['Tobacco', 'Vegetables', 'Flowers'] },

  // Andhra Pradesh
  { id: 'ap-1', name: 'Guntur Chilli Market', nameTa: 'குண்டூர் மிளகாய் சந்தை', state: 'Andhra Pradesh', district: 'Guntur', lat: 16.3067, lng: 80.4365, type: 'APMC', majorCrops: ['Chilli', 'Cotton', 'Tobacco'] },
  { id: 'ap-2', name: 'Vijayawada Market Yard', nameTa: 'விஜயவாடா சந்தை முற்றம்', state: 'Andhra Pradesh', district: 'Krishna', lat: 16.5062, lng: 80.6480, type: 'APMC', majorCrops: ['Rice', 'Mango', 'Vegetables'] },
  { id: 'ap-3', name: 'Kurnool Mandi', nameTa: 'கர்னூல் மண்டி', state: 'Andhra Pradesh', district: 'Kurnool', lat: 15.8281, lng: 78.0373, type: 'Regulated', majorCrops: ['Groundnut', 'Sunflower', 'Cotton'] },

  // Telangana
  { id: 'ts-1', name: 'Warangal Mandi', nameTa: 'வாரங்கல் மண்டி', state: 'Telangana', district: 'Warangal', lat: 17.9784, lng: 79.5941, type: 'APMC', majorCrops: ['Rice', 'Cotton', 'Turmeric'] },
  { id: 'ts-2', name: 'Nizamabad Turmeric Market', nameTa: 'நிஜாமாபாத் மஞ்சள் சந்தை', state: 'Telangana', district: 'Nizamabad', lat: 18.6725, lng: 78.0941, type: 'Regulated', majorCrops: ['Turmeric', 'Rice', 'Soybean'] },

  // West Bengal
  { id: 'wb-1', name: 'Siliguri Mandi', nameTa: 'சிலிகுரி மண்டி', state: 'West Bengal', district: 'Darjeeling', lat: 26.7271, lng: 88.3953, type: 'APMC', majorCrops: ['Tea', 'Rice', 'Jute'] },
  { id: 'wb-2', name: 'Kolkata Wholesale Market', nameTa: 'கொல்கத்தா மொத்த சந்தை', state: 'West Bengal', district: 'Kolkata', lat: 22.5726, lng: 88.3639, type: 'APMC', majorCrops: ['Rice', 'Vegetables', 'Fish'] },

  // Bihar
  { id: 'br-1', name: 'Patna Mandi', nameTa: 'பாட்னா மண்டி', state: 'Bihar', district: 'Patna', lat: 25.5941, lng: 85.1376, type: 'APMC', majorCrops: ['Wheat', 'Rice', 'Maize'] },
  { id: 'br-2', name: 'Muzaffarpur Litchi Market', nameTa: 'முஜாபர்பூர் லிச்சி சந்தை', state: 'Bihar', district: 'Muzaffarpur', lat: 26.1209, lng: 85.3647, type: 'Regulated', majorCrops: ['Litchi', 'Mango', 'Vegetables'] },

  // Odisha
  { id: 'od-1', name: 'Cuttack Mandi', nameTa: 'கட்டக் மண்டி', state: 'Odisha', district: 'Cuttack', lat: 20.4625, lng: 85.8830, type: 'APMC', majorCrops: ['Rice', 'Vegetables', 'Jute'] },

  // Kerala
  { id: 'kl-1', name: 'Cochin Spice Market', nameTa: 'கொச்சின் மசாலா சந்தை', state: 'Kerala', district: 'Ernakulam', lat: 9.9312, lng: 76.2673, type: 'Private', majorCrops: ['Pepper', 'Cardamom', 'Rubber'] },
];

// Helper function to get nearby mandis
export const getNearbyMandis = (lat: number, lng: number, limit: number = 10): Mandi[] => {
  const mandisWithDistance = mandis.map(mandi => {
    const distance = Math.sqrt(
      Math.pow(mandi.lat - lat, 2) + Math.pow(mandi.lng - lng, 2)
    ) * 111; // Approximate km conversion
    return { ...mandi, distance };
  });

  return mandisWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

// Get all unique states
export const getMandiStates = (): string[] => {
  return [...new Set(mandis.map(m => m.state))];
};

// Get mandis by state
export const getMandisByState = (state: string): Mandi[] => {
  return mandis.filter(m => m.state === state);
};
