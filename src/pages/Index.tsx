import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { WinProbability } from '@/components/dashboard/WinProbability';
import { WeatherForecast } from '@/components/dashboard/WeatherForecast';
import { PlayerStats } from '@/components/dashboard/PlayerStats';
import { Scoreboard } from '@/components/dashboard/Scoreboard';
import { PitchReport } from '@/components/dashboard/PitchReport';
import { Clips } from '@/components/dashboard/Clips';
import { useDataPolling } from '@/hooks/useDataPolling';
import { useToast } from '@/hooks/use-toast';

// Mock data fetch function - replace this with your actual backend API endpoint
const fetchCommentaryData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data structure - replace with your actual JSON format from backend
  return {
    timestamp: new Date().toISOString(),
    winProbability: {
      team1: { name: "Yankees", probability: 65 },
      team2: { name: "Red Sox", probability: 35 }
    },
    weather: {
      condition: "Sunny",
      temperature: 28,
      humidity: 45,
      windSpeed: 12
    },
    playerStats: {
      playerName: "Player 1",
      stats: [
        { label: "Runs", value: 45 },
        { label: "Balls", value: 32 },
        { label: "Strike Rate", value: "140.62" },
        { label: "Fours", value: 6 },
        { label: "Sixes", value: 2 }
      ]
    },
    scoreboard: [
      { player: "P2", score: 23, balls: 18 },
      { player: "P3", score: 45, balls: 32 },
      { player: "P4", score: 12, balls: 15 },
      { player: "P5", score: 8, balls: 6 }
    ],
    pitchReport: {
      type: "Hard & Bouncy",
      conditions: "Dry surface, good for batting",
      analysis: "The pitch is expected to favor batsmen in the first innings with good bounce and carry. Spinners might come into play in the later stages."
    },
    clips: [
      { id: "F1", title: "Amazing Six", duration: "0:15" },
      { id: "F2", title: "Wicket Fall", duration: "0:22" },
      { id: "F3", title: "Boundary Shot", duration: "0:18" }
    ]
  };
};

const Index = () => {
  const { toast } = useToast();
  const [pollingEnabled] = useState(true);

  const { data, loading, error, lastUpdate } = useDataPolling(
    fetchCommentaryData,
    { interval: 7000, enabled: pollingEnabled }
  );

  // Show error toast
  if (error) {
    toast({
      title: "Data Fetch Error",
      description: error.message,
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        lastUpdate={lastUpdate} 
        isLive={pollingEnabled && !loading && !error} 
      />
      
      <main className="container mx-auto px-6 py-8">
        {loading && !data ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading dashboard data...</p>
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
