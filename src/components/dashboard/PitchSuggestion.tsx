import { Card } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PitchSuggestionProps {
  data?: {
    pitch?: string;
    location?: string;
    confidence?: number;
    why?: string;
  };
}

export const PitchSuggestion = ({ data }: PitchSuggestionProps) => {
  const confidence = (data?.confidence || 0) * 100;
  
  const getConfidenceColor = (conf: number) => {
    if (conf >= 70) return 'text-primary';
    if (conf >= 50) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-card border-primary/20 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Pitch Suggestion</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold text-primary capitalize mb-1">
              {data?.pitch || 'fastball'}
            </p>
            <p className="text-sm text-muted-foreground capitalize">
              {data?.location?.replace(/-/g, ' ') || 'down middle'}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className={`h-4 w-4 ${getConfidenceColor(confidence)}`} />
              <span className={`text-lg font-bold ${getConfidenceColor(confidence)}`}>
                {confidence.toFixed(0)}%
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              confidence
            </Badge>
          </div>
        </div>

        {data?.why && (
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Reasoning</p>
            <p className="text-sm text-foreground leading-relaxed">
              {data.why}
            </p>
          </div>
        )}

        {/* Visual Location Grid */}
        <div className="p-4 rounded-lg bg-secondary/30">
          <p className="text-xs text-muted-foreground uppercase mb-3 text-center">Strike Zone</p>
          <div className="grid grid-cols-3 gap-1 max-w-[120px] mx-auto">
            {['up-in', 'up-middle', 'up-away', 'mid-in', 'mid-middle', 'mid-away', 'down-in', 'down-middle', 'down-away'].map((loc) => (
              <div
                key={loc}
                className={`aspect-square rounded border ${
                  data?.location === loc
                    ? 'bg-primary border-primary'
                    : 'bg-muted border-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
