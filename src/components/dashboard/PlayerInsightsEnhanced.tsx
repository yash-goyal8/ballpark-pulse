import { Card } from '@/components/ui/card';
import { User, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface PlayerInsightsEnhancedProps {
  data?: {
    batter_strengths?: string[];
    batter_weaknesses?: string[];
    pitcher_strengths?: string[];
    pitcher_weaknesses?: string[];
  };
  past?: {
    h2h?: { hits: number; pa: number; note?: string };
    recent10?: { obp: number; slg: number };
  };
  batter?: { name?: string; hand?: string };
  pitcher?: { name?: string; hand?: string };
}

export const PlayerInsightsEnhanced = ({ data, past, batter, pitcher }: PlayerInsightsEnhancedProps) => {
  const batterAvg = past?.h2h ? (past.h2h.hits / past.h2h.pa * 1000).toFixed(0) : '---';
  const ops = past?.recent10 ? ((past.recent10.obp + past.recent10.slg) * 1000).toFixed(0) : '---';

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Player Insights</h3>
      </div>

      <Tabs defaultValue="matchup" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="matchup">Matchup</TabsTrigger>
          <TabsTrigger value="batter">Batter</TabsTrigger>
          <TabsTrigger value="pitcher">Pitcher</TabsTrigger>
        </TabsList>

        {/* Matchup Stats */}
        <TabsContent value="matchup" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground uppercase mb-2">Head-to-Head</p>
              <p className="text-3xl font-bold text-primary mb-1">.{batterAvg}</p>
              <p className="text-xs text-muted-foreground">
                {past?.h2h?.hits || 0}-for-{past?.h2h?.pa || 0}
                {past?.h2h?.note && ` (${past.h2h.note})`}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground uppercase mb-2">Recent Form (L10)</p>
              <p className="text-3xl font-bold text-foreground mb-1">.{ops}</p>
              <p className="text-xs text-muted-foreground">OPS</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">On-Base %</span>
                <span className="text-lg font-bold text-primary">
                  .{((past?.recent10?.obp || 0) * 1000).toFixed(0)}
                </span>
              </div>
              <Progress value={(past?.recent10?.obp || 0) * 100} className="h-2" />
            </div>

            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Slugging %</span>
                <span className="text-lg font-bold text-primary">
                  .{((past?.recent10?.slg || 0) * 1000).toFixed(0)}
                </span>
              </div>
              <Progress value={(past?.recent10?.slg || 0) * 100} className="h-2" />
            </div>
          </div>
        </TabsContent>

        {/* Batter Tab */}
        <TabsContent value="batter" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{batter?.name || 'Batter'}</Badge>
            <Badge variant="secondary">{batter?.hand || 'R'}HB</Badge>
          </div>

          {data?.batter_strengths && data.batter_strengths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase font-semibold">Strengths</p>
              </div>
              <div className="space-y-2">
                {data.batter_strengths.map((strength, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                    <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.batter_weaknesses && data.batter_weaknesses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-xs text-muted-foreground uppercase font-semibold">Weaknesses</p>
              </div>
              <div className="space-y-2">
                {data.batter_weaknesses.map((weakness, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-sm text-foreground">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Pitcher Tab */}
        <TabsContent value="pitcher" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{pitcher?.name || 'Pitcher'}</Badge>
            <Badge variant="secondary">{pitcher?.hand || 'R'}HP</Badge>
          </div>

          {data?.pitcher_strengths && data.pitcher_strengths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase font-semibold">Strengths</p>
              </div>
              <div className="space-y-2">
                {data.pitcher_strengths.map((strength, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                    <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.pitcher_weaknesses && data.pitcher_weaknesses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-xs text-muted-foreground uppercase font-semibold">Weaknesses</p>
              </div>
              <div className="space-y-2">
                {data.pitcher_weaknesses.map((weakness, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-sm text-foreground">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
