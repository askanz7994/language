
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getSpeechAnalysisTranslations } from '@/utils/speechAnalysisTranslations';
import { toast } from 'sonner';

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
    setAnalysisResult(null);
    
    try {
      console.log('Starting enhanced audio analysis, blob size:', audioBlob.size);
      
      // Enhanced client-side validation
      const wordCount = originalText.trim().split(/\s+/).length;
      const expectedMinSize = wordCount * 1024; // ~1KB per word minimum
      
      if (audioBlob.size < Math.max(expectedMinSize, 5120)) {
        console.warn(`Audio too small: ${audioBlob.size} bytes (expected: ${expectedMinSize} bytes for ${wordCount} words)`);
        toast.warning('Recording seems too short. Please read the complete text clearly.');
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Audio = (reader.result as string).split(',')[1];
          
          if (!base64Audio || base64Audio.length < 1000) {
            throw new Error('Invalid or insufficient audio data');
          }
          
          console.log('Base64 audio length:', base64Audio.length, 'Original text word count:', wordCount);
          
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

          console.log('Enhanced analysis result received:', data);

          // Enhanced result validation
          if (!data || typeof data.accuracyScore !== 'number' || data.accuracyScore < 1 || data.accuracyScore > 10) {
            throw new Error('Invalid analysis result received - invalid score');
          }

          if (!data.transcription || !data.feedback) {
            throw new Error('Invalid analysis result received - missing required fields');
          }

          setAnalysisResult(data);
          
          // Provide user feedback based on score
          if (data.accuracyScore === 1) {
            toast.error('No clear speech detected. Please ensure you read the text aloud.');
          } else if (data.accuracyScore <= 3) {
            toast.warning('Low pronunciation score. Try reading more clearly and completely.');
          } else if (data.accuracyScore >= 8) {
            toast.success('Excellent pronunciation!');
          }
          
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
      toast.error('Failed to analyze pronunciation. Please try again.');
      setAnalysisResult({
        transcription: "Analysis failed",
        accuracyScore: 1,
        feedback: "Unable to analyze pronunciation. Please check your recording and try again.",
        improvements: "Ensure you have a working microphone and read the text clearly.",
        encouragement: "Don't give up! Technical issues can happen. Please try again."
      });
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
          <div className="flex items-center justify-center gap-2 p-6">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg">Analyzing your pronunciation with ultra-strict AI...</span>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6 mt-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-3 ${
                analysisResult.accuracyScore <= 3 ? 'text-red-500' : 
                analysisResult.accuracyScore <= 6 ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {analysisResult.accuracyScore}/10
              </div>
              <div className="text-xl font-semibold">Pronunciation Score</div>
              {analysisResult.accuracyScore <= 3 && (
                <div className="flex items-center justify-center gap-2 mt-2 text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Very low score - please read the complete text clearly</span>
                </div>
              )}
            </div>
            
            {analysisResult.transcription && 
             analysisResult.transcription !== "SILENT_AUDIO" && 
             analysisResult.transcription !== "Analysis failed" && 
             analysisResult.transcription.length > 10 && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">What we heard:</h4>
                <p className="text-muted-foreground italic">"{analysisResult.transcription}"</p>
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
            
            <div className={`p-4 rounded-lg ${
              analysisResult.accuracyScore <= 3 ? 'bg-red-50 border border-red-200' : 'bg-primary/10'
            }`}>
              <h4 className="font-semibold mb-2">{translations.encouragement}:</h4>
              <p className={analysisResult.accuracyScore <= 3 ? 'text-red-700' : 'text-primary'}>
                {analysisResult.encouragement}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
