import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  rainfall: number;
  condition: string;
  icon: string;
}

interface UseWeatherResult {
  current: WeatherData | null;
  forecast: ForecastDay[];
  isLoading: boolean;
  error: string | null;
}

const getWeatherCondition = (code: number): { condition: string; icon: string } => {
  if (code === 0) return { condition: 'Clear', icon: '☀️' };
  if (code <= 3) return { condition: 'Partly Cloudy', icon: '⛅' };
  if (code <= 48) return { condition: 'Foggy', icon: '🌫️' };
  if (code <= 57) return { condition: 'Drizzle', icon: '🌧️' };
  if (code <= 67) return { condition: 'Rain', icon: '🌧️' };
  if (code <= 77) return { condition: 'Snow', icon: '❄️' };
  if (code <= 82) return { condition: 'Heavy Rain', icon: '⛈️' };
  if (code <= 86) return { condition: 'Snow Showers', icon: '🌨️' };
  return { condition: 'Thunderstorm', icon: '⛈️' };
};

export const useWeather = (lat: number | null, lng: number | null): UseWeatherResult => {
  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lng === null) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Parse current weather
        const currentWeather = getWeatherCondition(data.current.weather_code);
        setCurrent({
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          rainfall: data.current.precipitation,
          windSpeed: Math.round(data.current.wind_speed_10m),
          condition: currentWeather.condition,
          icon: currentWeather.icon,
        });

        // Parse forecast (next 5 days)
        const forecastData: ForecastDay[] = data.daily.time.slice(0, 5).map((date: string, i: number) => {
          const dayWeather = getWeatherCondition(data.daily.weather_code[i]);
          return {
            date,
            tempMax: Math.round(data.daily.temperature_2m_max[i]),
            tempMin: Math.round(data.daily.temperature_2m_min[i]),
            rainfall: data.daily.precipitation_sum[i],
            condition: dayWeather.condition,
            icon: dayWeather.icon,
          };
        });
        setForecast(forecastData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  return { current, forecast, isLoading, error };
};
