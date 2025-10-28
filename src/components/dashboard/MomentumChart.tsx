import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MomentumPoint {
  inning: string;
  value: number; // -100 to +100 (away to home)
  event?: string;
}

interface MomentumChartProps {
  data?: {
    points?: MomentumPoint[];
    current?: number;
  };
}

export const MomentumChart = ({ data }: MomentumChartProps) => {
  // Sample momentum data
  const points: MomentumPoint[] = data?.points || [
    { inning: '1', value: 0 },
    { inning: '2', value: 15, event: 'Solo HR' },
    { inning: '3', value: 25 },
    { inning: '4', value: 10 },
    { inning: '5', value: -20, event: '3-run HR' },
    { inning: '6', value: -15 },
    { inning: '7', value: 5, event: '2 RBI Double' },
  ];

  const current = data?.current || 5;
  const trend = current > 0 ? 'home' : 'away';
  const trendStrength = Math.abs(current);

  const getMomentumColor = (value: number) => {
    if (value > 20) return 'text-green-500';
    if (value > 0) return 'text-blue-500';
    if (value < -20) return 'text-red-500';
    if (value < 0) return 'text-orange-500';
    return 'text-muted-foreground';
  };

  const maxValue = Math.max(...points.map(p => Math.abs(p.value)), 50);

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/90 border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${trend === 'home' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {trend === 'home' ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Momentum Tracker</h3>
            <p className="text-xs text-muted-foreground">Game flow by inning</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getMomentumColor(current)}`}>
            {current > 0 ? '+' : ''}{current}
          </div>
          <div className="text-xs text-muted-foreground uppercase font-semibold">
            {trend === 'home' ? '🏠 Home' : '✈️ Away'}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Momentum Chart */}
        <div className="relative h-48 bg-secondary/30 rounded-lg border border-border p-4">
          {/* Center line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border" />
          
          {/* Y-axis labels */}
          <div className="absolute left-1 top-2 text-xs text-muted-foreground">Home +{maxValue}</div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">0</div>
          <div className="absolute left-1 bottom-2 text-xs text-muted-foreground">Away -{maxValue}</div>

          {/* Momentum line */}
          <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            {/* Fill area */}
            <defs>
              <linearGradient id="momentumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            <polyline
              points={points.map((p, i) => {
                const x = (i / (points.length - 1)) * 380 + 10;
                const y = 80 - (p.value / maxValue) * 70;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              className="animate-fade-in"
            />
            
            {/* Data points */}
            {points.map((p, i) => {
              const x = (i / (points.length - 1)) * 380 + 10;
              const y = 80 - (p.value / maxValue) * 70;
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="hsl(var(--primary))"
                    className="animate-scale-in hover:r-7 transition-all"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  {p.event && (
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Inning labels */}
        <div className="flex justify-between px-4">
          {points.map((p, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-semibold text-foreground">{p.inning}</div>
              {p.event && (
                <div className="text-xs text-primary mt-1 max-w-[60px] truncate">
                  {p.event}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trend indicator */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-semibold">Current Trend:</span>
            <div className="flex items-center gap-2">
              <div className={`h-2 rounded-full transition-all ${
                trendStrength > 30 ? 'w-24' : trendStrength > 15 ? 'w-16' : 'w-8'
              } ${trend === 'home' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-bold ${getMomentumColor(current)}`}>
                {trendStrength > 30 ? 'STRONG' : trendStrength > 15 ? 'MODERATE' : 'SLIGHT'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
