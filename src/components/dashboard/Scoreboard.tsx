import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface ScoreboardProps {
  data?: Array<{
    player: string;
    score: number;
    balls: number;
  }>;
}

export const Scoreboard = ({ data }: ScoreboardProps) => {
  const defaultData = [
    { player: 'P2', score: 0, balls: 0 },
    { player: 'P3', score: 0, balls: 0 },
    { player: 'P4', score: 0, balls: 0 },
    { player: 'P5', score: 0, balls: 0 },
  ];

  const scoreData = data || defaultData;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Scoreboard</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-sm font-semibold text-foreground">Player</th>
              <th className="text-center py-2 px-3 text-sm font-semibold text-foreground">Score</th>
              <th className="text-center py-2 px-3 text-sm font-semibold text-foreground">Balls</th>
            </tr>
          </thead>
          <tbody>
            {scoreData.map((item, idx) => (
              <tr key={idx} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-3 text-primary font-semibold">{item.player}</td>
                <td className="py-3 px-3 text-center text-foreground font-medium">{item.score}</td>
                <td className="py-3 px-3 text-center text-foreground font-medium">{item.balls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
