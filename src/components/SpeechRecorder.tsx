import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Square, Play, Loader2, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SpeechRecorderProps {
  originalText: string;
  title: string;
}

interface AnalysisResult {
  transcription: string;
  accuracyScore: number;
  feedback: string;
  improvements: string;
  encouragement: string;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        
        // Automatically analyze after recording stops
        await analyzeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Start reading the Malayalam text aloud.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Processing your pronunciation...",
      });
    }
  }, [isRecording, toast]);

  const readText = useCallback(async () => {
    setIsReading(true);
    try {
      const utterance = new SpeechSynthesisUtterance(originalText);
      utterance.lang = 'ml-IN'; // Malayalam language code
      utterance.rate = 0.8; // Slower rate for learning
      
      utteranceRef.current = utterance;
      
      utterance.onend = () => {
        setIsReading(false);
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsReading(false);
        utteranceRef.current = null;
        toast({
          title: "Reading failed",
          description: "Please try again.",
          variant: "destructive",
        });
      };

      speechSynthesis.speak(utterance);

      toast({
        title: "Reading text",
        description: "Listen carefully to the pronunciation.",
      });
    } catch (error) {
      console.error('Error reading text:', error);
      setIsReading(false);
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [originalText, toast]);

  const stopReading = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      setIsReading(false);
      utteranceRef.current = null;
      
      toast({
        title: "Reading stopped",
        description: "Text reading has been stopped.",
      });
    }
  }, [toast]);

  const analyzeAudio = useCallback(async (audioToAnalyze?: Blob) => {
    const audioData = audioToAnalyze || audioBlob;
    if (!audioData) return;

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
      };
      reader.readAsDataURL(audioData);
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
  }, [audioBlob, originalText, toast]);

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Speech Practice - {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reading and Recording Controls moved to content section */}
        <div className="flex gap-4 justify-center mb-6">
          {!isReading ? (
            <Button
              onClick={readText}
              className="glow-button flex items-center gap-2"
              disabled={isRecording}
            >
              <Volume2 className="h-4 w-4" />
              Read Text
            </Button>
          ) : (
            <Button
              onClick={stopReading}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Reading
            </Button>
          )}

          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="glow-button flex items-center gap-2"
              disabled={isAnalyzing || isReading}
            >
              <Mic className="h-4 w-4" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Recording
            </Button>
          )}
        </div>

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
              <h4 className="font-semibold mb-2">Feedback:</h4>
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
