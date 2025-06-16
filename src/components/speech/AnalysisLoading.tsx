
import React from 'react';
import { Loader2 } from 'lucide-react';

const AnalysisLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-6">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="text-lg">Analyzing your pronunciation with ultra-strict AI...</span>
    </div>
  );
};

export default AnalysisLoading;
