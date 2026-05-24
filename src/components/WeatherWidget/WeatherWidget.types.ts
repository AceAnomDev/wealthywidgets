export type WeatherCondition =
  | 'sunny'
  | 'cloudy'
  | 'partly-cloudy'
  | 'rainy'
  | 'stormy'
  | 'snowy'
  | 'windy'
  | 'foggy'
  | 'hail';

export type TemperatureUnit = 'C' | 'F';

export interface WeatherForecastDay {
  /** Day label, e.g. "Mon" or a Date */
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}

export interface WeatherWidgetProps {
  /** Location display name */
  location?: string;
  /** Current temperature */
  temperature?: number;
  /** Temperature unit */
  unit?: TemperatureUnit;
  /** Current weather condition */
  condition?: WeatherCondition;
  /** "Feels like" temperature */
  feelsLike?: number;
  /** Humidity percentage 0–100 */
  humidity?: number;
  /** Wind speed in km/h or mph */
  windSpeed?: number;
  /** Wind speed unit label */
  windUnit?: string;
  /** Visibility in km or mi */
  visibility?: number;
  /** UV Index */
  uvIndex?: number;
  /** 7-day forecast data */
  forecast?: WeatherForecastDay[];
  /** Show the 7-day forecast strip */
  showForecast?: boolean;
  /** Callback when the user requests AI-generated weather data */
  onAiGenerate?: (prompt: string) => Promise<void>;
  /** Loading state */
  loading?: boolean;
  /** Additional className */
  className?: string;
}
