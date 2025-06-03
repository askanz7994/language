
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Volume2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SpeechRecorderProps {
  originalText: string;
  title: string;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title }) => {
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [liveFeedback, setLiveFeedback] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const feedbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const provideLiveFeedback = useCallback(async (audioChunks: Blob[]) => {
    if (audioChunks.length === 0) return;

    try {
      setIsProcessing(true);
      const tempBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('analyze-pronunciation', {
          body: {
            audioBase64: base64Audio,
            originalText: originalText,
            language: 'malayalam',
            isLiveCorrection: true
          }
        });

        if (!error && data) {
          setLiveFeedback(data.feedback || 'Keep reading...');
        }
      };
      reader.readAsDataURL(tempBlob);
    } catch (error) {
      console.error('Live feedback error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalText]);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setLiveFeedback('Start reading the Malayalam text...');

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        setLiveFeedback('');
        stream.getTracks().forEach(track => track.stop());
        if (feedbackIntervalRef.current) {
          clearInterval(feedbackIntervalRef.current);
          feedbackIntervalRef.current = null;
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsListening(true);

      // Provide feedback every 3 seconds
      feedbackIntervalRef.current = setInterval(() => {
        if (audioChunksRef.current.length > 0) {
          provideLiveFeedback([...audioChunksRef.current]);
        }
      }, 3000);
      
      toast({
        title: "Started listening",
        description: "Begin reading the Malayalam text. You'll receive real-time feedback.",
      });
    } catch (error) {
      console.error('Error starting microphone:', error);
      toast({
        title: "Microphone access failed",
        description: "Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  }, [toast, provideLiveFeedback]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(false);
      
      if (feedbackIntervalRef.current) {
        clearInterval(feedbackIntervalRef.current);
        feedbackIntervalRef.current = null;
      }
      
      toast({
        title: "Stopped listening",
        description: "Practice session completed.",
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
            disabled={isReading || isListening}
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
              disabled={isReading}
            >
              <Mic className="h-4 w-4" />
              Start Reading Practice
            </Button>
          ) : (
            <Button
              onClick={stopListening}
              variant="destructive"
              className="flex items-center gap-2"
            >
              Stop Practice
            </Button>
          )}
        </div>

        {/* Live Feedback */}
        {isListening && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <h4 className="font-semibold text-blue-800">Live Feedback:</h4>
              {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
            </div>
            <p className="text-blue-700">
              {liveFeedback || "Listening... Start reading the text aloud."}
            </p>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Click "Listen" to hear the correct pronunciation, then "Start Reading Practice" for real-time feedback
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
