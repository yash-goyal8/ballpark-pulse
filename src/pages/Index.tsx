import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DataDisplay } from '@/components/dashboard/DataDisplay';
import { useDataPolling } from '@/hooks/useDataPolling';
import { BarChart3, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data fetch function - replace this with your actual data source
const fetchCommentaryData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data - replace with actual API endpoint
  return {
    timestamp: new Date().toISOString(),
    game: {
      home: "Yankees",
      away: "Red Sox",
      inning: 7,
      score: { home: 4, away: 3 }
    },
    commentary: {
      latest: "Strike three! Another great pitch by the closer.",
      sentiment: "positive",
      keywords: ["strike", "closer", "pitch"]
    },
    stats: {
      totalComments: 1247,
      engagementRate: 87.3,
      averageSentiment: 0.72
    }
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
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard title="Total Comments" icon={MessageSquare}>
                <div className="text-3xl font-bold text-foreground">
                  {data?.stats?.totalComments || 0}
                </div>
              </MetricCard>
              
              <MetricCard title="Engagement Rate" icon={TrendingUp}>
                <div className="text-3xl font-bold text-foreground">
                  {data?.stats?.engagementRate || 0}%
                </div>
              </MetricCard>
              
              <MetricCard title="Sentiment Score" icon={BarChart3}>
                <div className="text-3xl font-bold text-foreground">
                  {data?.stats?.averageSentiment || 0}
                </div>
              </MetricCard>
              
              <MetricCard title="Active Users" icon={Users}>
                <div className="text-3xl font-bold text-foreground">
                  {Math.floor(Math.random() * 1000) + 500}
                </div>
              </MetricCard>
            </div>

            {/* Main Data Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricCard title="Latest Commentary" icon={MessageSquare}>
                <p className="text-foreground text-base">
                  {data?.commentary?.latest || "Waiting for commentary..."}
                </p>
                <div className="flex gap-2 mt-3">
                  {data?.commentary?.keywords?.map((keyword: string, idx: number) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </MetricCard>

              <MetricCard title="Game Status" icon={BarChart3}>
                {data?.game ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-base">
                      <span className="text-foreground font-medium">{data.game.away}</span>
                      <span className="text-foreground font-bold">{data.game.score.away}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-foreground font-medium">{data.game.home}</span>
                      <span className="text-foreground font-bold">{data.game.score.home}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Inning: {data.game.inning}</p>
                  </div>
                ) : (
                  <p>No game data available</p>
                )}
              </MetricCard>
            </div>

            {/* Raw Data Display */}
            <MetricCard title="Raw Data Feed" icon={BarChart3}>
              <DataDisplay data={data} />
            </MetricCard>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
