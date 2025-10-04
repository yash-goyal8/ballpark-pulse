import { Activity } from 'lucide-react';

interface DashboardHeaderProps {
  lastUpdate: Date | null;
  isLive: boolean;
}

export const DashboardHeader = ({ lastUpdate, isLive }: DashboardHeaderProps) => {
  const formatTime = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString();
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Baseball Commentary Analysis</h1>
              <p className="text-sm text-muted-foreground">Real-time game insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
            <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-primary animate-pulse-glow' : 'bg-muted-foreground'}`} />
            <span className="text-sm font-medium text-foreground">
              {isLive ? 'Live' : 'Offline'}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              Updated: {formatTime(lastUpdate)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
