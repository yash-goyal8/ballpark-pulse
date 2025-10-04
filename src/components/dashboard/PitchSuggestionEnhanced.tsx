import { Card } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface PitchSuggestionEnhancedProps {
  data?: {
    pitch?: string;
    location?: string;
    confidence?: number;
    why?: string;
  };
}

export const PitchSuggestionEnhanced = ({ data }: PitchSuggestionEnhancedProps) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  
  const confidence = (data?.confidence || 0) * 100;
  
  // Top 3 pitch suggestions (primary from data, others simulated)
  const pitchSuggestions = [
    {
      pitch: data?.pitch || 'splitter',
      location: data?.location || 'down-away',
      confidence: confidence,
      why: data?.why || 'High chase rate in 2-strike counts'
    },
    {
      pitch: 'slider',
      location: 'down-in',
      confidence: confidence * 0.85,
      why: 'Effective against pull hitters'
    },
    {
      pitch: 'fastball',
      location: 'up-in',
      confidence: confidence * 0.72,
      why: 'Can set up off-speed pitches'
    }
  ];

  const getConfidenceColor = (conf: number) => {
    if (conf >= 70) return 'text-primary';
    if (conf >= 50) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  // Strike zone locations with heat values (0-100)
  const strikeZoneHeat = [
    { id: 'up-in', heat: data?.location === 'up-in' ? 90 : 20 },
    { id: 'up-middle', heat: data?.location === 'up-middle' ? 90 : 15 },
    { id: 'up-away', heat: data?.location === 'up-away' ? 90 : 25 },
    { id: 'mid-in', heat: data?.location === 'mid-in' ? 90 : 30 },
    { id: 'mid-middle', heat: data?.location === 'mid-middle' ? 90 : 10 },
    { id: 'mid-away', heat: data?.location === 'mid-away' ? 90 : 35 },
    { id: 'down-in', heat: data?.location === 'down-in' ? 90 : 60 },
    { id: 'down-middle', heat: data?.location === 'down-middle' ? 90 : 40 },
    { id: 'down-away', heat: data?.location === 'down-away' ? 90 : 75 },
  ];

  const getHeatColor = (heat: number) => {
    if (heat >= 80) return 'bg-primary border-primary';
    if (heat >= 60) return 'bg-primary/70 border-primary/70';
    if (heat >= 40) return 'bg-primary/40 border-primary/40';
    if (heat >= 20) return 'bg-primary/20 border-primary/30';
    return 'bg-muted border-border';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Pitch Recommendations</h3>
      </div>

      {/* Top 3 Suggestions */}
      <div className="space-y-3 mb-6">
        {pitchSuggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer ${
              idx === 0 
                ? 'bg-primary/5 border-primary/30' 
                : 'bg-secondary/30 border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  {idx === 0 && <Badge variant="default" className="text-xs">Primary</Badge>}
                  <p className="text-lg font-bold text-foreground capitalize">
                    {suggestion.pitch}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground capitalize mb-2">
                  Target: {suggestion.location.replace(/-/g, ' ')}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {suggestion.why}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className={`h-4 w-4 ${getConfidenceColor(suggestion.confidence)}`} />
                  <span className={`text-xl font-bold ${getConfidenceColor(suggestion.confidence)}`}>
                    {suggestion.confidence.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strike Zone Heatmap */}
      <div className="p-4 rounded-lg bg-secondary/30">
        <p className="text-xs text-muted-foreground uppercase mb-3 text-center font-semibold">
          Strike Zone Heat Map
        </p>
        <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-4">
          {strikeZoneHeat.map((zone) => (
            <div
              key={zone.id}
              className={`aspect-square rounded border-2 transition-all cursor-pointer hover:scale-110 ${getHeatColor(zone.heat)} ${
                hoveredZone === zone.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : ''
              }`}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              {zone.heat >= 80 && (
                <div className="w-full h-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        {hoveredZone && (
          <div className="text-center animate-slide-up">
            <p className="text-xs text-foreground capitalize">
              {hoveredZone.replace(/-/g, ' ')}
            </p>
            <p className="text-xs text-muted-foreground">
              {strikeZoneHeat.find(z => z.id === hoveredZone)?.heat}% effectiveness
            </p>
          </div>
        )}
        
        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-muted border border-border" />
            <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" />
            <div className="w-3 h-3 rounded bg-primary/40 border border-primary/40" />
            <div className="w-3 h-3 rounded bg-primary/70 border border-primary/70" />
            <div className="w-3 h-3 rounded bg-primary border-primary" />
          </div>
          <span>High</span>
        </div>
      </div>
    </Card>
  );
};
