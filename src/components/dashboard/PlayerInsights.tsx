import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlayerInsightsProps {
  data?: {
    batter_strengths?: string[];
    batter_weaknesses?: string[];
    pitcher_strengths?: string[];
    pitcher_weaknesses?: string[];
  };
}

export const PlayerInsights = ({ data }: PlayerInsightsProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Player Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batter */}
        <div className="space-y-3">
          <Badge variant="outline" className="mb-2">Batter</Badge>
          
          {data?.batter_strengths && data.batter_strengths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase">Strengths</p>
              </div>
              <div className="space-y-2">
                {data.batter_strengths.map((strength, idx) => (
                  <div key={idx} className="p-2 rounded bg-primary/5 border border-primary/20">
                    <p className="text-sm text-foreground">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.batter_weaknesses && data.batter_weaknesses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-xs text-muted-foreground uppercase">Weaknesses</p>
              </div>
              <div className="space-y-2">
                {data.batter_weaknesses.map((weakness, idx) => (
                  <div key={idx} className="p-2 rounded bg-destructive/5 border border-destructive/20">
                    <p className="text-sm text-foreground">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pitcher */}
        <div className="space-y-3">
          <Badge variant="outline" className="mb-2">Pitcher</Badge>
          
          {data?.pitcher_strengths && data.pitcher_strengths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase">Strengths</p>
              </div>
              <div className="space-y-2">
                {data.pitcher_strengths.map((strength, idx) => (
                  <div key={idx} className="p-2 rounded bg-primary/5 border border-primary/20">
                    <p className="text-sm text-foreground">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.pitcher_weaknesses && data.pitcher_weaknesses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-xs text-muted-foreground uppercase">Weaknesses</p>
              </div>
              <div className="space-y-2">
                {data.pitcher_weaknesses.map((weakness, idx) => (
                  <div key={idx} className="p-2 rounded bg-destructive/5 border border-destructive/20">
                    <p className="text-sm text-foreground">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
