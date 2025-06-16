
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AnalysisResult {
  transcription: string;
  accuracyScore: number;
  feedback: string;
  improvements: string;
  encouragement: string;
}

export const useAudioAnalysis = (originalText: string) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { profile } = useAuth();

  const analyzeAudio = useCallback(async (audioBlob: Blob) => {
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
  }, [originalText, profile?.preferred_language]);

  return {
    isAnalyzing,
    analysisResult,
    analyzeAudio
  };
};
