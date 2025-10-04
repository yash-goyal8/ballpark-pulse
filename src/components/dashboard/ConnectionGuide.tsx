import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Code, Zap } from 'lucide-react';

export const ConnectionGuide = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wifi className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">WebSocket Connection Setup</h3>
        <Badge variant="outline" className="ml-auto">Demo Mode</Badge>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-start gap-3 mb-3">
            <Code className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-2">Setup Instructions</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Currently showing dummy data. To connect live data:
              </p>
            </div>
          </div>

          <div className="space-y-3 pl-8">
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-primary">1.</span>
              <p className="text-xs text-foreground">
                Open <code className="px-2 py-0.5 rounded bg-muted text-primary font-mono">src/pages/Index.tsx</code>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-primary">2.</span>
              <p className="text-xs text-foreground">
                Find the <code className="px-2 py-0.5 rounded bg-muted text-primary font-mono">WEBSOCKET_URL</code> constant
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-primary">3.</span>
              <p className="text-xs text-foreground">
                Replace with your backend URL:
              </p>
            </div>
            <div className="mt-2 p-3 rounded bg-muted border border-border">
              <code className="text-xs font-mono text-primary">
                const WEBSOCKET_URL = 'ws://localhost:8080';
              </code>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-2">Backend Requirements</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Send JSON data every ~7 seconds matching the AgentInsight schema</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Include all fields: ctx, conds, preds, ins, suggest, past, clips</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Dashboard will automatically update with smooth transitions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Dashboard updates automatically when connected • No manual refresh needed
          </p>
        </div>
      </div>
    </Card>
  );
};
