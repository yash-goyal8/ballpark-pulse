"""
Simple test API server for baseball dashboard
Run with: python test-api-server.py
Then set API_URL = 'http://localhost:8000/api/game-data' in Index.tsx
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all JSON data from file
with open('llm_responses.jsonl', 'r') as f:
    json_lines = [json.loads(line) for line in f]

# Current index tracker
current_index = 0

@app.get("/api/game-data")
async def get_game_data():
    global current_index
    
    # Get current data entry
    data = json_lines[current_index]
    
    # Print to console
    print(f"\n{'='*60}")
    print(f"📊 Serving Entry #{current_index + 1} of {len(json_lines)}")
    print(f"{'='*60}")
    print(f"Game ID: {data.get('llm_response', {}).get('meta', {}).get('game_id', 'N/A')}")
    print(f"Timestamp: {data.get('timestamp', 'N/A')}")
    print(f"Inning: {data.get('llm_response', {}).get('ctx', {}).get('inning', 'N/A')} - {data.get('llm_response', {}).get('ctx', {}).get('half', 'N/A')}")
    print(f"Count: {data.get('llm_response', {}).get('ctx', {}).get('count', 'N/A')}")
    print(f"Outs: {data.get('llm_response', {}).get('ctx', {}).get('outs', 'N/A')}")
    print(f"Score: {data.get('llm_response', {}).get('ctx', {}).get('score', {})}")
    print(f"Batter: {data.get('llm_response', {}).get('ctx', {}).get('batter', {}).get('name', 'N/A')}")
    print(f"Pitcher: {data.get('llm_response', {}).get('ctx', {}).get('pitcher', {}).get('name', 'N/A')}")
    print(f"\n📦 FULL JSON RESPONSE:")
    print(json.dumps(data, indent=2))
    print(f"{'='*60}\n")
    
    # Move to next entry (loop back to start if at end)
    current_index = (current_index + 1) % len(json_lines)
    
    return data

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
    print(f"Loaded {len(json_lines)} game data entries from llm_responses.jsonl")
    print("Server running at: http://localhost:8000")
    print("API endpoint: http://localhost:8000/api/game-data")
    print("\nTo connect dashboard:")
    print("1. Set API_URL = 'http://localhost:8000/api/game-data'")
    print("2. Dashboard will poll every 7 seconds")
    print("3. Watch the data update in real-time!")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000)
