
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, Target, TrendingUp, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const { profile } = useAuth();

  const analyzeAudio = useCallback(async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('analyze-pronunciation', {
          body: {
            audioBase64: base64Audio,
            originalText: originalText,
            language: 'english',
            preferredLanguage: profile?.preferred_language || 'English'
          }
        });

        if (error) {
          throw error;
        }

        setAnalysisResult(data);
        toast({
          title: "Analysis Complete! 🎉",
          description: getScoreMessage(data.accuracyScore),
        });
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      toast({
        title: "Analysis failed",
        description: "Please try recording again with clear pronunciation.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, originalText, toast, profile?.preferred_language]);

  // Automatically analyze when audioBlob changes
  React.useEffect(() => {
    if (audioBlob) {
      analyzeAudio();
    }
  }, [audioBlob, analyzeAudio]);

  const getScoreMessage = (score: number) => {
    if (score >= 9) return "Excellent pronunciation! You're almost perfect! 🌟";
    if (score >= 7) return "Great job! Your pronunciation is very good! 👏";
    if (score >= 5) return "Good effort! Keep practicing to improve! 💪";
    if (score >= 3) return "Nice try! Focus on the feedback to improve! 📚";
    return "Keep practicing! Every attempt makes you better! 🎯";
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    if (score >= 5) return "text-yellow-600";
    if (score >= 3) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 7) return <CheckCircle className="h-8 w-8 text-green-600" />;
    if (score >= 5) return <Target className="h-8 w-8 text-blue-600" />;
    return <AlertCircle className="h-8 w-8 text-orange-600" />;
  };

  // Get translated labels based on user's preferred language
  const preferredLanguage = profile?.preferred_language || 'English';
  const translations = getSpeechAnalysisTranslations(preferredLanguage);

  return (
    <Card className="language-card border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <Volume2 className="h-6 w-6" />
          Speech Analysis - {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Analysis Loading State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-muted/50 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center">
              <p className="text-lg font-medium">Analyzing your pronunciation...</p>
              <p className="text-sm text-muted-foreground mt-1">This may take a few seconds</p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Score Section */}
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                {getScoreIcon(analysisResult.accuracyScore)}
                <div className={`text-4xl md:text-5xl font-bold ${getScoreColor(analysisResult.accuracyScore)}`}>
                  {analysisResult.accuracyScore}/10
                </div>
              </div>
              <div className="text-lg md:text-xl font-semibold mb-2">Pronunciation Score</div>
              <div className="text-sm md:text-base text-muted-foreground">
                {getScoreMessage(analysisResult.accuracyScore)}
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full bg-muted rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    analysisResult.accuracyScore >= 7 ? 'bg-green-500' :
                    analysisResult.accuracyScore >= 5 ? 'bg-blue-500' :
                    analysisResult.accuracyScore >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.accuracyScore * 10}%` }}
                />
              </div>
            </div>
            
            {/* What We Heard Section */}
            {analysisResult.transcription && (
              <div className="p-4 md:p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">What we heard:</h4>
                </div>
                <p className="text-blue-800 text-sm md:text-base leading-relaxed italic">
                  "{analysisResult.transcription}"
                </p>
              </div>
            )}
            
            {/* Feedback Section */}
            <div className="p-4 md:p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-purple-900">{translations.feedback}:</h4>
              </div>
              <p className="text-purple-800 text-sm md:text-base leading-relaxed">
                {analysisResult.feedback}
              </p>
            </div>
            
            {/* Improvements Section */}
            {analysisResult.improvements && (
              <div className="p-4 md:p-6 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">{translations.improvements}:</h4>
                </div>
                <p className="text-orange-800 text-sm md:text-base leading-relaxed">
                  {analysisResult.improvements}
                </p>
              </div>
            )}
            
            {/* Encouragement Section */}
            <div className="p-4 md:p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-900">{translations.encouragement}:</h4>
              </div>
              <p className="text-green-800 text-sm md:text-base leading-relaxed font-medium">
                {analysisResult.encouragement}
              </p>
            </div>

            {/* Tips Section */}
            <div className="p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Quick Tips for Better Pronunciation:</h4>
              <ul className="text-gray-700 text-sm md:text-base space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Speak slowly and clearly at first, then gradually increase speed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Practice difficult words individually before reading the full text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Record yourself multiple times and compare with the text-to-speech</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Focus on word stress and intonation patterns</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
