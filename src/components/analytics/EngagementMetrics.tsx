
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, BarChart } from 'lucide-react';

type EngagementMetricsProps = {
  averageTime: string;
  bounceRate: number;
  sessionCount: number;
};

const EngagementMetrics = ({ averageTime, bounceRate, sessionCount }: EngagementMetricsProps) => {
  // Calculate the quality of the bounce rate (lower is better)
  const getBounceRateQuality = (rate: number): string => {
    if (rate <= 30) return "text-green-500";
    if (rate <= 50) return "text-amber-500";
    return "text-red-500";
  };

  // Format session count with commas
  const formatSessionCount = (count: number): string => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          User Engagement Metrics
        </CardTitle>
        <CardDescription>
          Analysis of user interaction patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-3 border rounded-md bg-muted/30">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Average Session Duration
              </span>
              <span className="font-mono font-medium">{averageTime}</span>
            </div>
            <Progress 
              value={
                // Convert "2m 45s" to seconds and calculate a percentage (max 5 minutes)
                (() => {
                  const match = averageTime.match(/(\d+)m\s+(\d+)s/);
                  if (match) {
                    const mins = parseInt(match[1]);
                    const secs = parseInt(match[2]);
                    const totalSecs = mins * 60 + secs;
                    // 5 min (300 sec) as "ideal" duration
                    return Math.min(100, (totalSecs / 300) * 100);
                  }
                  return 50;
                })()
              } 
              className="h-2" 
            />
          </div>
          
          <div className="space-y-2 p-3 border rounded-md bg-muted/30">
            <div className="flex justify-between text-sm">
              <span>Bounce Rate</span>
              <span className={`font-medium ${getBounceRateQuality(bounceRate)}`}>{bounceRate}%</span>
            </div>
            <Progress 
              value={100 - bounceRate} 
              className="h-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              {bounceRate <= 30 
                ? "Excellent! Users are engaged with multiple pages." 
                : bounceRate <= 50 
                  ? "Good. Consider reviewing engagement strategies." 
                  : "High bounce rate. Users may not be finding what they need."}
            </p>
          </div>
        </div>
        
        <div className="p-3 border rounded-md bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              Total Sessions Analyzed
            </span>
            <span className="font-mono font-medium text-lg">{formatSessionCount(sessionCount)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Based on {formatSessionCount(sessionCount)} unique user sessions over the last 30 days
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
