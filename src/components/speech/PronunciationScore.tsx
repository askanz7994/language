
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface PronunciationScoreProps {
  score: number;
}

const PronunciationScore: React.FC<PronunciationScoreProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-red-500';
    if (score <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getScoreBackground = (score: number) => {
    if (score <= 3) return 'bg-red-50 border border-red-200';
    return 'bg-primary/10';
  };

  return (
    <div className="text-center">
      <div className={`text-4xl font-bold mb-3 ${getScoreColor(score)}`}>
        {score}/10
      </div>
      <div className="text-xl font-semibold">Pronunciation Score</div>
      {score <= 3 && (
        <div className="flex items-center justify-center gap-2 mt-2 text-red-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Very low score - please read the complete text clearly</span>
        </div>
      )}
    </div>
  );
};

export default PronunciationScore;
