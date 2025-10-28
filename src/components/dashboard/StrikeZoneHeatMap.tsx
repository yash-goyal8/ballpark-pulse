import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface StrikeZoneHeatMapProps {
  data?: {
    zones?: number[]; // 9 zones, values 0-1 representing frequency
  };
}

export const StrikeZoneHeatMap = ({ data }: StrikeZoneHeatMapProps) => {
  // Generate sample data if not provided (9 zones in 3x3 grid)
  const zones = data?.zones || [0.15, 0.25, 0.20, 0.30, 0.45, 0.28, 0.18, 0.22, 0.16];
  
  const getHeatColor = (value: number) => {
    if (value > 0.4) return 'bg-red-500/80 border-red-400';
    if (value > 0.3) return 'bg-orange-500/80 border-orange-400';
    if (value > 0.2) return 'bg-yellow-500/80 border-yellow-400';
    if (value > 0.1) return 'bg-blue-500/80 border-blue-400';
    return 'bg-secondary border-border';
  };

  const getZoneLabel = (index: number) => {
    const positions = ['Top-L', 'Top-M', 'Top-R', 'Mid-L', 'Center', 'Mid-R', 'Low-L', 'Low-M', 'Low-R'];
    return positions[index];
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/90 border-border shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Strike Zone Heat Map</h3>
          <p className="text-xs text-muted-foreground">Pitch location frequency</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Strike Zone Grid */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-secondary/30 rounded-lg border-2 border-border">
          {zones.map((value, index) => (
            <div
              key={index}
              className={`relative aspect-square rounded-md border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${getHeatColor(value)}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-white drop-shadow-md">
                  {getZoneLabel(index)}
                </span>
                <span className="text-lg font-bold text-white drop-shadow-md mt-1">
                  {(value * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500/80 border border-red-400" />
              <span className="text-muted-foreground">Hot (40%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-orange-500/80 border border-orange-400" />
              <span className="text-muted-foreground">High (30%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-yellow-500/80 border border-yellow-400" />
              <span className="text-muted-foreground">Med (20%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500/80 border border-blue-400" />
              <span className="text-muted-foreground">Low (10%+)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
