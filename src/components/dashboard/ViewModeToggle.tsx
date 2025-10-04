import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, BarChart3, Zap } from 'lucide-react';

interface ViewModeToggleProps {
  mode: 'game' | 'analyst' | 'fan';
  onModeChange: (mode: 'game' | 'analyst' | 'fan') => void;
}

export const ViewModeToggle = ({ mode, onModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex justify-center mb-6">
      <Tabs value={mode} onValueChange={(v) => onModeChange(v as 'game' | 'analyst' | 'fan')}>
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50 p-1">
          <TabsTrigger value="game" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline">Game Mode</span>
          </TabsTrigger>
          <TabsTrigger value="analyst" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analyst Mode</span>
          </TabsTrigger>
          <TabsTrigger value="fan" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Fan Mode</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
