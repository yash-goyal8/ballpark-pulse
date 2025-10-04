import { Card } from '@/components/ui/card';
import { Droplets, Eye, Wind } from 'lucide-react';

interface PitchConditionsProps {
  data?: {
    ball_grip?: string;
    mound?: string;
    visibility?: string;
    wind_effect?: string;
  };
}

export const PitchConditions = ({ data }: PitchConditionsProps) => {
  const getStatusColor = (value: string) => {
    const goodValues = ['normal', 'good', 'day', 'neutral'];
    const warningValues = ['dry', 'humid', 'soft', 'twilight', 'cross', 'helping'];
    
    if (goodValues.includes(value.toLowerCase())) return 'text-primary';
    if (warningValues.includes(value.toLowerCase())) return 'text-yellow-500';
    return 'text-destructive';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Droplets className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Pitch Conditions</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ball Grip</span>
          </div>
          <span className={`text-sm font-semibold capitalize ${getStatusColor(data?.ball_grip || 'normal')}`}>
            {data?.ball_grip || 'normal'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <span className="text-sm text-muted-foreground">Mound</span>
          <span className={`text-sm font-semibold capitalize ${getStatusColor(data?.mound || 'good')}`}>
            {data?.mound || 'good'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Visibility</span>
          </div>
          <span className={`text-sm font-semibold capitalize ${getStatusColor(data?.visibility || 'day')}`}>
            {data?.visibility || 'day'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Wind Effect</span>
          </div>
          <span className={`text-sm font-semibold capitalize ${getStatusColor(data?.wind_effect || 'neutral')}`}>
            {data?.wind_effect || 'neutral'}
          </span>
        </div>
      </div>
    </Card>
  );
};
