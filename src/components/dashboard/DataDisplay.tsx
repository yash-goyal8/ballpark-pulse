interface DataDisplayProps {
  data: any;
}

export const DataDisplay = ({ data }: DataDisplayProps) => {
  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <pre className="bg-secondary/50 rounded-lg p-4 text-xs overflow-auto max-h-60 text-foreground">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
