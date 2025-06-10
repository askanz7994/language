
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Star, Trophy, Target, TrendingUp, BookOpen, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getSpeechAnalysisTranslations } from '@/utils/speechAnalysisTranslations';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  detailedAnalysis?: {
    pronunciationErrors: string[];
    fluencyScore: number;
    wordAccuracy: number;
    speedAnalysis: string;
    intonationTips: string;
  };
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title, audioBlob }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);
  const { toast } = useToast();
  const { profile } = useAuth();

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    if (score >= 5) return "text-yellow-600";
    if (score >= 3) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 9) return <Trophy className="h-6 w-6 text-green-600" />;
    if (score >= 7) return <Star className="h-6 w-6 text-blue-600" />;
    if (score >= 5) return <Target className="h-6 w-6 text-yellow-600" />;
    return <TrendingUp className="h-6 w-6 text-orange-600" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Excellent";
    if (score >= 7) return "Good";
    if (score >= 5) return "Fair";
    if (score >= 3) return "Needs Practice";
    return "Keep Trying";
  };

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
          description: `Your pronunciation score: ${data.accuracyScore}/10 - ${getScoreLabel(data.accuracyScore)}`,
        });
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try recording again. Make sure you speak clearly.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, originalText, toast, profile?.preferred_language]);

  React.useEffect(() => {
    if (audioBlob) {
      analyzeAudio();
    }
  }, [audioBlob, analyzeAudio]);

  const preferredLanguage = profile?.preferred_language || 'English';
  const translations = getSpeechAnalysisTranslations(preferredLanguage);

  const playOriginalAudio = () => {
    // This would integrate with text-to-speech for the original text
    toast({
      title: "Audio Playback",
      description: "Text-to-speech feature coming soon!",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="language-card border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Speech Analysis - {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Loading State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center">
                <p className="text-lg font-semibold">Analyzing your pronunciation...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Our AI is evaluating your speech patterns, accuracy, and fluency
                </p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Score Display */}
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {getScoreIcon(analysisResult.accuracyScore)}
                  <div className={`text-4xl font-bold ${getScoreColor(analysisResult.accuracyScore)}`}>
                    {analysisResult.accuracyScore}/10
                  </div>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-1">
                  {getScoreLabel(analysisResult.accuracyScore)}
                </Badge>
                <Progress 
                  value={analysisResult.accuracyScore * 10} 
                  className="mt-4 h-3"
                />
              </div>

              {/* Transcription */}
              {analysisResult.transcription && analysisResult.transcription !== "Silent" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-4 w-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">What we heard:</h4>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 italic">"{analysisResult.transcription}"</p>
                </div>
              )}

              {/* Original vs Transcription Comparison */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Original Text:</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">{originalText}</p>
                  <Button 
                    onClick={playOriginalAudio}
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-green-600 border-green-300"
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Listen
                  </Button>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Your Speech:</h4>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    {analysisResult.transcription || "No clear speech detected"}
                  </p>
                </div>
              </div>
              
              {/* Main Feedback */}
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {translations.feedback}:
                </h4>
                <p className="text-amber-700 dark:text-amber-300">{analysisResult.feedback}</p>
              </div>
              
              {/* Improvements */}
              {analysisResult.improvements && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    {translations.improvements}:
                  </h4>
                  <p className="text-orange-700 dark:text-orange-300">{analysisResult.improvements}</p>
                </div>
              )}
              
              {/* Encouragement */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {translations.encouragement}:
                </h4>
                <p className="text-green-700 dark:text-green-300 font-medium">{analysisResult.encouragement}</p>
              </div>

              {/* Detailed Analysis Toggle */}
              {analysisResult.detailedAnalysis && (
                <div className="text-center">
                  <Button 
                    onClick={() => setShowDetailedFeedback(!showDetailedFeedback)}
                    variant="outline"
                    className="w-full"
                  >
                    {showDetailedFeedback ? 'Hide' : 'Show'} Detailed Analysis
                  </Button>
                </div>
              )}

              {/* Detailed Feedback */}
              {showDetailedFeedback && analysisResult.detailedAnalysis && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold">Detailed Analysis</h3>
                  
                  <div className="grid gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold mb-1">Fluency Score</h5>
                      <div className="flex items-center gap-2">
                        <Progress value={analysisResult.detailedAnalysis.fluencyScore * 10} className="flex-1" />
                        <span className="font-medium">{analysisResult.detailedAnalysis.fluencyScore}/10</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold mb-1">Word Accuracy</h5>
                      <div className="flex items-center gap-2">
                        <Progress value={analysisResult.detailedAnalysis.wordAccuracy} className="flex-1" />
                        <span className="font-medium">{analysisResult.detailedAnalysis.wordAccuracy}%</span>
                      </div>
                    </div>

                    {analysisResult.detailedAnalysis.pronunciationErrors.length > 0 && (
                      <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <h5 className="font-semibold mb-2">Pronunciation Focus Areas</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {analysisResult.detailedAnalysis.pronunciationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold mb-1">Speed Analysis</h5>
                      <p className="text-sm">{analysisResult.detailedAnalysis.speedAnalysis}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <h5 className="font-semibold mb-1">Intonation Tips</h5>
                      <p className="text-sm">{analysisResult.detailedAnalysis.intonationTips}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeechRecorder;
