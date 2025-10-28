"""
Simple test API server for baseball dashboard
Run with: python test-api-server.py
Then set API_URL = 'http://localhost:8000/api/game-data' in Index.tsx
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime
import random

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Game state that changes over time
game_state = {
    "seq_no": 0,
    "inning": 1,
    "outs": 0,
    "count_balls": 0,
    "count_strikes": 0
}

@app.get("/api/game-data")
async def get_game_data():
    # Simulate game progression
    game_state["seq_no"] += 1
    
    # Randomly progress the game
    if random.random() > 0.7:
        game_state["count_strikes"] += 1
        if game_state["count_strikes"] >= 3:
            game_state["outs"] += 1
            game_state["count_balls"] = 0
            game_state["count_strikes"] = 0
    
    if random.random() > 0.8:
        game_state["count_balls"] += 1
        if game_state["count_balls"] >= 4:
            game_state["count_balls"] = 0
            game_state["count_strikes"] = 0
    
    if game_state["outs"] >= 3:
        game_state["inning"] += 1
        game_state["outs"] = 0
    
    game_data = {
        "type": "AgentInsight",
        "version": "1.1",
        "meta": {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "game_id": "NYY@NYM-20250517",
            "seq_no": game_state["seq_no"]
        },
        "ctx": {
            "inning": game_state["inning"],
            "half": "Top" if game_state["seq_no"] % 2 == 0 else "Bottom",
            "outs": game_state["outs"],
            "bases": random.choice(["---", "1B", "2B", "1B-3B", "123"]),
            "count": f"{game_state['count_balls']}-{game_state['count_strikes']}",
            "score": {
                "home": random.randint(0, 8),
                "away": random.randint(0, 8)
            },
            "batting_team": "AWAY" if game_state["seq_no"] % 2 == 0 else "HOME",
            "home_team": "NYM",
            "away_team": "NYY",
            "batter": {
                "id": 592450,
                "name": random.choice(["Aaron Judge", "Juan Soto", "Giancarlo Stanton"]),
                "hand": random.choice(["R", "L"]),
                "pos": "RF",
                "slot": random.randint(1, 9)
            },
            "pitcher": {
                "id": 605483,
                "name": random.choice(["Gerrit Cole", "Carlos Rodón", "Clarke Schmidt"]),
                "hand": "R"
            }
        },
        "conds": {
            "weather": {
                "temp_f": random.randint(65, 85),
                "humidity_pct": random.randint(40, 70),
                "wind_mph": random.randint(5, 15),
                "wind_dir": "LF→RF",
                "precip_prob": round(random.random() * 0.3, 2),
                "roof": "open"
            },
            "pitch": {
                "ball_grip": random.choice(["normal", "dry", "humid"]),
                "mound": random.choice(["good", "soft"]),
                "visibility": random.choice(["day", "twilight", "night"]),
                "wind_effect": random.choice(["neutral", "helping", "cross"])
            }
        },
        "preds": {
            "pa": {
                "strikeout": round(random.random() * 0.4, 2),
                "walk_hbp": round(random.random() * 0.2, 2),
                "ball_in_play": round(0.4 + random.random() * 0.3, 2)
            },
            "p_hit_given_bip": round(0.25 + random.random() * 0.2, 2),
            "re_delta_if_reach": round(0.3 + random.random() * 0.6, 2),
            "re_delta_if_out": round(-0.5 + random.random() * 0.3, 2),
            "wp_now": round(0.45 + random.random() * 0.1, 2)
        },
        "ins": {
            "batter_strengths": ["Pull power vs RHP", "Good eye on fastballs up"],
            "batter_weaknesses": ["Sweepers low-away", "Two-strike breaking balls"],
            "pitcher_strengths": ["Sinker induces weak contact", "Changeup effective vs LHB"],
            "pitcher_weaknesses": ["Struggles in high counts", "Hangs sliders when tired"]
        },
        "suggest": {
            "pitch": random.choice(["four-seam", "slider", "changeup", "sinker", "cutter"]),
            "location": random.choice(["up-away", "down-away", "mid-in", "down-middle"]),
            "confidence": round(0.6 + random.random() * 0.3, 2),
            "why": "Batter struggles with this pitch-location combo in similar counts"
        },
        "past": {
            "h2h": {
                "hits": random.randint(0, 5),
                "pa": random.randint(5, 20),
                "note": "small sample" if random.random() > 0.5 else ""
            },
            "recent10": {
                "obp": round(0.3 + random.random() * 0.15, 3),
                "slg": round(0.4 + random.random() * 0.3, 3)
            }
        },
        "clips": [
            {
                "player_id": 592450,
                "title": "Previous HR vs Pitcher",
                "url": "https://youtube.com/watch?v=example1",
                "start_s": 15,
                "end_s": 30,
                "source": "youtube",
                "ts": "2025-09-15T19:22:00Z"
            }
        ],
        "text": f"Count {game_state['count_balls']}-{game_state['count_strikes']}, {game_state['outs']} out{'s' if game_state['outs'] != 1 else ''} in inning {game_state['inning']}"
    }
    
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "llm_response": game_data,
        "success": True,
        "error": None,
        "processing_time_seconds": 0.001,
        "processed_count": 1,
        "failed_count": 0
    }

@app.get("/")
async def root():
    return {
        "message": "Baseball Dashboard API Test Server",
        "endpoints": {
            "/api/game-data": "GET - Returns live game data"
        }
    }

if __name__ == "__main__":
    print("=" * 60)
    print("🏟️  Baseball Dashboard Test API Server")
    print("=" * 60)
    print("Server running at: http://localhost:8000")
    print("API endpoint: http://localhost:8000/api/game-data")
    print("\nTo connect dashboard:")
    print("1. Set API_URL = 'http://localhost:8000/api/game-data'")
    print("2. Dashboard will poll every 7 seconds")
    print("3. Watch the data update in real-time!")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000)
