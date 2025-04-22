
import { Progress } from '@/components/ui/progress';

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
  // Helper function to determine color based on metric value
  const getMetricColor = (metric: string, type: 'lcp' | 'fid' | 'cls'): string => {
    // Remove units for comparison
    const numericValue = parseFloat(metric);
    
    if (type === 'lcp') {
      return numericValue <= 2.5 ? "text-green-500" : numericValue <= 4 ? "text-amber-500" : "text-red-500";
    } else if (type === 'fid') {
      return numericValue <= 100 ? "text-green-500" : numericValue <= 300 ? "text-amber-500" : "text-red-500";
    } else if (type === 'cls') {
      return numericValue <= 0.1 ? "text-green-500" : numericValue <= 0.25 ? "text-amber-500" : "text-red-500";
    }
    return "text-muted-foreground";
  };

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
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Page Load Time</h5>
          <p className="text-xl font-semibold">{loadTime}</p>
          <Progress 
            value={parseFloat(loadTime) <= 2 ? 90 : parseFloat(loadTime) <= 3 ? 70 : parseFloat(loadTime) <= 4 ? 50 : 30} 
            className="h-1.5 mt-2" 
          />
        </div>

        <div className="p-4 border rounded-md bg-muted/30">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Largest Contentful Paint</h5>
          <p className={`text-xl font-semibold ${getMetricColor(webVitals.lcp, 'lcp')}`}>
            {webVitals.lcp}
          </p>
          <div className="text-xs mt-1">Target: &lt;2.5s</div>
          <Progress 
            value={parseFloat(webVitals.lcp) <= 2.5 ? 90 : parseFloat(webVitals.lcp) <= 4 ? 60 : 30} 
            className="h-1.5 mt-2" 
          />
        </div>

        <div className="p-4 border rounded-md bg-muted/30">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">Cumulative Layout Shift</h5>
          <p className={`text-xl font-semibold ${getMetricColor(webVitals.cls, 'cls')}`}>
            {webVitals.cls}
          </p>
          <div className="text-xs mt-1">Target: &lt;0.1</div>
          <Progress 
            value={parseFloat(webVitals.cls) <= 0.1 ? 90 : parseFloat(webVitals.cls) <= 0.25 ? 60 : 30} 
            className="h-1.5 mt-2" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
        <div className="p-4 border rounded-md bg-muted/30">
          <h5 className="text-sm font-medium text-muted-foreground mb-1">First Input Delay</h5>
          <p className={`text-xl font-semibold ${getMetricColor(webVitals.fid, 'fid')}`}>
            {webVitals.fid}
          </p>
          <div className="text-xs mt-1">Target: &lt;100ms</div>
          <Progress 
            value={parseFloat(webVitals.fid) <= 100 ? 90 : parseFloat(webVitals.fid) <= 300 ? 60 : 30} 
            className="h-1.5 mt-2" 
          />
        </div>
      </div>

      <div className="mt-4 p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-sm mb-2">About Web Vitals</h4>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li><span className="font-medium">LCP</span>: Largest Contentful Paint - measures loading performance</li>
          <li><span className="font-medium">FID</span>: First Input Delay - measures interactivity</li>
          <li><span className="font-medium">CLS</span>: Cumulative Layout Shift - measures visual stability</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
