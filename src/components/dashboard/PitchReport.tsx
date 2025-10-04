import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface PitchReportProps {
  data?: {
    type?: string;
    conditions?: string;
    analysis?: string;
  };
}

export const PitchReport = ({ data }: PitchReportProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Pitch Report</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Type</p>
          <p className="text-base font-semibold text-foreground">{data?.type || 'N/A'}</p>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Conditions</p>
          <p className="text-base font-semibold text-foreground">{data?.conditions || 'N/A'}</p>
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Analysis</p>
          <p className="text-sm text-foreground leading-relaxed">
            {data?.analysis || 'Pitch analysis will be displayed here once data is available.'}
          </p>
        </div>
      </div>
    </Card>
  );
};
