
import { AnalysisIssue } from '@/types/analysis';
import { getSeverityIcon, getSeverityDescription } from '@/utils/analysis-utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type UsabilityAnalysisProps = {
  score: number;
  issues: AnalysisIssue[];
};

const UsabilityAnalysis = ({ score, issues }: UsabilityAnalysisProps) => {
  return (
    <div className="grid gap-6">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-background rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Overall Usability Score</h3>
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{score}%</span>
            </div>
            <svg className="w-full h-full rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke={score > 70 ? "#10b981" : score > 40 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 36 * (score / 100)} ${2 * Math.PI * 36}`}
                className="transform -rotate-90 origin-[40px_40px] transition-all duration-1000"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {issues.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {issues.map((issue, index) => (
            <AccordionItem key={index} value={`issue-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(issue.severity)}
                  <span className="font-medium">Usability Issue #{index + 1}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 space-y-4">
                  <p className="text-muted-foreground">{issue.description}</p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Severity Level</h4>
                    <p className="text-sm">{getSeverityDescription(issue.severity)}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default UsabilityAnalysis;

