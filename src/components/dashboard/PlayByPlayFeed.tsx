import { Card } from '@/components/ui/card';
import { Radio, TrendingUp, TrendingDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlayByPlayEvent {
  timestamp: string;
  type: 'pitch' | 'hit' | 'out' | 'walk' | 'strikeout' | 'commentary';
  text: string;
  wpChange?: number;
}

interface PlayByPlayFeedProps {
  text?: string;
}

export const PlayByPlayFeed = ({ text }: PlayByPlayFeedProps) => {
  // Simulated play-by-play events (in real app, this would come from WebSocket)
  const events: PlayByPlayEvent[] = [
    {
      timestamp: '18:45:32',
      type: 'commentary',
      text: text || "Judge (2-2 count, runners on corners) faces Houck's splitter—chases it 42% in 2-strike situations.",
      wpChange: 0
    },
    {
      timestamp: '18:44:15',
      type: 'pitch',
      text: 'Fastball high and outside, ball 2',
      wpChange: 1.2
    },
    {
      timestamp: '18:43:58',
      type: 'pitch',
      text: 'Slider caught looking, strike 2',
      wpChange: -2.8
    },
    {
      timestamp: '18:43:42',
      type: 'pitch',
      text: 'Changeup low, ball 1',
      wpChange: 0.8
    },
    {
      timestamp: '18:43:25',
      type: 'pitch',
      text: 'Fastball swinging strike, strike 1',
      wpChange: -1.5
    },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'commentary':
        return <Radio className="h-4 w-4 text-primary" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-primary" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'strikeout':
      case 'out':
        return 'border-destructive/30 bg-destructive/5';
      case 'hit':
      case 'walk':
        return 'border-primary/30 bg-primary/5';
      default:
        return 'border-border bg-secondary/30';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Radio className="h-5 w-5 text-primary animate-pulse-glow" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Live Play-by-Play</h3>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {events.map((event, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${getEventColor(event.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {event.timestamp}
                    </span>
                    {event.wpChange !== undefined && event.wpChange !== 0 && (
                      <div className={`flex items-center gap-1 text-xs font-semibold ${
                        event.wpChange > 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {event.wpChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(event.wpChange).toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {event.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
