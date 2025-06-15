
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getSpeechAnalysisTranslations } from '@/utils/speechAnalysisTranslations';

interface SpeechRecorderProps {
  originalText: string;
  title: string;
  audioBlob: Blob | null;
}

interface AnalysisResult {
  transcription: string;
  accuracyScore: number;
  feedback: string;
  improvements: string;
  encouragement: string;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title, audioBlob }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { profile } = useAuth();

  const analyzeAudio = useCallback(async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);
    setAnalysisResult(null); // Clear previous results
    
    try {
      console.log('Starting audio analysis, blob size:', audioBlob.size);
      
      // Enhanced blob validation
      if (audioBlob.size < 1024) {
        throw new Error('Audio recording is too short or empty');
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Audio = (reader.result as string).split(',')[1];
          
          console.log('Base64 audio length:', base64Audio.length);
          
          const { data, error } = await supabase.functions.invoke('analyze-pronunciation', {
            body: {
              audioBase64: base64Audio,
              originalText: originalText,
              language: 'english',
              preferredLanguage: profile?.preferred_language || 'English'
            }
          });

          if (error) {
            console.error('Supabase function error:', error);
            throw error;
          }

          console.log('Analysis result received:', data);

          // Enhanced result validation
          if (!data || typeof data.accuracyScore !== 'number') {
            throw new Error('Invalid analysis result received');
          }

          setAnalysisResult(data);
        } catch (analysisError) {
          console.error('Error during analysis:', analysisError);
          throw analysisError;
        }
      };

      reader.onerror = () => {
        throw new Error('Failed to read audio file');
      };

      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error analyzing audio:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, originalText, profile?.preferred_language]);

  // Automatically analyze when audioBlob changes
  React.useEffect(() => {
    if (audioBlob) {
      analyzeAudio();
    }
  }, [audioBlob, analyzeAudio]);

  // Get translated labels based on user's preferred language
  const preferredLanguage = profile?.preferred_language || 'English';
  const translations = getSpeechAnalysisTranslations(preferredLanguage);

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Speech Analysis - {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Analysis Loading State */}
        {isAnalyzing && (
          <div className="flex items-center justify-center gap-2 p-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing your pronunciation with advanced AI...</span>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {analysisResult.accuracyScore}/10
              </div>
              <div className="text-lg font-semibold">Pronunciation Score</div>
            </div>
            
            {analysisResult.transcription && analysisResult.transcription !== "SILENT_AUDIO" && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">What we heard:</h4>
                <p className="text-muted-foreground">{analysisResult.transcription}</p>
              </div>
            )}
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">{translations.feedback}:</h4>
              <p className="text-muted-foreground">{analysisResult.feedback}</p>
            </div>
            
            {analysisResult.improvements && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">{translations.improvements}:</h4>
                <p className="text-muted-foreground">{analysisResult.improvements}</p>
              </div>
            )}
            
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">{translations.encouragement}:</h4>
              <p className="text-primary">{analysisResult.encouragement}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
