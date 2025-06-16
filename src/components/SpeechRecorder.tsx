
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAudioAnalysis } from '@/hooks/useAudioAnalysis';
import AnalysisLoading from './speech/AnalysisLoading';
import AnalysisResults from './speech/AnalysisResults';

interface SpeechRecorderProps {
  originalText: string;
  title: string;
  audioBlob: Blob | null;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title, audioBlob }) => {
  const { profile } = useAuth();
  const { isAnalyzing, analysisResult, analyzeAudio } = useAudioAnalysis(originalText);

  // Automatically analyze when audioBlob changes
  useEffect(() => {
    if (audioBlob) {
      analyzeAudio(audioBlob);
    }
  }, [audioBlob, analyzeAudio]);

  const preferredLanguage = profile?.preferred_language || 'English';

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Speech Analysis - {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Analysis Loading State */}
        {isAnalyzing && <AnalysisLoading />}

        {/* Analysis Results */}
        {analysisResult && (
          <AnalysisResults 
            result={analysisResult} 
            preferredLanguage={preferredLanguage} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
