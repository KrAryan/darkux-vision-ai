
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart2, AlertTriangle, Check, Info } from 'lucide-react';

export type AnalysisResult = {
  darkUxPatterns: {
    detected: boolean;
    confidence: number;
    patterns: {
      name: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
      confidence: number;
    }[];
  };
  usability: {
    score: number;
    issues: {
      description: string;
      severity: 'high' | 'medium' | 'low';
    }[];
  };
  accessibility: {
    score: number;
    issues: {
      description: string;
      severity: 'high' | 'medium' | 'low';
    }[];
  };
  performance: {
    score: number;
    loadTime: string;
    webVitals: {
      lcp: string;
      fid: string;
      cls: string;
    };
  };
  recommendations: string[];
};

type AnalysisResultsProps = {
  results: AnalysisResult | null;
  isAnalyzing: boolean;
};

const AnalysisResults = ({ results, isAnalyzing }: AnalysisResultsProps) => {
  const [activeTab, setActiveTab] = useState('darkux');

  if (isAnalyzing) {
    return (
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Running Analysis</CardTitle>
          <CardDescription>
            We're analyzing your content for dark UX patterns and generating a report...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>OCR Text Extraction</span>
                <span>In Progress</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Dark UX Pattern Detection</span>
                <span>Pending</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accessibility Analysis</span>
                <span>Pending</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="inline-block w-16 h-16 rounded-full border-4 border-t-darkux-500 border-r-darkux-300 border-b-darkux-200 border-l-darkux-100 animate-spin"></div>
            <p className="mt-4 text-sm text-muted-foreground">
              This may take a minute or two depending on the content
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  const { darkUxPatterns, usability, accessibility, performance, recommendations } = results;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>
          Comprehensive assessment of the provided content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="darkux" className="text-xs md:text-sm">
              Dark UX
            </TabsTrigger>
            <TabsTrigger value="usability" className="text-xs md:text-sm">
              Usability
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="text-xs md:text-sm">
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs md:text-sm">
              Performance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="darkux" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Dark UX Pattern Detection</h3>
                <p className="text-sm text-muted-foreground">
                  {darkUxPatterns.detected 
                    ? "Potential dark patterns detected with the following confidence" 
                    : "No dark patterns detected"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">
                  {darkUxPatterns.confidence}%
                </span>
                {darkUxPatterns.detected ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            
            {darkUxPatterns.patterns.length > 0 ? (
              <div className="space-y-4 mt-4">
                <h4 className="font-medium">Detected Patterns</h4>
                <div className="space-y-3">
                  {darkUxPatterns.patterns.map((pattern, index) => (
                    <div key={index} className="p-3 border rounded-md bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-2">
                          {getSeverityIcon(pattern.severity)}
                          <h5 className="font-medium">{pattern.name}</h5>
                        </div>
                        <span className={`text-sm ${getSeverityColor(pattern.severity)}`}>
                          {pattern.severity.toUpperCase()} ({pattern.confidence}%)
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {pattern.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 border rounded-md bg-muted/30 text-center">
                <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p>No dark UX patterns detected in the analyzed content.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="usability" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Usability Analysis</h3>
                <p className="text-sm text-muted-foreground">Overall usability score</p>
              </div>
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{usability.score}%</span>
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
                    stroke={usability.score > 70 ? "#10b981" : usability.score > 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={`${usability.score}, 100`}
                  />
                </svg>
              </div>
            </div>
            
            {usability.issues.length > 0 ? (
              <div className="space-y-4 mt-4">
                <h4 className="font-medium">Usability Issues</h4>
                <div className="space-y-3">
                  {usability.issues.map((issue, index) => (
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
                <p>No usability issues detected.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="accessibility" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Accessibility Evaluation</h3>
                <p className="text-sm text-muted-foreground">
                  WCAG compliance assessment
                </p>
              </div>
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{accessibility.score}%</span>
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
                    stroke={accessibility.score > 70 ? "#10b981" : accessibility.score > 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={`${accessibility.score}, 100`}
                  />
                </svg>
              </div>
            </div>
            
            {accessibility.issues.length > 0 ? (
              <div className="space-y-4 mt-4">
                <h4 className="font-medium">Accessibility Issues</h4>
                <div className="space-y-3">
                  {accessibility.issues.map((issue, index) => (
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
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Performance Metrics</h3>
                <p className="text-sm text-muted-foreground">
                  Load time and web vitals
                </p>
              </div>
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{performance.score}%</span>
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
                    stroke={performance.score > 70 ? "#10b981" : performance.score > 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={`${performance.score}, 100`}
                  />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 border rounded-md bg-muted/30">
                <h5 className="text-sm font-medium text-muted-foreground mb-1">Load Time</h5>
                <p className="text-xl font-semibold">{performance.loadTime}</p>
              </div>
              <div className="p-4 border rounded-md bg-muted/30">
                <h5 className="text-sm font-medium text-muted-foreground mb-1">Largest Contentful Paint</h5>
                <p className="text-xl font-semibold">{performance.webVitals.lcp}</p>
              </div>
              <div className="p-4 border rounded-md bg-muted/30">
                <h5 className="text-sm font-medium text-muted-foreground mb-1">Cumulative Layout Shift</h5>
                <p className="text-xl font-semibold">{performance.webVitals.cls}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="mt-1">
                  <Check className="h-4 w-4 text-darkux-500" />
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
