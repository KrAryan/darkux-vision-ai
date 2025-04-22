
import { AlertTriangle, Info } from 'lucide-react';

export const getSeverityColor = (severity: string) => {
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

export const getSeverityIcon = (severity: string) => {
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

export const getSeverityDescription = (severity: string) => {
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

