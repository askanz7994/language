
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const speakFeedback = useCallback(async (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        setIsSpeaking(true);
        
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        
        utterance.onerror = () => {
          setIsSpeaking(false);
          toast({
            title: "Speech failed",
            description: "Unable to read feedback aloud.",
            variant: "destructive",
          });
        };
        
        speechSynthesis.speak(utterance);
        
        toast({
          title: "Reading feedback",
          description: "Listening to pronunciation analysis...",
        });
      } catch (error) {
        console.error('Speech synthesis error:', error);
        setIsSpeaking(false);
        toast({
          title: "Speech failed",
          description: "Text-to-speech is not available.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

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
            language: 'malayalam'
          }
        });

        if (error) {
          throw error;
        }

        setAnalysisResult(data);
        toast({
          title: "Analysis complete",
          description: `Pronunciation score: ${data.accuracyScore}/10`,
        });

        // Automatically read the feedback aloud
        setTimeout(() => {
          const feedbackText = `Your pronunciation score is ${data.accuracyScore} out of 10. ${data.feedback}`;
          speakFeedback(feedbackText);
        }, 1000);
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      toast({
        title: "Analysis failed",
        description: "Please try recording again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, originalText, toast, speakFeedback]);

  // Automatically analyze when audioBlob changes
  React.useEffect(() => {
    if (audioBlob) {
      analyzeAudio();
    }
  }, [audioBlob, analyzeAudio]);

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
            <span>Analyzing your pronunciation...</span>
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
            
            {analysisResult.transcription && (
              <div className="word-card">
                <h4 className="font-semibold mb-2">What we heard:</h4>
                <p className="text-muted-foreground">{analysisResult.transcription}</p>
              </div>
            )}
            
            <div className="word-card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Feedback:</h4>
                <div className="flex gap-2">
                  {!isSpeaking ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => speakFeedback(`Your pronunciation score is ${analysisResult.accuracyScore} out of 10. ${analysisResult.feedback}`)}
                      className="flex items-center gap-1"
                    >
                      <Volume2 className="h-3 w-3" />
                      Listen
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={stopSpeaking}
                      className="flex items-center gap-1"
                    >
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground">{analysisResult.feedback}</p>
            </div>
            
            {analysisResult.improvements && (
              <div className="word-card">
                <h4 className="font-semibold mb-2">Areas for improvement:</h4>
                <p className="text-muted-foreground">{analysisResult.improvements}</p>
              </div>
            )}
            
            <div className="word-card bg-primary/10">
              <h4 className="font-semibold mb-2">Encouragement:</h4>
              <p className="text-primary">{analysisResult.encouragement}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
