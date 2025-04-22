
export type AnalysisPattern = {
  name: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  confidence: number;
};

export type AnalysisIssue = {
  description: string;
  severity: 'high' | 'medium' | 'low';
};

export type AnalysisResult = {
  darkUxPatterns: {
    detected: boolean;
    confidence: number;
    patterns: AnalysisPattern[];
  };
  usability: {
    score: number;
    issues: AnalysisIssue[];
  };
  accessibility: {
    score: number;
    issues: AnalysisIssue[];
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

