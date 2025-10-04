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

  // TODO: Replace with your WebSocket backend URL
  // Example: 'ws://localhost:8080' or 'wss://your-backend.com/ws'
  const WEBSOCKET_URL = ''; // Leave empty to use dummy data
  
  // WebSocket connection to backend
  const { data, isConnected, error, lastUpdate } = useWebSocket<CommentaryData>(
    WEBSOCKET_URL
  );

  // Dummy data for development
  const dummyData: CommentaryData = {
    winProbability: {
      team1: { name: "Mumbai Indians", probability: 65 },
      team2: { name: "Chennai Super Kings", probability: 35 }
    },
    weather: {
      condition: "Sunny",
      temperature: 28,
      humidity: 45,
      windSpeed: 12
    },
    playerStats: {
      playerName: "Rohit Sharma",
      stats: [
        { label: "Runs", value: 45 },
        { label: "Balls", value: 32 },
        { label: "4s", value: 6 },
        { label: "6s", value: 2 }
      ]
    },
    scoreboard: [
      { player: "P2", score: 23, balls: 18 },
      { player: "P3", score: 45, balls: 32 },
      { player: "P4", score: 12, balls: 8 }
    ],
    pitchReport: {
      type: "Dry Pitch",
      conditions: "Good for batting",
      analysis: "The pitch is offering good bounce and carry. Spinners might get some turn in the later overs."
    },
    clips: [
      { id: "F1", title: "Boundary Shot", duration: "0:15" },
      { id: "F2", title: "Wicket Fall", duration: "0:12" },
      { id: "F3", title: "Six Over Long On", duration: "0:18" }
    ]
  };

  // Use WebSocket data if available, otherwise use dummy data
  const displayData = data || dummyData;

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <WinProbability data={displayData?.winProbability} />
            <WeatherForecast data={displayData?.weather} />
            <PitchReport data={displayData?.pitchReport} />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <PlayerStats data={displayData?.playerStats} />
              </div>
              <div className="lg:col-span-2">
                <Scoreboard data={displayData?.scoreboard} />
              </div>
            </div>
            <Clips data={displayData?.clips} />
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
      </main>
    </div>
  );
};

export default Index;
