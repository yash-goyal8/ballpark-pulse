import { Card } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherForecastProps {
  data?: {
    condition?: string;
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
  };
}

export const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const getWeatherIcon = (condition?: string) => {
    switch (condition?.toLowerCase()) {
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-primary" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-primary" />;
      case 'sunny':
        return <Sun className="h-8 w-8 text-primary" />;
      default:
        return <Cloud className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wind className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Weather Forecast</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {getWeatherIcon(data?.condition)}
          <div>
            <p className="text-3xl font-bold text-foreground">{data?.temperature || '--'}°C</p>
            <p className="text-sm text-muted-foreground capitalize">{data?.condition || 'N/A'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-lg font-semibold text-foreground">{data?.humidity || '--'}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Wind Speed</p>
            <p className="text-lg font-semibold text-foreground">{data?.windSpeed || '--'} km/h</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
