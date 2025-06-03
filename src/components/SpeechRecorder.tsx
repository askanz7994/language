
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Volume2, Loader2, Square } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import RealTimeText from './RealTimeText';

interface SpeechRecorderProps {
  originalText: string;
  title: string;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title }) => {
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const analyzeRecording = useCallback(async () => {
    if (audioChunksRef.current.length === 0) return;

    try {
      setIsAnalyzing(true);
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
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

        if (!error && data) {
          setFeedback(data.feedback || 'No feedback available');
          toast({
            title: "Analysis complete",
            description: "Check the pronunciation feedback below.",
          });
        } else {
          toast({
            title: "Analysis failed",
            description: "Unable to analyze pronunciation. Please try again.",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [originalText, toast]);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setFeedback(''); // Clear previous feedback

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        analyzeRecording();
      };

      mediaRecorder.start(1000);
      setIsListening(true);
      
      toast({
        title: "Started listening",
        description: "Begin reading the Malayalam text aloud.",
      });
    } catch (error) {
      console.error('Error starting microphone:', error);
      toast({
        title: "Microphone access failed",
        description: "Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  }, [toast, analyzeRecording]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      
      toast({
        title: "Stopped listening",
        description: "Analyzing your pronunciation...",
      });
    }
  }, [isListening, toast]);

  const readText = useCallback(async () => {
    setIsReading(true);
    try {
      const utterance = new SpeechSynthesisUtterance(originalText);
      utterance.lang = 'ml-IN';
      utterance.rate = 0.7;
      
      utterance.onend = () => {
        setIsReading(false);
      };

      utterance.onerror = () => {
        setIsReading(false);
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

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Real-time Pronunciation Practice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={readText}
            className="glow-button flex items-center gap-2"
            disabled={isReading || isListening || isAnalyzing}
          >
            {isReading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Reading...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Listen
              </>
            )}
          </Button>

          {!isListening ? (
            <Button
              onClick={startListening}
              className="glow-button flex items-center gap-2"
              disabled={isReading || isAnalyzing}
            >
              <Mic className="h-4 w-4" />
              Start Reading
            </Button>
          ) : (
            <Button
              onClick={stopListening}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Reading
            </Button>
          )}
        </div>

        {/* Real-time Text Display */}
        <RealTimeText 
          text={originalText} 
          isListening={isListening}
          feedback={feedback}
        />

        {/* Analysis Status */}
        {isAnalyzing && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
              <h4 className="font-semibold text-yellow-800">Analyzing pronunciation...</h4>
            </div>
            <p className="text-yellow-700">Please wait while we analyze your recording.</p>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Click "Listen" to hear the correct pronunciation, then "Start Reading" to practice
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
