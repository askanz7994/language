
import React from 'react';
import { getSpeechAnalysisTranslations } from '@/utils/speechAnalysisTranslations';
import PronunciationScore from './PronunciationScore';

interface AnalysisResult {
  transcription: string;
  accuracyScore: number;
  feedback: string;
  improvements: string;
  encouragement: string;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
  preferredLanguage: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, preferredLanguage }) => {
  const translations = getSpeechAnalysisTranslations(preferredLanguage);

  return (
    <div className="space-y-6 mt-6">
      <PronunciationScore score={result.accuracyScore} />
      
      {result.transcription && 
       result.transcription !== "SILENT_AUDIO" && 
       result.transcription !== "Analysis failed" && 
       result.transcription.length > 10 && (
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">What we heard:</h4>
          <p className="text-muted-foreground italic">"{result.transcription}"</p>
        </div>
      )}
      
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-semibold mb-2">{translations.feedback}:</h4>
        <p className="text-muted-foreground">{result.feedback}</p>
      </div>
      
      {result.improvements && (
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">{translations.improvements}:</h4>
          <p className="text-muted-foreground">{result.improvements}</p>
        </div>
      )}
      
      <div className={`p-4 rounded-lg ${
        result.accuracyScore <= 3 ? 'bg-red-50 border border-red-200' : 'bg-primary/10'
      }`}>
        <h4 className="font-semibold mb-2">{translations.encouragement}:</h4>
        <p className={result.accuracyScore <= 3 ? 'text-red-700' : 'text-primary'}>
          {result.encouragement}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResults;
