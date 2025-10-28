import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface RunExpectancyMatrixProps {
  data?: {
    currentRE?: number;
    situations?: { [key: string]: number };
  };
}

export const RunExpectancyMatrix = ({ data }: RunExpectancyMatrixProps) => {
  const currentRE = data?.currentRE || 0.85;
  
  // Run Expectancy Matrix (simplified) - bases: ---, 1--, -2-, --3, 12-, 1-3, -23, 123
  const reMatrix = data?.situations || {
    '0 Out, ---': 0.48,
    '0 Out, 1--': 0.85,
    '0 Out, -2-': 1.10,
    '0 Out, --3': 1.35,
    '0 Out, 12-': 1.45,
    '0 Out, 1-3': 1.78,
    '0 Out, -23': 1.96,
    '0 Out, 123': 2.25,
    '1 Out, ---': 0.26,
    '1 Out, 1--': 0.51,
    '1 Out, -2-': 0.66,
    '1 Out, --3': 0.95,
    '1 Out, 12-': 0.88,
    '1 Out, 1-3': 1.16,
    '1 Out, -23': 1.38,
    '1 Out, 123': 1.57,
    '2 Out, ---': 0.10,
    '2 Out, 1--': 0.22,
    '2 Out, -2-': 0.32,
    '2 Out, --3': 0.36,
    '2 Out, 12-': 0.42,
    '2 Out, 1-3': 0.54,
    '2 Out, -23': 0.58,
    '2 Out, 123': 0.76,
  };

  const getREColor = (value: number) => {
    if (value > 1.5) return 'bg-gradient-to-br from-green-500/80 to-green-600/80 text-white';
    if (value > 1.0) return 'bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white';
    if (value > 0.5) return 'bg-gradient-to-br from-yellow-500/80 to-yellow-600/80 text-white';
    return 'bg-gradient-to-br from-secondary to-secondary/80 text-foreground';
  };

  const situations = Object.entries(reMatrix);
  const outGroups = [
    situations.slice(0, 8),
    situations.slice(8, 16),
    situations.slice(16, 24),
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/90 border-border shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Run Expectancy Matrix</h3>
          <p className="text-xs text-muted-foreground">Expected runs by situation</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{currentRE.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Current RE</div>
        </div>
      </div>

      <div className="space-y-6">
        {outGroups.map((group, outIndex) => (
          <div key={outIndex}>
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-bold">
                {outIndex} OUT{outIndex !== 1 ? 'S' : ''}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {group.map(([situation, value]) => {
                const baseCode = situation.split(', ')[1];
                return (
                  <div
                    key={situation}
                    className={`p-3 rounded-lg border transition-all hover:scale-105 hover:shadow-lg ${getREColor(value)}`}
                  >
                    <div className="text-center">
                      <div className="text-xs font-semibold mb-1 opacity-80">
                        {baseCode}
                      </div>
                      <div className="text-lg font-bold">
                        {value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-semibold">Base Codes:</span>
            <div className="flex gap-3">
              <span className="text-muted-foreground">--- = Empty</span>
              <span className="text-muted-foreground">1-- = 1st</span>
              <span className="text-muted-foreground">-2- = 2nd</span>
              <span className="text-muted-foreground">--3 = 3rd</span>
              <span className="text-muted-foreground">123 = Loaded</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
