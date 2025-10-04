import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface WinProbabilityChartProps {
  data?: {
    team1?: { name: string; probability: number };
    team2?: { name: string; probability: number };
  };
}

export const WinProbabilityChart = ({ data }: WinProbabilityChartProps) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  
  const team1Prob = data?.team1?.probability || 50;
  const team2Prob = data?.team2?.probability || 50;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Win Probability</h3>
      </div>
      
      <div className="space-y-6">
        {/* Team 1 */}
        <div 
          className="space-y-2 relative"
          onMouseEnter={() => setHoveredBar('team1')}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-foreground font-medium">{data?.team1?.name || 'Team 1'}</span>
            <span className="text-primary font-bold text-lg">{team1Prob.toFixed(1)}%</span>
          </div>
          <div className="relative w-full bg-secondary rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-full transition-all duration-700 ease-out rounded-full relative"
              style={{ width: `${team1Prob}%` }}
            >
              {hoveredBar === 'team1' && (
                <div className="absolute inset-0 bg-primary/20 animate-pulse-glow" />
              )}
            </div>
          </div>
          {hoveredBar === 'team1' && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-primary/30 px-3 py-1 rounded-lg shadow-lg animate-slide-up">
              <p className="text-xs text-foreground whitespace-nowrap">
                {team1Prob.toFixed(2)}% chance to win
              </p>
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div 
          className="space-y-2 relative"
          onMouseEnter={() => setHoveredBar('team2')}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-foreground font-medium">{data?.team2?.name || 'Team 2'}</span>
            <span className="text-primary font-bold text-lg">{team2Prob.toFixed(1)}%</span>
          </div>
          <div className="relative w-full bg-secondary rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-full transition-all duration-700 ease-out rounded-full relative"
              style={{ width: `${team2Prob}%` }}
            >
              {hoveredBar === 'team2' && (
                <div className="absolute inset-0 bg-primary/20 animate-pulse-glow" />
              )}
            </div>
          </div>
          {hoveredBar === 'team2' && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-primary/30 px-3 py-1 rounded-lg shadow-lg animate-slide-up">
              <p className="text-xs text-foreground whitespace-nowrap">
                {team2Prob.toFixed(2)}% chance to win
              </p>
            </div>
          )}
        </div>

        {/* Momentum Indicator */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Momentum</span>
            <span className={team1Prob > 50 ? 'text-primary' : 'text-destructive'}>
              {team1Prob > 50 ? `${data?.team1?.name || 'Team 1'} +${(team1Prob - 50).toFixed(1)}%` : `${data?.team2?.name || 'Team 2'} +${(team2Prob - 50).toFixed(1)}%`}
            </span>
          </div>
          <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-1/2 w-0.5 bg-border z-10"
            />
            <div 
              className={`h-full transition-all duration-700 ease-out ${
                team1Prob > 50 ? 'bg-primary' : 'bg-destructive'
              }`}
              style={{ 
                width: `${Math.abs(team1Prob - 50) * 2}%`,
                marginLeft: team1Prob > 50 ? '50%' : `${50 - Math.abs(team1Prob - 50) * 2}%`
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
