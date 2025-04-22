
type PerformanceMetricsProps = {
  score: number;
  loadTime: string;
  webVitals: {
    lcp: string;
    fid: string;
    cls: string;
  };
};

const PerformanceMetrics = ({ score, loadTime, webVitals }: PerformanceMetricsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Performance Metrics</h3>
          <p className="text-sm text-muted-foreground">
            Load time and web vitals
          </p>
        </div>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{score}%</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={score > 70 ? "#10b981" : score > 40 ? "#f59e0b" : "#ef4444"}
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
            />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 border rounded-md bg-muted/30">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Load Time</h5>
          <p className="text-xl font-semibold">{loadTime}</p>
        </div>
        <div className="p-4 border rounded-md bg-muted/30">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Largest Contentful Paint</h5>
          <p className="text-xl font-semibold">{webVitals.lcp}</p>
        </div>
        <div className="p-4 border rounded-md bg-muted/30">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Cumulative Layout Shift</h5>
          <p className="text-xl font-semibold">{webVitals.cls}</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;

