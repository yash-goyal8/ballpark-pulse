import { Circle } from 'lucide-react';

interface StickyGameHeaderProps {
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

export const StickyGameHeader = ({ data }: StickyGameHeaderProps) => {
  const renderBases = (bases: string = '---') => {
    const occupied = {
      first: bases.includes('1'),
      second: bases.includes('2'),
      third: bases.includes('3')
    };

    return (
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rotate-45">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 border ${
            occupied.second ? 'bg-primary border-primary' : 'bg-muted border-border'
          } rounded-sm transition-colors`} />
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 border ${
            occupied.third ? 'bg-primary border-primary' : 'bg-muted border-border'
          } rounded-sm transition-colors`} />
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 border ${
            occupied.first ? 'bg-primary border-primary' : 'bg-muted border-border'
          } rounded-sm transition-colors`} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted border border-border rounded-sm" />
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
            className={`w-2.5 h-2.5 transition-colors ${
              i < outs ? 'fill-destructive text-destructive' : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Score */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{data?.away_team || 'AWAY'}</span>
              <span className="text-2xl font-bold text-foreground">{data?.score?.away ?? 0}</span>
            </div>
            <span className="text-xl text-muted-foreground">@</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{data?.score?.home ?? 0}</span>
              <span className="text-xs font-medium text-muted-foreground">{data?.home_team || 'HOME'}</span>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold text-primary uppercase">Live</span>
          </div>

          {/* Game State */}
          <div className="flex items-center gap-4">
            {/* Inning */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Inning</p>
              <p className="text-lg font-bold text-primary">
                {data?.half === 'Top' ? '▲' : '▼'} {data?.inning || 1}
              </p>
            </div>

            {/* Bases */}
            <div className="flex flex-col items-center">
              <p className="text-xs text-muted-foreground mb-1">Bases</p>
              {renderBases(data?.bases)}
            </div>

            {/* Count */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Count</p>
              <p className="text-lg font-bold font-mono text-foreground">{data?.count || '0-0'}</p>
            </div>

            {/* Outs */}
            <div className="flex flex-col items-center">
              <p className="text-xs text-muted-foreground mb-1">Outs</p>
              {renderOuts(data?.outs)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
