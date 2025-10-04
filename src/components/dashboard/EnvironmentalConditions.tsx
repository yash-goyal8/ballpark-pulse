import { Card } from '@/components/ui/card';
import { Cloud, Wind, Droplets, Eye, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EnvironmentalConditionsProps {
  weather?: {
    temp_f?: number;
    humidity_pct?: number;
    wind_mph?: number;
    wind_dir?: string;
    precip_prob?: number;
    roof?: string;
  };
  pitch?: {
    ball_grip?: string;
    mound?: string;
    visibility?: string;
    wind_effect?: string;
  };
}

export const EnvironmentalConditions = ({ weather, pitch }: EnvironmentalConditionsProps) => {
  const getWindEffectColor = (effect?: string) => {
    switch (effect) {
      case 'helping':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'hurting':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      default:
        return 'bg-secondary text-foreground border-border';
    }
  };

  const getGripColor = (grip?: string) => {
    switch (grip) {
      case 'dry':
        return 'text-primary';
      case 'wet':
      case 'humid':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Cloud className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Field Conditions</h3>
      </div>

      {/* Weather */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase">Weather</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/10">
              <Cloud className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="text-lg font-bold text-foreground">{weather?.temp_f || 0}°F</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/10">
              <Droplets className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-lg font-bold text-foreground">{weather?.humidity_pct || 0}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wind className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-lg font-bold text-foreground">{weather?.wind_mph || 0} mph</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="p-2 rounded-lg bg-primary/10">
              <Droplets className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rain Chance</p>
              <p className="text-lg font-bold text-foreground">{((weather?.precip_prob || 0) * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {weather?.wind_dir && (
          <div className="p-3 rounded-lg bg-secondary/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Wind Direction</p>
            <p className="text-sm font-semibold text-foreground">{weather.wind_dir}</p>
          </div>
        )}

        {weather?.roof && (
          <Badge variant="outline" className="w-full justify-center py-2">
            Roof: {weather.roof}
          </Badge>
        )}
      </div>

      {/* Pitch Conditions */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase">Pitch Conditions</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Visibility</p>
            </div>
            <p className="text-sm font-semibold text-foreground capitalize">{pitch?.visibility || 'day'}</p>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Mountain className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Mound</p>
            </div>
            <p className="text-sm font-semibold text-foreground capitalize">{pitch?.mound || 'good'}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-secondary/30 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Ball Grip</p>
              <p className={`text-lg font-bold capitalize ${getGripColor(pitch?.ball_grip)}`}>
                {pitch?.ball_grip || 'normal'}
              </p>
            </div>
            <Badge className={`${getWindEffectColor(pitch?.wind_effect)}`}>
              Wind: {pitch?.wind_effect || 'neutral'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
