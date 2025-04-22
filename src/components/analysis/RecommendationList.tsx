
import { Check, Info } from 'lucide-react';

type RecommendationListProps = {
  recommendations: string[];
};

const RecommendationList = ({ recommendations }: RecommendationListProps) => {
  return (
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
  );
};

export default RecommendationList;

