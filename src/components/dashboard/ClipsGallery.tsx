import { Card } from '@/components/ui/card';
import { Film, ExternalLink, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Clip {
  player_id: number;
  title: string;
  url: string;
  start_s: number;
  end_s: number;
  source: string;
  ts: string;
}

interface ClipsGalleryProps {
  data?: Clip[];
}

export const ClipsGallery = ({ data }: ClipsGalleryProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Film className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Video Highlights</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-8">
          No video clips available at the moment
        </p>
      </Card>
    );
  }

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Film className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Video Highlights</h3>
        <Badge variant="secondary" className="ml-auto">{data.length} clips</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((clip, idx) => {
          const videoId = getVideoId(clip.url);
          const thumbnailUrl = videoId 
            ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
            : '/placeholder.svg';

          return (
            <a
              key={idx}
              href={`${clip.url}${clip.start_s ? `&t=${clip.start_s}s` : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-lg overflow-hidden border border-border bg-secondary/30 hover:border-primary/50 transition-all hover:scale-[1.02]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <img 
                  src={thumbnailUrl}
                  alt={clip.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 rounded-full bg-primary">
                    <Play className="h-6 w-6 text-primary-foreground fill-current" />
                  </div>
                </div>

                {/* Duration badge */}
                {clip.end_s && clip.start_s && (
                  <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
                    {(clip.end_s - clip.start_s)}s
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {clip.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{clip.source}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </Card>
  );
};
