
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

type EngagementMetricsProps = {
  averageTime: string;
  bounceRate: number;
  sessionCount: number;
};

const EngagementMetrics = ({ averageTime, bounceRate, sessionCount }: EngagementMetricsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          User Engagement Metrics
        </CardTitle>
        <CardDescription>
          Analysis of user interaction patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Average Session Duration</span>
            <span className="font-mono">{averageTime}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Bounce Rate</span>
              <span>{bounceRate}%</span>
            </div>
            <Progress value={bounceRate} className="h-2" />
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span>Total Sessions Analyzed</span>
              <span className="font-mono">{sessionCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
