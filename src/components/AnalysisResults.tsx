import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileSearch } from 'lucide-react';
import type { AnalysisResult } from '@/types/analysis';
import DarkUXPatterns from './analysis/DarkUXPatterns';
import UsabilityAnalysis from './analysis/UsabilityAnalysis';
import AccessibilityAnalysis from './analysis/AccessibilityAnalysis';
import PerformanceMetrics from './analysis/PerformanceMetrics';
import RecommendationList from './analysis/RecommendationList';
import HeatmapVisualization from './analytics/HeatmapVisualization';
import WordCloud from './analytics/WordCloud';
import EngagementMetrics from './analytics/EngagementMetrics';

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
          
          <TabsContent value="darkux">
            <DarkUXPatterns {...results.darkUxPatterns} />
          </TabsContent>
          
          <TabsContent value="usability">
            <UsabilityAnalysis {...results.usability} />
          </TabsContent>
          
          <TabsContent value="accessibility">
            <AccessibilityAnalysis {...results.accessibility} />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceMetrics {...results.performance} />
          </TabsContent>
          
          <TabsContent value="analytics">
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
        
        <RecommendationList recommendations={results.recommendations} />
        
        <div className="mt-6 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 animate-in fade-in">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Disclaimer</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                This analysis is provided for informational purposes only. The results should be verified by a UX professional 
                before making significant design changes. False positives may occur.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
