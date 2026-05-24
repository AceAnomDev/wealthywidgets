import type { Meta, StoryObj } from '@storybook/react';
import { WeatherWidget } from './WeatherWidget';
import type { WeatherForecastDay } from './WeatherWidget.types';

const meta: Meta<typeof WeatherWidget> = {
  title: 'Widgets/WeatherWidget',
  component: WeatherWidget,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Current conditions card with condition-driven gradient background and optional 7-day forecast strip.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WeatherWidget>;

const forecast: WeatherForecastDay[] = [
  { day: 'Mon', high: 22, low: 14, condition: 'sunny' },
  { day: 'Tue', high: 18, low: 11, condition: 'partly-cloudy' },
  { day: 'Wed', high: 14, low: 9,  condition: 'rainy' },
  { day: 'Thu', high: 12, low: 7,  condition: 'stormy' },
  { day: 'Fri', high: 16, low: 10, condition: 'cloudy' },
  { day: 'Sat', high: 21, low: 13, condition: 'sunny' },
  { day: 'Sun', high: 23, low: 15, condition: 'sunny' },
];

export const Sunny: Story = {
  args: {
    location: 'San Francisco, CA',
    temperature: 23,
    unit: 'C',
    condition: 'sunny',
    feelsLike: 21,
    humidity: 55,
    windSpeed: 12,
    uvIndex: 6,
    showForecast: true,
    forecast,
  },
};

export const Rainy: Story = {
  args: {
    location: 'London, UK',
    temperature: 11,
    unit: 'C',
    condition: 'rainy',
    feelsLike: 8,
    humidity: 89,
    windSpeed: 22,
    visibility: 4,
    showForecast: true,
    forecast,
  },
};

export const Snowy: Story = {
  args: {
    location: 'Helsinki, Finland',
    temperature: -4,
    unit: 'C',
    condition: 'snowy',
    feelsLike: -9,
    humidity: 78,
    windSpeed: 18,
  },
};

export const Stormy: Story = {
  args: {
    location: 'Miami, FL',
    temperature: 28,
    unit: 'C',
    condition: 'stormy',
    feelsLike: 33,
    humidity: 92,
    windSpeed: 55,
    windUnit: 'km/h',
  },
};

export const WithAiBar: Story = {
  args: {
    location: 'Anywhere',
    condition: 'partly-cloudy',
    temperature: 17,
    onAiGenerate: async (prompt: string) => {
      console.log('Prompt:', prompt);
      await new Promise((r) => setTimeout(r, 1200));
    },
  },
};

export const NoData: Story = {
  args: {
    location: 'Unknown Location',
    condition: 'cloudy',
  },
};
