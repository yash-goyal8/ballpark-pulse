import { Card } from '@/components/ui/card';
import { User, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BatterStatsProps {
  batter?: {
    id?: number;
    name?: string;
    hand?: string;
    pos?: string;
    slot?: number;
  };
  past?: {
    h2h?: { hits: number; pa: number; note?: string };
    recent10?: { obp: number; slg: number };
  };
}

export const BatterStats = ({ batter, past }: BatterStatsProps) => {
  const avg = past?.h2h?.pa ? (past.h2h.hits / past.h2h.pa).toFixed(3) : '.000';

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">At Bat</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-bold text-primary">{batter?.name || 'Batter'}</p>
            <Badge variant="secondary" className="text-xs">
              {batter?.hand || 'R'}HB
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {batter?.pos || 'DH'} • Slot #{batter?.slot || 1}
          </p>
        </div>

        {/* Head to Head */}
        {past?.h2h && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs text-muted-foreground uppercase">vs This Pitcher</p>
              {past.h2h.note && (
                <Badge variant="outline" className="text-xs">{past.h2h.note}</Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded bg-secondary/50">
                <p className="text-xs text-muted-foreground">AVG</p>
                <p className="text-lg font-bold text-foreground">{avg}</p>
              </div>
              <div className="text-center p-2 rounded bg-secondary/50">
                <p className="text-xs text-muted-foreground">H</p>
                <p className="text-lg font-bold text-foreground">{past.h2h.hits}</p>
              </div>
              <div className="text-center p-2 rounded bg-secondary/50">
                <p className="text-xs text-muted-foreground">PA</p>
                <p className="text-lg font-bold text-foreground">{past.h2h.pa}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Form */}
        {past?.recent10 && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground uppercase">Last 10 Games</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded bg-secondary/50">
                <p className="text-xs text-muted-foreground">OBP</p>
                <p className="text-lg font-bold text-foreground">{past.recent10.obp.toFixed(3)}</p>
              </div>
              <div className="text-center p-2 rounded bg-secondary/50">
                <p className="text-xs text-muted-foreground">SLG</p>
                <p className="text-lg font-bold text-foreground">{past.recent10.slg.toFixed(3)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
