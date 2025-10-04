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
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Connecting to backend...</p>
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
