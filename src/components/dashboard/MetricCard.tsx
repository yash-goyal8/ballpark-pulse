import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}

export const MetricCard = ({ title, icon: Icon, children }: MetricCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border hover:border-primary/50 transition-all duration-300 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="text-muted-foreground">
        {children}
      </div>
    </Card>
  );
};
