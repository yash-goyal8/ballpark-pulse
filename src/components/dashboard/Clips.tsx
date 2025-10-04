import { Card } from '@/components/ui/card';
import { Video, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClipsProps {
  data?: Array<{
    id: string;
    title: string;
    thumbnail?: string;
    duration?: string;
  }>;
}

export const Clips = ({ data }: ClipsProps) => {
  const defaultClips = [
    { id: 'F1', title: 'Clip 1', duration: '0:00' },
    { id: 'F2', title: 'Clip 2', duration: '0:00' },
    { id: 'F3', title: 'Clip 3', duration: '0:00' },
  ];

  const clips = data || defaultClips;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Video className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Clips</h3>
      </div>
      
      <div className="space-y-3">
        {clips.map((clip) => (
          <div 
            key={clip.id} 
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Play className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{clip.title}</p>
              <p className="text-xs text-muted-foreground">{clip.id} • {clip.duration}</p>
            </div>
            <Button size="sm" variant="ghost" className="flex-shrink-0">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
