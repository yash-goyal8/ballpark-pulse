import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface Pitch {
  type: string;
  result: 'ball' | 'strike' | 'foul' | 'in-play';
  velocity?: number;
}

interface PitchSequenceProps {
  data?: {
    pitches?: Pitch[];
    count?: string;
  };
}

export const PitchSequence = ({ data }: PitchSequenceProps) => {
  // Sample data
  const pitches: Pitch[] = data?.pitches || [
    { type: 'Fastball', result: 'strike', velocity: 96 },
    { type: 'Slider', result: 'ball', velocity: 85 },
    { type: 'Fastball', result: 'foul', velocity: 97 },
    { type: 'Changeup', result: 'strike', velocity: 88 },
    { type: 'Slider', result: 'foul', velocity: 86 },
  ];

  const getResultColor = (result: string) => {
    switch (result) {
      case 'strike': return 'bg-green-500 border-green-400';
      case 'ball': return 'bg-red-500 border-red-400';
      case 'foul': return 'bg-yellow-500 border-yellow-400';
      case 'in-play': return 'bg-blue-500 border-blue-400';
      default: return 'bg-secondary border-border';
    }
  };

  const getResultEmoji = (result: string) => {
    switch (result) {
      case 'strike': return '✓';
      case 'ball': return '✗';
      case 'foul': return '↪';
      case 'in-play': return '⚾';
      default: return '•';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/90 border-border shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Pitch Sequence</h3>
          <p className="text-xs text-muted-foreground">Current at-bat breakdown</p>
        </div>
        {data?.count && (
          <div className="px-3 py-1 rounded-lg bg-primary/20 border border-primary/30">
            <span className="text-sm font-bold text-primary">Count: {data.count}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Pitch Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-3">
            {pitches.map((pitch, index) => (
              <div key={index} className="relative flex items-center gap-4 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Pitch Number */}
                <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${getResultColor(pitch.result)} group-hover:scale-110`}>
                  <span className="text-white drop-shadow">{index + 1}</span>
                </div>

                {/* Pitch Details */}
                <div className="flex-1 p-3 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{pitch.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {getResultEmoji(pitch.result)} {pitch.result.toUpperCase()}
                        </span>
                      </div>
                      {pitch.velocity && (
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {pitch.velocity} mph
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-500">{pitches.filter(p => p.result === 'strike').length}</div>
              <div className="text-xs text-muted-foreground">Strikes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{pitches.filter(p => p.result === 'ball').length}</div>
              <div className="text-xs text-muted-foreground">Balls</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">{pitches.filter(p => p.result === 'foul').length}</div>
              <div className="text-xs text-muted-foreground">Fouls</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{pitches.length}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
