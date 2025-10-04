import { Card } from '@/components/ui/card';
import { Circle } from 'lucide-react';

interface GameContextProps {
  data?: {
    inning?: number;
    half?: string;
    outs?: number;
    bases?: string;
    count?: string;
    score?: { home: number; away: number };
    home_team?: string;
    away_team?: string;
  };
}

export const GameContext = ({ data }: GameContextProps) => {
  const renderBases = (bases: string = '---') => {
    const occupied = {
      first: bases.includes('1'),
      second: bases.includes('2'),
      third: bases.includes('3')
    };

    return (
      <div className="relative w-20 h-20">
        {/* Diamond shape */}
        <div className="absolute inset-0 rotate-45">
          {/* Second base */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 border-2 ${
            occupied.second ? 'bg-primary border-primary' : 'bg-muted border-border'
          } rounded-sm`} />
          
          {/* Third base */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 border-2 ${
            occupied.third ? 'bg-primary border-primary' : 'bg-muted border-border'
          } rounded-sm`} />
          
          {/* First base */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-2 ${
            occupied.first ? 'bg-primary border-primary' : 'bg-muted border-border'
          } rounded-sm`} />
          
          {/* Home plate */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground/20 border-2 border-border rounded-sm" />
        </div>
      </div>
    );
  };

  const renderOuts = (outs: number = 0) => {
    return (
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <Circle 
            key={i} 
            className={`w-3 h-3 ${i < outs ? 'fill-destructive text-destructive' : 'fill-muted text-muted'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="p-4 lg:p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Score */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{data?.away_team || 'AWAY'}</p>
            <p className="text-3xl font-bold text-foreground">{data?.score?.away ?? 0}</p>
          </div>
          <div className="text-2xl font-bold text-muted-foreground">@</div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{data?.home_team || 'HOME'}</p>
            <p className="text-3xl font-bold text-foreground">{data?.score?.home ?? 0}</p>
          </div>
        </div>

        {/* Inning & Situation */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Inning</p>
            <p className="text-xl font-bold text-primary">
              {data?.half === 'Top' ? '▲' : '▼'} {data?.inning || 1}
            </p>
          </div>

          {/* Bases */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Bases</p>
            {renderBases(data?.bases)}
          </div>

          {/* Count & Outs */}
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Count</p>
              <p className="text-lg font-bold text-foreground font-mono">{data?.count || '0-0'}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-muted-foreground">Outs</p>
              {renderOuts(data?.outs)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
