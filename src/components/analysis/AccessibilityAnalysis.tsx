
import { AnalysisIssue } from '@/types/analysis';
import { getSeverityIcon } from '@/utils/analysis-utils';
import { Check } from 'lucide-react';

type AccessibilityAnalysisProps = {
  score: number;
  issues: AnalysisIssue[];
};

const AccessibilityAnalysis = ({ score, issues }: AccessibilityAnalysisProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Accessibility Evaluation</h3>
          <p className="text-sm text-muted-foreground">
            WCAG compliance assessment
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
      
      {issues.length > 0 ? (
        <div className="space-y-4 mt-4">
          <h4 className="font-medium">Accessibility Issues</h4>
          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div key={index} className="p-3 border rounded-md bg-muted/30">
                <div className="flex space-x-2">
                  {getSeverityIcon(issue.severity)}
                  <p className="text-sm">{issue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded-md bg-muted/30 text-center">
          <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p>No accessibility issues detected.</p>
        </div>
      )}
    </div>
  );
};

export default AccessibilityAnalysis;

