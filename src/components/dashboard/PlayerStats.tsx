import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

interface PlayerStatsProps {
  data?: {
    playerName?: string;
    stats?: Array<{ label: string; value: string | number }>;
  };
}

export const PlayerStats = ({ data }: PlayerStatsProps) => {
  const defaultStats = [
    { label: 'Runs', value: '--' },
    { label: 'Balls', value: '--' },
    { label: 'Strike Rate', value: '--' },
    { label: 'Fours', value: '--' },
    { label: 'Sixes', value: '--' },
  ];

  const stats = data?.stats || defaultStats;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Player Stats</h3>
      </div>
      
      <div className="space-y-3">
        <p className="text-xl font-bold text-primary mb-4">{data?.playerName || 'Player 1'}</p>
        
        {stats.map((stat, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="text-lg font-semibold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
