
import { AnalysisPattern } from '@/types/analysis';
import { getSeverityColor, getSeverityIcon, getSeverityDescription } from '@/utils/analysis-utils';
import { AlertTriangle, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type DarkUXPatternsProps = {
  detected: boolean;
  confidence: number;
  patterns: AnalysisPattern[];
};

const DarkUXPatterns = ({ detected, confidence, patterns }: DarkUXPatternsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-darkux-50 to-background rounded-lg border">
        <div>
          <h3 className="text-xl font-semibold">Dark UX Pattern Detection</h3>
          <p className="text-muted-foreground mt-1">
            {detected 
              ? "Our analysis has identified potential dark patterns that may negatively impact user experience" 
              : "No concerning UX patterns detected in the analyzed content"}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Confidence Score</p>
            <span className="text-3xl font-bold bg-gradient-to-r from-darkux-600 to-darkux-800 bg-clip-text text-transparent">
              {confidence}%
            </span>
          </div>
          {detected ? (
            <AlertTriangle className="h-12 w-12 text-red-500" />
          ) : (
            <Check className="h-12 w-12 text-green-500" />
          )}
        </div>
      </div>
      
      {patterns.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {patterns.map((pattern, index) => (
            <AccordionItem key={index} value={`pattern-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(pattern.severity)}
                    <span className="font-semibold">{pattern.name}</span>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${getSeverityColor(pattern.severity)}`}>
                    {pattern.severity.toUpperCase()} ({pattern.confidence}%)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 space-y-4">
                  <p className="text-muted-foreground">{pattern.description}</p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Impact Assessment</h4>
                    <p className="text-sm">{getSeverityDescription(pattern.severity)}</p>
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

export default DarkUXPatterns;

