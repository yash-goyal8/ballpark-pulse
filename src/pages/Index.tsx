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
import { ConnectionGuide } from '@/components/dashboard/ConnectionGuide';
import { useDataPolling } from '@/hooks/useDataPolling';
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
  const [isUpdating, setIsUpdating] = useState(false);

  /* ==========================================
   * API POLLING SETUP
   * ==========================================
   * 
   * To connect your backend API:
   * 
   * 1. Set API_URL below to your backend endpoint
   *    Examples:
   *    - Local: 'http://localhost:8000/api/game-data'
   *    - Production: 'https://your-backend.com/api/game-data'
   * 
   * 2. Set POLLING_INTERVAL (milliseconds, default 7000 = 7 seconds)
   * 
   * 3. Your API should return JSON in this format:
   *    {
   *      "llm_response": { ...BaseballData structure... },
   *      "success": true,
   *      "error": null
   *    }
   * 
   * 4. Dashboard will automatically:
   *    - Poll API at regular intervals
   *    - Update all components smoothly
   *    - Show connection status
   *    - Fall back to dummy data when disconnected
   * 
   * See WEBSOCKET_SETUP.md for detailed instructions
   * ========================================== */
  
  const API_URL = ''; // Leave empty to use dummy data
  const POLLING_INTERVAL = 7000; // 7 seconds
  
  // API polling connection to backend
  const { data, isConnected, error, lastUpdate } = useDataPolling<BaseballData>(
    API_URL,
    { 
      interval: POLLING_INTERVAL,
      enabled: !!API_URL // Only poll if URL is provided
    }
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

  // Show visual feedback when new data arrives
  useEffect(() => {
    if (data && lastUpdate) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [data, lastUpdate]);

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

  // Show success toast when connection is established
  useEffect(() => {
    if (isConnected && API_URL) {
      toast({
        title: "Connected",
        description: "Live data stream active",
      });
    }
  }, [isConnected, toast, API_URL]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <DashboardHeader 
        lastUpdate={lastUpdate} 
        isConnected={isConnected}
        gameId={displayData?.meta?.game_id}
      />

      {/* Sticky Game State Header */}
      <div className={`transition-all duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
        <StickyGameHeader data={displayData?.ctx} />
      </div>
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/* View Mode Toggle */}
        <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />

        {/* Data Update Indicator */}
        {isUpdating && (
          <div className="fixed top-20 right-4 z-50 animate-slide-up">
            <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 backdrop-blur-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-semibold text-primary">Updating...</span>
            </div>
          </div>
        )}

        {/* Game Mode - Live Commentary Focus */}
        {viewMode === 'game' && (
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 ${isUpdating ? 'opacity-80' : 'opacity-100'}`}>
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
              {!isConnected && !API_URL && <ConnectionGuide />}
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
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 ${isUpdating ? 'opacity-80' : 'opacity-100'}`}>
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
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 ${isUpdating ? 'opacity-80' : 'opacity-100'}`}>
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
