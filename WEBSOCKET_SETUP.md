# WebSocket Setup Guide

This dashboard is designed to receive live updates via WebSocket connection. Here's how to connect your backend.

## Quick Setup

1. **Set the WebSocket URL**
   - Open `src/pages/Index.tsx`
   - Find the `WEBSOCKET_URL` constant (around line 99)
   - Replace the empty string with your backend URL:
   
   ```typescript
   const WEBSOCKET_URL = 'ws://localhost:8080';
   // or for production:
   const WEBSOCKET_URL = 'wss://your-backend.com/ws';
   ```

2. **Backend Requirements**

   Your WebSocket backend should:
   - Send JSON data every **~7 seconds** (configurable)
   - Use the `AgentInsight` JSON schema (see below)
   - Send complete data updates (dashboard will handle all transitions)

## JSON Schema

```json
{
  "type": "AgentInsight",
  "version": "1.1",
  "meta": {
    "timestamp": "2025-10-01T18:45:00Z",
    "game_id": "NYY@BOS-20251001",
    "seq_no": 142
  },
  "ctx": {
    "inning": 7,
    "half": "Top",
    "outs": 1,
    "bases": "1B-3B",
    "count": "2-2",
    "score": { "home": 4, "away": 5 },
    "batting_team": "AWAY",
    "home_team": "BOS",
    "away_team": "NYY",
    "batter": { "id": 592450, "name": "Aaron Judge", "hand": "R", "pos": "RF", "slot": 2 },
    "pitcher": { "id": 605483, "name": "Tanner Houck", "hand": "R" }
  },
  "conds": {
    "weather": {
      "temp_f": 68,
      "humidity_pct": 55,
      "wind_mph": 8,
      "wind_dir": "LF→RF",
      "precip_prob": 0.1,
      "roof": "open"
    },
    "pitch": {
      "ball_grip": "normal",
      "mound": "good",
      "visibility": "twilight",
      "wind_effect": "cross"
    }
  },
  "preds": {
    "pa": {
      "strikeout": 0.28,
      "walk_hbp": 0.12,
      "ball_in_play": 0.60
    },
    "p_hit_given_bip": 0.32,
    "re_delta_if_reach": 0.85,
    "re_delta_if_out": -0.45,
    "wp_now": 0.54
  },
  "ins": {
    "batter_strengths": ["Pull power vs RHP", "Excellent eye on pitches up"],
    "batter_weaknesses": ["Sweepers low-away", "Two-strike sliders"],
    "pitcher_strengths": ["Sinker induces weak contact", "Two-strike splitter whiffs ~38%"],
    "pitcher_weaknesses": ["Hangs sliders when tired", "Struggles vs power lefties"]
  },
  "suggest": {
    "pitch": "splitter",
    "location": "down-away",
    "confidence": 0.72,
    "why": "Judge chases splitters down-away 42% of the time in 2-strike counts"
  },
  "past": {
    "h2h": { "hits": 3, "pa": 12, "note": "small sample" },
    "recent10": { "obp": 0.385, "slg": 0.624 }
  },
  "clips": [
    {
      "player_id": 592450,
      "title": "Judge HR vs Houck Slider",
      "url": "https://youtube.com/watch?v=example1",
      "start_s": 15,
      "end_s": 30,
      "source": "youtube",
      "ts": "2025-09-15T19:22:00Z"
    }
  ],
  "text": "Judge (2-2 count, runners on corners) faces Houck's splitter—chases it 42% in 2-strike situations."
}
```

## Features

### Automatic Updates
- Dashboard automatically refreshes when new data arrives
- Smooth transitions between data states
- Visual "Updating..." indicator when new data is received
- No manual refresh needed

### Connection Management
- Auto-reconnection on connection loss (up to 10 attempts)
- Real-time connection status in header
- Toast notifications for connection events
- Graceful fallback to demo data when disconnected

### Update Frequency
The recommended update frequency is **~7 seconds** to balance between:
- Real-time responsiveness
- Server load
- Smooth user experience

You can adjust this in your backend based on your needs.

## Testing

### Development
```bash
# Start your WebSocket server on localhost:8080
# Make sure it sends data in the correct JSON format
# Update WEBSOCKET_URL in src/pages/Index.tsx
```

### Demo Mode
If `WEBSOCKET_URL` is empty, the dashboard will display dummy data automatically, allowing you to see the layout and design before connecting your backend.

## Connection States

1. **Disconnected (Demo Mode)** - Shows dummy data with connection guide
2. **Connecting** - Attempts to establish connection
3. **Connected** - Live data streaming, shows real-time updates
4. **Reconnecting** - Automatically attempts to reconnect on disconnect

## Troubleshooting

### WebSocket Connection Fails
- Check if your backend is running
- Verify the WebSocket URL is correct
- Check browser console for error messages
- Ensure CORS is properly configured on your backend

### Data Not Updating
- Verify backend is sending data every ~7 seconds
- Check JSON format matches the schema
- Look for parsing errors in browser console
- Verify all required fields are present

### Performance Issues
- Consider increasing update interval (>7 seconds)
- Optimize JSON payload size
- Check network latency
- Monitor browser memory usage

## Example WebSocket Server (Node.js)

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send data every 7 seconds
  const interval = setInterval(() => {
    const data = {
      type: "AgentInsight",
      version: "1.1",
      // ... rest of your data
    };
    ws.send(JSON.stringify(data));
  }, 7000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
```
