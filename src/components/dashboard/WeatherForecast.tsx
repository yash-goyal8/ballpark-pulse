import { Card } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherForecastProps {
  data?: {
    temp_f?: number;
    humidity_pct?: number;
    wind_mph?: number;
    wind_dir?: string;
    precip_prob?: number;
    roof?: string;
  };
}

export const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const getWeatherIcon = (tempF?: number) => {
    if (!tempF) return <Cloud className="h-8 w-8 text-primary" />;
    if (tempF > 80) return <Sun className="h-8 w-8 text-primary" />;
    if (tempF < 60) return <CloudRain className="h-8 w-8 text-primary" />;
    return <Cloud className="h-8 w-8 text-primary" />;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wind className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Weather</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {getWeatherIcon(data?.temp_f)}
          <div>
            <p className="text-3xl font-bold text-foreground">{data?.temp_f || '--'}°F</p>
            <p className="text-sm text-muted-foreground capitalize">{data?.roof || 'Open'} Roof</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-lg font-semibold text-foreground">{data?.humidity_pct || '--'}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-lg font-semibold text-foreground">{data?.wind_mph || '--'} mph</p>
          </div>
        </div>

        {data?.wind_dir && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">Wind Direction</p>
            <p className="text-sm font-semibold text-foreground">{data.wind_dir}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
