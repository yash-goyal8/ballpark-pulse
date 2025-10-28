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
  
  // Gamification: Determine leader and advantage
  const leader = team1Prob > team2Prob ? 'team1' : 'team2';
  const advantagePercent = Math.abs(team1Prob - team2Prob);
  const advantageLevel = advantagePercent > 30 ? 'dominant' : advantagePercent > 15 ? 'strong' : advantagePercent > 5 ? 'slight' : 'even';
  
  const getAdvantageColor = () => {
    if (advantageLevel === 'dominant') return 'text-green-500';
    if (advantageLevel === 'strong') return 'text-blue-500';
    if (advantageLevel === 'slight') return 'text-yellow-500';
    return 'text-muted-foreground';
  };
  
  const getAdvantageText = () => {
    if (advantageLevel === 'dominant') return '🔥 DOMINANT';
    if (advantageLevel === 'strong') return '💪 STRONG LEAD';
    if (advantageLevel === 'slight') return '⚡ SLIGHT EDGE';
    return '⚖️ BALANCED';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-card/80 border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 animate-pulse">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Win Probability</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Live Momentum Tracker</p>
          </div>
        </div>
        
        {/* Gamification: Advantage Indicator */}
        <div className={`text-center ${getAdvantageColor()}`}>
          <div className="text-2xl font-bold">{advantagePercent.toFixed(1)}%</div>
          <div className="text-xs font-semibold">{getAdvantageText()}</div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Team 1 */}
        <div 
          className="space-y-2 relative transition-all duration-300"
          onMouseEnter={() => setHoveredBar('team1')}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                {data?.team1?.name || 'Team 1'}
              </span>
              {leader === 'team1' && advantageLevel !== 'even' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold animate-pulse">
                  LEADING
                </span>
              )}
            </div>
            <span className={`text-2xl font-bold transition-all ${hoveredBar === 'team1' ? 'scale-110' : ''} ${team1Prob > team2Prob ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]' : 'text-foreground'}`}>
              {team1Prob.toFixed(1)}%
            </span>
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
          className="space-y-2 relative transition-all duration-300"
          onMouseEnter={() => setHoveredBar('team2')}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                {data?.team2?.name || 'Team 2'}
              </span>
              {leader === 'team2' && advantageLevel !== 'even' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold animate-pulse">
                  LEADING
                </span>
              )}
            </div>
            <span className={`text-2xl font-bold transition-all ${hoveredBar === 'team2' ? 'scale-110' : ''} ${team2Prob > team1Prob ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]' : 'text-foreground'}`}>
              {team2Prob.toFixed(1)}%
            </span>
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
