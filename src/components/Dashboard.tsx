
import { useState } from 'react';
import UploadArea from './UploadArea';
import FilePreview from './FilePreview';
import AnalysisResults, { AnalysisResult } from './AnalysisResults';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setWebsiteUrl('');
  };

  const handleUrlSubmitted = (url: string) => {
    setWebsiteUrl(url);
    setFiles([]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRunAnalysis = () => {
    if (files.length === 0 && !websiteUrl) {
      toast({
        title: 'Error',
        description: 'Please upload screenshots or enter a website URL to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis process with a delay
    setTimeout(() => {
      // Mock results - in a real app this would come from an API
      const mockResults: AnalysisResult = {
        darkUxPatterns: {
          detected: true,
          confidence: 87,
          patterns: [
            {
              name: 'Forced Continuity',
              description: 'The interface makes it difficult to cancel a subscription or trial by hiding cancellation options.',
              severity: 'high',
              confidence: 92,
            },
            {
              name: 'Misleading Information',
              description: 'The text suggests a limited time offer, but the countdown resets for each visitor.',
              severity: 'medium',
              confidence: 78,
            },
            {
              name: 'Privacy Zuckering',
              description: 'The site tricks users into sharing more personal information than they intended to.',
              severity: 'high',
              confidence: 89,
            },
          ],
        },
        usability: {
          score: 65,
          issues: [
            {
              description: 'Small tap targets make it difficult for users to interact with elements on mobile devices.',
              severity: 'medium',
            },
            {
              description: 'Low contrast text makes content hard to read for some users.',
              severity: 'high',
            },
          ],
        },
        accessibility: {
          score: 58,
          issues: [
            {
              description: 'Missing alternative text for images that convey important information.',
              severity: 'high',
            },
            {
              description: 'Form inputs lack proper labels for screen readers.',
              severity: 'medium',
            },
            {
              description: 'Color contrast does not meet WCAG AA standards.',
              severity: 'medium',
            },
          ],
        },
        performance: {
          score: 72,
          loadTime: '3.2s',
          webVitals: {
            lcp: '2.4s',
            fid: '180ms',
            cls: '0.12',
          },
        },
        recommendations: [
          'Make subscription cancellation options clearly visible and accessible in the same location as subscription sign-up.',
          'Ensure countdown timers reflect actual time limitations rather than resetting for each visitor.',
          'Improve the clarity of privacy settings and what data is being collected.',
          'Increase the size of tap targets to at least 44x44 pixels for better mobile usability.',
          'Add appropriate alt text to all images that convey information.',
          'Improve color contrast to meet WCAG AA standards (4.5:1 for normal text).',
          'Add proper labels to all form inputs for better screen reader compatibility.',
        ],
      };
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 gradient-text">Dark UX Pattern Analyzer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload screenshots or enter website URLs to detect deceptive design patterns and get comprehensive UX analysis
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <UploadArea
            onFilesAccepted={handleFilesAccepted}
            onUrlSubmitted={handleUrlSubmitted}
          />
          
          {files.length > 0 && (
            <FilePreview files={files} onRemove={handleRemoveFile} />
          )}
          
          {websiteUrl && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium mb-2">Website to Analyze</h3>
              <div className="flex items-center justify-between">
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-darkux-500 hover:underline"
                >
                  {websiteUrl}
                </a>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setWebsiteUrl('')}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
          
          {(files.length > 0 || websiteUrl) && !isAnalyzing && !results && (
            <div className="mt-6 text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-darkux-600 to-darkux-800 hover:from-darkux-700 hover:to-darkux-900"
                onClick={handleRunAnalysis}
              >
                Run UX Analysis
              </Button>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3">
          <AnalysisResults results={results} isAnalyzing={isAnalyzing} />
          
          {results && (
            <div className="mt-6 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
