import { useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { WinProbability } from '@/components/dashboard/WinProbability';
import { WeatherForecast } from '@/components/dashboard/WeatherForecast';
import { PlayerStats } from '@/components/dashboard/PlayerStats';
import { Scoreboard } from '@/components/dashboard/Scoreboard';
import { PitchReport } from '@/components/dashboard/PitchReport';
import { Clips } from '@/components/dashboard/Clips';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/hooks/use-toast';

interface CommentaryData {
  timestamp?: string;
  winProbability?: {
    team1: { name: string; probability: number };
    team2: { name: string; probability: number };
  };
  weather?: {
    condition: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
  };
  playerStats?: {
    playerName: string;
    stats: Array<{ label: string; value: string | number }>;
  };
  scoreboard?: Array<{ player: string; score: number; balls: number }>;
  pitchReport?: {
    type: string;
    conditions: string;
    analysis: string;
  };
  clips?: Array<{ id: string; title: string; duration: string }>;
}

const Index = () => {
  const { toast } = useToast();

  // WebSocket connection to backend
  const { data, isConnected, error, lastUpdate } = useWebSocket<CommentaryData>(
    'ws://localhost:8080'
  );

  // Show error toast when connection fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Connection Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        lastUpdate={lastUpdate} 
        isConnected={isConnected}
      />
      
      <main className="container mx-auto px-6 py-8">
        {!isConnected && !data ? (
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center max-w-md">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Connecting to Backend
              </h2>
              <p className="text-muted-foreground mb-4">
                Waiting for WebSocket connection at <code className="text-sm bg-secondary px-2 py-1 rounded">ws://localhost:8080</code>
              </p>
              <div className="bg-card border border-border rounded-lg p-4 text-left">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong className="text-foreground">Note:</strong> Make sure your backend server is running
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Backend should be listening on port 8080</li>
                  <li>WebSocket endpoint should be accessible</li>
                  <li>Sending JSON data every 7 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">
              <WinProbability data={data?.winProbability} />
              <WeatherForecast data={data?.weather} />
              <PitchReport data={data?.pitchReport} />
            </div>

            {/* Center Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <PlayerStats data={data?.playerStats} />
                </div>
                <div className="lg:col-span-2">
                  <Scoreboard data={data?.scoreboard} />
                </div>
              </div>
              <Clips data={data?.clips} />
            </div>

            {/* Right Column - You can add more components here */}
            <div className="lg:col-span-3 space-y-6">
              {/* Additional stats or information can go here */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Additional Info</h3>
                <p className="text-sm text-muted-foreground">
                  This space can be used for additional metrics or information from your JSON data.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
