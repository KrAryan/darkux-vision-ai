import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart2, AlertTriangle, Check, Info, Clock, Eye, ChartBar, FileSearch } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HeatmapVisualization from './analytics/HeatmapVisualization';
import WordCloud from './analytics/WordCloud';
import EngagementMetrics from './analytics/EngagementMetrics';

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
      <Card className="w-full mt-8 animate-in fade-in duration-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-darkux-600 to-darkux-800 bg-clip-text text-transparent">
            Running Analysis
          </CardTitle>
          <CardDescription className="text-lg">
            We're analyzing your content for dark UX patterns and generating a comprehensive report...
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

  const getSeverityDescription = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'Critical issue that requires immediate attention';
      case 'medium':
        return 'Important issue that should be addressed';
      case 'low':
        return 'Minor issue that could be improved';
      default:
        return 'Issue requires review';
    }
  };

  return (
    <Card className="w-full mt-8 animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-darkux-600 to-darkux-800 bg-clip-text text-transparent flex items-center gap-2">
          <FileSearch className="w-8 h-8" />
          Analysis Results
        </CardTitle>
        <CardDescription className="text-lg">
          Comprehensive assessment of UX patterns, accessibility, and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4 bg-muted/30">
            <TabsTrigger value="darkux" className="data-[state=active]:bg-darkux-500 data-[state=active]:text-white">
              Dark UX
            </TabsTrigger>
            <TabsTrigger value="usability" className="data-[state=active]:bg-darkux-500 data-[state=active]:text-white">
              Usability
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="data-[state=active]:bg-darkux-500 data-[state=active]:text-white">
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-darkux-500 data-[state=active]:text-white">
              Performance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-darkux-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="darkux" className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-darkux-50 to-background rounded-lg border">
              <div>
                <h3 className="text-xl font-semibold">Dark UX Pattern Detection</h3>
                <p className="text-muted-foreground mt-1">
                  {darkUxPatterns.detected 
                    ? "Our analysis has identified potential dark patterns that may negatively impact user experience" 
                    : "No concerning UX patterns detected in the analyzed content"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Confidence Score</p>
                  <span className="text-3xl font-bold bg-gradient-to-r from-darkux-600 to-darkux-800 bg-clip-text text-transparent">
                    {darkUxPatterns.confidence}%
                  </span>
                </div>
                {darkUxPatterns.detected ? (
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                ) : (
                  <Check className="h-12 w-12 text-green-500" />
                )}
              </div>
            </div>
            
            {darkUxPatterns.patterns.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {darkUxPatterns.patterns.map((pattern, index) => (
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
          </TabsContent>
          
          <TabsContent value="usability" className="space-y-6">
            <div className="grid gap-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-background rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Overall Usability Score</h3>
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{usability.score}%</span>
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
                        stroke={usability.score > 70 ? "#10b981" : usability.score > 40 ? "#f59e0b" : "#ef4444"}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 36 * (usability.score / 100)} ${2 * Math.PI * 36}`}
                        className="transform -rotate-90 origin-[40px_40px] transition-all duration-1000"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              {usability.issues.length > 0 && (
                <Accordion type="single" collapsible className="w-full">
                  {usability.issues.map((issue, index) => (
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
          </TabsContent>
          
          <TabsContent value="accessibility" className="space-y-6">
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
          
          <TabsContent value="performance" className="space-y-6">
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
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <HeatmapVisualization data={[
                { name: 'Click Zone 1', value: 45, x: 100, y: 150 },
                { name: 'Click Zone 2', value: 78, x: 200, y: 250 },
                { name: 'Click Zone 3', value: 23, x: 300, y: 350 },
              ]} />
              <WordCloud words={[
                { text: 'Dark Pattern', value: 40 },
                { text: 'Hidden Costs', value: 30 },
                { text: 'Subscription', value: 25 },
                { text: 'Privacy', value: 35 },
                { text: 'Cancellation', value: 28 },
              ]} />
              <EngagementMetrics 
                averageTime="2m 45s"
                bounceRate={35}
                sessionCount={1247}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-6 h-6 text-darkux-500" />
            Recommendations
          </h3>
          <div className="grid gap-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg transition-all hover:bg-muted/50">
                <Check className="h-5 w-5 text-darkux-500 mt-0.5" />
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
