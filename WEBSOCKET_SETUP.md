# API Polling Setup Guide

This dashboard uses HTTP polling to receive live baseball game data from your backend API. Follow this guide to connect your backend.

## Quick Start

1. **Set your API URL** in `src/pages/Index.tsx`:
   ```typescript
   const API_URL = 'http://localhost:8000/api/game-data'; // or your production URL
   ```

2. **Configure polling interval** (optional):
   ```typescript
   const POLLING_INTERVAL = 7000; // 7 seconds (default)
   ```

## Backend Requirements

### API Endpoint Setup

Your backend needs to:
- Provide a REST API endpoint (GET request)
- Return JSON data in the specified format below
- Support CORS if frontend and backend are on different domains

### Required API Response Format

Your API must return data in this exact structure:

```json
{
  "timestamp": "2025-10-27T19:50:12.902422",
  "llm_response": {
    "type": "AgentInsight",
    "version": "1.1",
    "meta": {
      "timestamp": "2025-10-27T19:50:12Z",
      "game_id": "NYY@NYM-20250517",
      "seq_no": 4
    },
    "ctx": {
      "inning": 1,
      "half": "Top",
      "outs": 0,
      "bases": "---",
      "count": "0-0",
      "score": { "home": 0, "away": 0 },
      "batting_team": "AWAY",
      "home_team": "NYY",
      "away_team": "NYM",
      "batter": { "id": 0, "name": "Player Name", "hand": "R", "pos": "1B", "slot": 0 },
      "pitcher": { "id": 0, "name": "Pitcher Name", "hand": "R" }
    },
    "conds": {
      "weather": {
        "temp_f": 75,
        "humidity_pct": 60,
        "wind_mph": 8,
        "wind_dir": "LF→RF",
        "precip_prob": 0.1,
        "roof": "open"
      },
      "pitch": {
        "ball_grip": "normal",
        "mound": "good",
        "visibility": "day",
        "wind_effect": "neutral"
      }
    },
    "preds": {
      "pa": {
        "strikeout": 0.25,
        "walk_hbp": 0.1,
        "ball_in_play": 0.65
      },
      "p_hit_given_bip": 0.3,
      "re_delta_if_reach": 0.45,
      "re_delta_if_out": -0.25,
      "wp_now": 0.52
    },
    "ins": {
      "batter_strengths": [],
      "batter_weaknesses": [],
      "pitcher_strengths": [],
      "pitcher_weaknesses": []
    },
    "suggest": {
      "pitch": "four-seam",
      "location": "up-away",
      "confidence": 0.7,
      "why": "Recommendation reason"
    },
    "past": {
      "h2h": { "hits": 0, "pa": 0, "note": "" },
      "recent10": { "obp": 0.0, "slg": 0.0 }
    },
    "clips": [],
    "text": "Play-by-play commentary text"
  },
  "success": true,
  "error": null
}
```

The dashboard will automatically extract `llm_response` and use it to update all components.

## Example API Server (Python FastAPI)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/game-data")
async def get_game_data():
    # Your logic to fetch current game data from database
    game_data = {
        "type": "AgentInsight",
        "version": "1.1",
        "meta": {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "game_id": "NYY@NYM-20250517",
            "seq_no": 4
        },
        "ctx": {
            "inning": 1,
            "half": "Top",
            "outs": 0,
            # ... rest of your game context
        },
        # ... rest of your data
    }
    
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "llm_response": game_data,
        "success": True,
        "error": None
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Example API Server (Node.js Express)

```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS

app.get('/api/game-data', (req, res) => {
  // Your logic to fetch current game data from database
  const gameData = {
    type: "AgentInsight",
    version: "1.1",
    meta: {
      timestamp: new Date().toISOString(),
      game_id: "NYY@NYM-20250517",
      seq_no: Math.floor(Math.random() * 1000)
    },
    ctx: {
      inning: 1,
      half: "Top",
      outs: 0,
      // ... rest of your game context
    },
    // ... rest of your data
  };
  
  res.json({
    timestamp: new Date().toISOString(),
    llm_response: gameData,
    success: true,
    error: null
  });
});

app.listen(8000, () => {
  console.log('API server running on port 8000');
});
```

## How It Works

1. **Polling**: Dashboard polls your API endpoint at regular intervals (default 7 seconds)
2. **Data Extraction**: Automatically extracts `llm_response` from API response
3. **Auto-Update**: Components re-render with new data automatically
4. **Error Handling**: Shows connection status and error messages in UI
5. **Fallback**: Uses dummy data if no API URL is configured

## Troubleshooting

### Connection Issues

**Problem**: Dashboard shows "Disconnected"
- Check if your API server is running
- Verify the URL is correct (http:// for local, https:// for production)
- Check browser console for error messages
- Test the endpoint directly in browser or with curl

**Problem**: CORS errors
- Add CORS middleware to your backend
- Configure `allow_origins` appropriately
- Ensure your API returns proper CORS headers

### Data Not Updating
- Verify API returns data in correct format
- Check JSON structure matches expected format
- Look for parsing errors in browser console
- Verify `success: true` in API response

### Testing Your API

Test your API endpoint:
```bash
# Using curl
curl http://localhost:8000/api/game-data

# Should return JSON with llm_response structure
```

## Production Deployment

### Security Considerations
- Use HTTPS in production
- Implement authentication/API keys if needed
- Rate limit API requests
- Validate data before sending
- Configure CORS properly (restrict origins)

### Environment Variables
Consider using environment variables:
```typescript
const API_URL = import.meta.env.VITE_API_URL || '';
const POLLING_INTERVAL = parseInt(import.meta.env.VITE_POLLING_INTERVAL || '7000');
```

## Performance Tips

- **Polling Interval**: Adjust based on your needs (7-15 seconds recommended)
- **Caching**: Implement server-side caching for frequently accessed data
- **Compression**: Enable gzip/brotli compression on your API
- **CDN**: Use CDN for static assets
- **Database**: Optimize database queries, use indexing
