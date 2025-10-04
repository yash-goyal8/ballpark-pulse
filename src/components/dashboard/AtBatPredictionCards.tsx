import { Card } from '@/components/ui/card';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AtBatPredictionCardsProps {
  data?: {
    pa?: {
      strikeout?: number;
      walk_hbp?: number;
      ball_in_play?: number;
    };
    p_hit_given_bip?: number;
    re_delta_if_reach?: number;
    re_delta_if_out?: number;
  };
}

export const AtBatPredictionCards = ({ data }: AtBatPredictionCardsProps) => {
  const outcomes = [
    {
      label: 'Strikeout',
      value: (data?.pa?.strikeout || 0) * 100,
      icon: '🔥',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30'
    },
    {
      label: 'Walk/HBP',
      value: (data?.pa?.walk_hbp || 0) * 100,
      icon: '🚶',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      label: 'Ball in Play',
      value: (data?.pa?.ball_in_play || 0) * 100,
      icon: '⚾',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
  ];

  const hitProbability = (data?.p_hit_given_bip || 0) * 100;
  const totalConfidence = outcomes.reduce((sum, o) => sum + o.value, 0);

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">At-Bat Predictions</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {totalConfidence.toFixed(0)}% Total
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {outcomes.map((outcome) => (
            <div
              key={outcome.label}
              className={`p-4 rounded-lg border ${outcome.borderColor} ${outcome.bgColor} transition-all hover:scale-105 cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{outcome.icon}</span>
                <span className={`text-2xl font-bold ${outcome.color}`}>
                  {outcome.value.toFixed(0)}%
                </span>
              </div>
              <p className="text-sm font-medium text-foreground mb-2">{outcome.label}</p>
              <Progress 
                value={outcome.value} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {outcome.value > 50 ? 'High' : outcome.value > 30 ? 'Moderate' : 'Low'} probability
              </p>
            </div>
          ))}
        </div>

        {/* Hit Given Ball in Play */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Hit Probability (if ball in play)</span>
            <span className="text-xl font-bold text-primary">{hitProbability.toFixed(1)}%</span>
          </div>
          <Progress value={hitProbability} className="h-3 mb-3" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Weak Contact</span>
            <span>Hard Contact</span>
          </div>
        </div>
      </Card>

      {/* Run Expectancy Impact */}
      <Card className="p-4 bg-gradient-to-br from-card to-card/80 border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Run Expectancy Impact</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">If Reach</p>
              <p className="text-lg font-bold text-primary">+{(data?.re_delta_if_reach || 0).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-xs text-muted-foreground">If Out</p>
              <p className="text-lg font-bold text-destructive">{(data?.re_delta_if_out || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
