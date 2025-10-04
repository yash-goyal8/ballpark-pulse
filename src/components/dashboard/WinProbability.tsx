import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface WinProbabilityProps {
  data?: {
    team1?: { name: string; probability: number };
    team2?: { name: string; probability: number };
  };
}

export const WinProbability = ({ data }: WinProbabilityProps) => {
  const team1Prob = data?.team1?.probability || 50;
  const team2Prob = data?.team2?.probability || 50;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Win Probability</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground font-medium">{data?.team1?.name || 'Team 1'}</span>
            <span className="text-primary font-bold">{team1Prob}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${team1Prob}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground font-medium">{data?.team2?.name || 'Team 2'}</span>
            <span className="text-primary font-bold">{team2Prob}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${team2Prob}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
