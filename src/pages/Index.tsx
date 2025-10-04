import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StickyGameHeader } from '@/components/dashboard/StickyGameHeader';
import { WinProbabilityChart } from '@/components/dashboard/WinProbabilityChart';
import { PlayByPlayFeed } from '@/components/dashboard/PlayByPlayFeed';
import { AtBatPredictionCards } from '@/components/dashboard/AtBatPredictionCards';
import { PitchSuggestionEnhanced } from '@/components/dashboard/PitchSuggestionEnhanced';
import { PlayerInsightsEnhanced } from '@/components/dashboard/PlayerInsightsEnhanced';
import { EnvironmentalConditions } from '@/components/dashboard/EnvironmentalConditions';
import { ClipsGallery } from '@/components/dashboard/ClipsGallery';
import { ViewModeToggle } from '@/components/dashboard/ViewModeToggle';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/hooks/use-toast';

interface BaseballData {
  type?: string;
  version?: string;
  meta?: {
    timestamp?: string;
    game_id?: string;
    seq_no?: number;
  };
  ctx?: {
    inning?: number;
    half?: string;
    outs?: number;
    bases?: string;
    count?: string;
    score?: { home: number; away: number };
    batting_team?: string;
    home_team?: string;
    away_team?: string;
    batter?: { id: number; name: string; hand: string; pos: string; slot: number };
    pitcher?: { id: number; name: string; hand: string };
  };
  conds?: {
    weather?: {
      temp_f?: number;
      humidity_pct?: number;
      wind_mph?: number;
      wind_dir?: string;
      precip_prob?: number;
      roof?: string;
    };
    pitch?: {
      ball_grip?: string;
      mound?: string;
      visibility?: string;
      wind_effect?: string;
    };
  };
  preds?: {
    pa?: {
      strikeout?: number;
      walk_hbp?: number;
      ball_in_play?: number;
    };
    p_hit_given_bip?: number;
    re_delta_if_reach?: number;
    re_delta_if_out?: number;
    wp_now?: number;
  };
  ins?: {
    batter_strengths?: string[];
    batter_weaknesses?: string[];
    pitcher_strengths?: string[];
    pitcher_weaknesses?: string[];
  };
  suggest?: {
    pitch?: string;
    location?: string;
    confidence?: number;
    why?: string;
  };
  past?: {
    h2h?: { hits: number; pa: number; note?: string };
    recent10?: { obp: number; slg: number };
  };
  clips?: Array<{
    player_id: number;
    title: string;
    url: string;
    start_s: number;
    end_s: number;
    source: string;
    ts: string;
  }>;
  text?: string;
}

const Index = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'game' | 'analyst' | 'fan'>('game');

  // TODO: Replace with your WebSocket backend URL
  // Example: 'ws://localhost:8080' or 'wss://your-backend.com/ws'
  const WEBSOCKET_URL = ''; // Leave empty to use dummy data
  
  // WebSocket connection to backend
  const { data, isConnected, error, lastUpdate } = useWebSocket<BaseballData>(
    WEBSOCKET_URL
  );

  // Dummy data for development
  const dummyData: BaseballData = {
    type: "AgentInsight",
    version: "1.1",
    meta: {
      timestamp: "2025-10-01T18:45:00Z",
      game_id: "NYY@BOS-20251001",
      seq_no: 142
    },
    ctx: {
      inning: 7,
      half: "Top",
      outs: 1,
      bases: "1B-3B",
      count: "2-2",
      score: { home: 4, away: 5 },
      batting_team: "AWAY",
      home_team: "BOS",
      away_team: "NYY",
      batter: { id: 592450, name: "Aaron Judge", hand: "R", pos: "RF", slot: 2 },
      pitcher: { id: 605483, name: "Tanner Houck", hand: "R" }
    },
    conds: {
      weather: {
        temp_f: 68,
        humidity_pct: 55,
        wind_mph: 8,
        wind_dir: "LF→RF",
        precip_prob: 0.1,
        roof: "open"
      },
      pitch: {
        ball_grip: "normal",
        mound: "good",
        visibility: "twilight",
        wind_effect: "cross"
      }
    },
    preds: {
      pa: {
        strikeout: 0.28,
        walk_hbp: 0.12,
        ball_in_play: 0.60
      },
      p_hit_given_bip: 0.32,
      re_delta_if_reach: 0.85,
      re_delta_if_out: -0.45,
      wp_now: 0.54
    },
    ins: {
      batter_strengths: ["Pull power vs RHP", "Excellent eye on pitches up"],
      batter_weaknesses: ["Sweepers low-away", "Two-strike sliders"],
      pitcher_strengths: ["Sinker induces weak contact", "Two-strike splitter whiffs ~38%"],
      pitcher_weaknesses: ["Hangs sliders when tired", "Struggles vs power lefties"]
    },
    suggest: {
      pitch: "splitter",
      location: "down-away",
      confidence: 0.72,
      why: "Judge chases splitters down-away 42% of the time in 2-strike counts"
    },
    past: {
      h2h: { hits: 3, pa: 12, note: "small sample" },
      recent10: { obp: 0.385, slg: 0.624 }
    },
    clips: [
      { 
        player_id: 592450, 
        title: "Judge HR vs Houck Slider",
        url: "https://youtube.com/watch?v=example1",
        start_s: 15,
        end_s: 30,
        source: "youtube",
        ts: "2025-09-15T19:22:00Z"
      },
      { 
        player_id: 592450, 
        title: "Judge Strikeout on Splitter",
        url: "https://youtube.com/watch?v=example2",
        start_s: 8,
        end_s: 20,
        source: "youtube",
        ts: "2025-09-20T20:15:00Z"
      },
      { 
        player_id: 605483, 
        title: "Houck Sinker Analysis",
        url: "https://youtube.com/watch?v=example3",
        start_s: 5,
        end_s: 25,
        source: "youtube",
        ts: "2025-09-28T18:45:00Z"
      }
    ],
    text: "Judge (2-2 count, runners on corners) faces Houck's splitter—chases it 42% in 2-strike situations."
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
      {/* Main Header */}
      <DashboardHeader 
        lastUpdate={lastUpdate} 
        isConnected={isConnected}
        gameId={displayData?.meta?.game_id}
      />

      {/* Sticky Game State Header */}
      <StickyGameHeader data={displayData?.ctx} />
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/* View Mode Toggle */}
        <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />

        {/* Game Mode - Live Commentary Focus */}
        {viewMode === 'game' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Win Probability & Play-by-Play */}
            <div className="lg:col-span-4 space-y-6">
              <WinProbabilityChart 
                data={{
                  team1: { 
                    name: displayData?.ctx?.away_team || "Away", 
                    probability: (displayData?.preds?.wp_now || 0.5) * 100 
                  },
                  team2: { 
                    name: displayData?.ctx?.home_team || "Home", 
                    probability: (1 - (displayData?.preds?.wp_now || 0.5)) * 100 
                  }
                }} 
              />
              <PlayByPlayFeed text={displayData?.text} />
            </div>

            {/* Center Column - Predictions & Suggestions */}
            <div className="lg:col-span-5 space-y-6">
              <AtBatPredictionCards data={displayData?.preds} />
              <PitchSuggestionEnhanced data={displayData?.suggest} />
            </div>

            {/* Right Column - Conditions & Clips */}
            <div className="lg:col-span-3 space-y-6">
              <EnvironmentalConditions 
                weather={displayData?.conds?.weather}
                pitch={displayData?.conds?.pitch}
              />
              <ClipsGallery data={displayData?.clips} />
            </div>
          </div>
        )}

        {/* Analyst Mode - Stats Heavy */}
        {viewMode === 'analyst' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-6">
              <WinProbabilityChart 
                data={{
                  team1: { 
                    name: displayData?.ctx?.away_team || "Away", 
                    probability: (displayData?.preds?.wp_now || 0.5) * 100 
                  },
                  team2: { 
                    name: displayData?.ctx?.home_team || "Home", 
                    probability: (1 - (displayData?.preds?.wp_now || 0.5)) * 100 
                  }
                }} 
              />
              <AtBatPredictionCards data={displayData?.preds} />
            </div>

            {/* Center Column */}
            <div className="lg:col-span-5 space-y-6">
              <PlayerInsightsEnhanced 
                data={displayData?.ins}
                past={displayData?.past}
                batter={displayData?.ctx?.batter}
                pitcher={displayData?.ctx?.pitcher}
              />
              <PitchSuggestionEnhanced data={displayData?.suggest} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 space-y-6">
              <EnvironmentalConditions 
                weather={displayData?.conds?.weather}
                pitch={displayData?.conds?.pitch}
              />
              <PlayByPlayFeed text={displayData?.text} />
            </div>
          </div>
        )}

        {/* Fan Mode - Fun Graphics & Momentum */}
        {viewMode === 'fan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Full Width Momentum */}
            <div className="lg:col-span-12">
              <WinProbabilityChart 
                data={{
                  team1: { 
                    name: displayData?.ctx?.away_team || "Away", 
                    probability: (displayData?.preds?.wp_now || 0.5) * 100 
                  },
                  team2: { 
                    name: displayData?.ctx?.home_team || "Home", 
                    probability: (1 - (displayData?.preds?.wp_now || 0.5)) * 100 
                  }
                }} 
              />
            </div>

            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <AtBatPredictionCards data={displayData?.preds} />
              <ClipsGallery data={displayData?.clips} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-6">
              <PitchSuggestionEnhanced data={displayData?.suggest} />
              <PlayByPlayFeed text={displayData?.text} />
            </div>
          </div>
        )}

        {/* Data Info Footer */}
        {displayData?.meta && (
          <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Sequence: #{displayData.meta.seq_no}</span>
              <span>Version: {displayData.version}</span>
              <span>Game ID: {displayData.meta.game_id}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
