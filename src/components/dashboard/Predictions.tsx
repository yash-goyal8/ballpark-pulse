import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PredictionsProps {
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

export const Predictions = ({ data }: PredictionsProps) => {
  const formatPercent = (val: number = 0) => (val * 100).toFixed(0) + '%';
  const formatRE = (val: number = 0) => (val >= 0 ? '+' : '') + val.toFixed(2);

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Predictions</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-3">Plate Appearance</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Strikeout</span>
                <span className="text-primary font-semibold">{formatPercent(data?.pa?.strikeout)}</span>
              </div>
              <Progress value={(data?.pa?.strikeout || 0) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Walk/HBP</span>
                <span className="text-primary font-semibold">{formatPercent(data?.pa?.walk_hbp)}</span>
              </div>
              <Progress value={(data?.pa?.walk_hbp || 0) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Ball in Play</span>
                <span className="text-primary font-semibold">{formatPercent(data?.pa?.ball_in_play)}</span>
              </div>
              <Progress value={(data?.pa?.ball_in_play || 0) * 100} className="h-2" />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase mb-3">Run Expectancy</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-xs text-muted-foreground mb-1">If Reach</p>
              <p className="text-lg font-bold text-primary">{formatRE(data?.re_delta_if_reach)}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">If Out</p>
              <p className="text-lg font-bold text-foreground">{formatRE(data?.re_delta_if_out)}</p>
            </div>
          </div>
        </div>

        {data?.p_hit_given_bip !== undefined && (
          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Hit % (if BIP)</span>
              <span className="text-lg font-bold text-foreground">{formatPercent(data.p_hit_given_bip)}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
