import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScoreboardProps {
  data?: {
    home_team?: string;
    away_team?: string;
    score?: { home: number; away: number };
    inning?: number;
    half?: string;
    batter?: { name?: string; hand?: string };
    pitcher?: { name?: string; hand?: string };
    batting_team?: string;
  };
}

export const Scoreboard = ({ data }: ScoreboardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Matchup</h3>
      </div>
      
      <div className="space-y-4">
        {/* Pitcher vs Batter */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Pitcher</p>
            <p className="text-lg font-bold text-foreground mb-1">{data?.pitcher?.name || 'Pitcher'}</p>
            <Badge variant="secondary" className="text-xs">
              {data?.pitcher?.hand || 'R'}HP
            </Badge>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Batter</p>
            <p className="text-lg font-bold text-foreground mb-1">{data?.batter?.name || 'Batter'}</p>
            <Badge variant="secondary" className="text-xs">
              {data?.batter?.hand || 'R'}HB
            </Badge>
          </div>
        </div>

        {/* Current Situation */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              {data?.half || 'Top'} {data?.inning || 1}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{data?.away_team || 'AWAY'}</span>
            <span className="font-bold text-xl text-foreground">
              {data?.score?.away ?? 0} - {data?.score?.home ?? 0}
            </span>
            <span className="text-muted-foreground">{data?.home_team || 'HOME'}</span>
          </div>
        </div>

        {/* Batting Team Indicator */}
        {data?.batting_team && (
          <div className="text-center">
            <Badge variant="outline" className="text-xs">
              {data.batting_team === 'HOME' ? data.home_team : data.away_team} Batting
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};
