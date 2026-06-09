import { useState } from 'react';
import { WeatherWidgetProps, WeatherCondition } from './WeatherWidget.types';
import './WeatherWidget.scss';

const CONDITION_ICON: Record<WeatherCondition, string> = {
  sunny:          '☀️',
  cloudy:         '☁️',
  'partly-cloudy':'⛅',
  rainy:          '🌧️',
  stormy:         '⛈️',
  snowy:          '❄️',
  windy:          '💨',
  foggy:          '🌫️',
  hail:           '🌨️',
};

const CONDITION_LABEL: Record<WeatherCondition, string> = {
  sunny:          'Sunny',
  cloudy:         'Cloudy',
  'partly-cloudy':'Partly Cloudy',
  rainy:          'Rainy',
  stormy:         'Thunderstorm',
  snowy:          'Snow',
  windy:          'Windy',
  foggy:          'Foggy',
  hail:           'Hail',
};

/**
 * WeatherWidget — current conditions + 7-day forecast card.
 * Accepts static data or an AI-powered prompt to generate mock/real weather.
 *
 * @example
 * // Static data
 * <WeatherWidget
 *   location="San Francisco, CA"
 *   temperature={18}
 *   unit="C"
 *   condition="partly-cloudy"
 *   humidity={72}
 *   windSpeed={14}
 *   forecast={forecastArray}
 *   showForecast
 * />
 *
 * @example
 * // AI-powered
 * <WeatherWidget
 *   location={city}
 *   temperature={temp}
 *   condition={cond}
 *   onAiGenerate={async (prompt) => {
 *     const data = await fetchWeatherFromAI(prompt);
 *     applyData(data);
 *   }}
 * />
 */
export function WeatherWidget({
  location = 'My Location',
  temperature,
  unit = 'C',
  condition = 'sunny',
  feelsLike,
  humidity,
  windSpeed,
  windUnit = 'km/h',
  visibility,
  uvIndex,
  forecast = [],
  showForecast = false,
  onAiGenerate,
  loading = false,
  className = '',
}: WeatherWidgetProps) {
  const [prompt, setPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiSubmit = async () => {
    if (!prompt.trim() || !onAiGenerate) return;
    setAiLoading(true);
    try {
      await onAiGenerate(prompt.trim());
      setPrompt('');
    } finally {
      setAiLoading(false);
    }
  };

  const busy = loading || aiLoading;

  const rootClasses = [
    'ww-weather',
    `ww-weather--${condition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* AI prompt bar */}
      {onAiGenerate && (
        <div className="ww-weather__ai-bar">
          <input
            className="ww-weather__ai-input"
            type="text"
            placeholder="Ask for weather… e.g. 'rainy 12°C Paris tomorrow'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void handleAiSubmit(); }}
            disabled={busy}
            aria-label="AI weather prompt"
          />
          <button
            type="button"
            className="ww-weather__ai-btn"
            onClick={() => { void handleAiSubmit(); }}
            disabled={!prompt.trim() || busy}
            aria-label="Generate"
          >
            {aiLoading ? <span className="ww-weather__spinner" /> : '✦'}
          </button>
        </div>
      )}

      {busy && temperature === undefined ? (
        <div className="ww-weather__loading">
          <span className="ww-weather__spinner ww-weather__spinner--lg" />
          <span>Fetching weather…</span>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="ww-weather__header">
            <div className="ww-weather__icon" aria-hidden="true">
              {CONDITION_ICON[condition]}
            </div>
            <div className="ww-weather__main">
              <div className="ww-weather__temp">
                {temperature !== undefined ? `${temperature}°${unit}` : '—'}
              </div>
              <div className="ww-weather__condition">
                {CONDITION_LABEL[condition]}
              </div>
              <div className="ww-weather__location">{location}</div>
            </div>
          </div>

          {/* Details row */}
          <div className="ww-weather__details">
            {feelsLike !== undefined && (
              <div className="ww-weather__detail">
                <span className="ww-weather__detail-label">Feels like</span>
                <span className="ww-weather__detail-value">{feelsLike}°{unit}</span>
              </div>
            )}
            {humidity !== undefined && (
              <div className="ww-weather__detail">
                <span className="ww-weather__detail-label">Humidity</span>
                <span className="ww-weather__detail-value">{humidity}%</span>
              </div>
            )}
            {windSpeed !== undefined && (
              <div className="ww-weather__detail">
                <span className="ww-weather__detail-label">Wind</span>
                <span className="ww-weather__detail-value">{windSpeed} {windUnit}</span>
              </div>
            )}
            {visibility !== undefined && (
              <div className="ww-weather__detail">
                <span className="ww-weather__detail-label">Visibility</span>
                <span className="ww-weather__detail-value">{visibility} km</span>
              </div>
            )}
            {uvIndex !== undefined && (
              <div className="ww-weather__detail">
                <span className="ww-weather__detail-label">UV Index</span>
                <span className="ww-weather__detail-value">{uvIndex}</span>
              </div>
            )}
          </div>

          {/* Forecast strip */}
          {showForecast && forecast.length > 0 && (
            <div className="ww-weather__forecast">
              {forecast.map((day) => (
                <div key={day.day} className="ww-weather__forecast-day">
                  <span className="ww-weather__forecast-label">{day.day}</span>
                  <span className="ww-weather__forecast-icon" aria-hidden="true">
                    {CONDITION_ICON[day.condition]}
                  </span>
                  <span className="ww-weather__forecast-high">{day.high}°</span>
                  <span className="ww-weather__forecast-low">{day.low}°</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

WeatherWidget.displayName = 'WeatherWidget';
