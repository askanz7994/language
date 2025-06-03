
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [incorrectWords, setIncorrectWords] = useState<number[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const feedbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordProgressRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const words = originalText.split(' ');

  const simulateWordProgress = useCallback(() => {
    let wordIndex = 0;
    const progressInterval = setInterval(() => {
      if (wordIndex < words.length && isListening) {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
      } else {
        setCurrentWordIndex(-1);
        clearInterval(progressInterval);
      }
    }, 2000); // Change word every 2 seconds

    wordProgressRef.current = progressInterval;
  }, [words.length, isListening]);

  const analyzePronunciation = useCallback(async (audioChunks: Blob[]) => {
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

        if (!error && data && data.feedback) {
          // Parse feedback to identify incorrect words
          const feedback = data.feedback;
          // Simple logic to mark words as incorrect based on feedback
          if (feedback.includes('അല്ല')) {
            // Mark current word as incorrect
            setIncorrectWords(prev => [...prev, currentWordIndex]);
          }
        }
      };
      reader.readAsDataURL(tempBlob);
    } catch (error) {
      console.error('Pronunciation analysis error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalText, currentWordIndex]);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setIncorrectWords([]); // Reset incorrect words
      setCurrentWordIndex(-1);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (feedbackIntervalRef.current) {
          clearInterval(feedbackIntervalRef.current);
          feedbackIntervalRef.current = null;
        }
        if (wordProgressRef.current) {
          clearInterval(wordProgressRef.current);
          wordProgressRef.current = null;
        }
        setCurrentWordIndex(-1);
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsListening(true);

      // Start word progress simulation
      simulateWordProgress();

      // Analyze pronunciation every 3 seconds
      feedbackIntervalRef.current = setInterval(() => {
        if (audioChunksRef.current.length > 0) {
          analyzePronunciation([...audioChunksRef.current]);
        }
      }, 3000);
      
      toast({
        title: "Started listening",
        description: "Begin reading the Malayalam text. Incorrect words will be highlighted in red.",
      });
    } catch (error) {
      console.error('Error starting microphone:', error);
      toast({
        title: "Microphone access failed",
        description: "Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  }, [toast, simulateWordProgress, analyzePronunciation]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(false);
      setCurrentWordIndex(-1);
      
      if (feedbackIntervalRef.current) {
        clearInterval(feedbackIntervalRef.current);
        feedbackIntervalRef.current = null;
      }
      
      if (wordProgressRef.current) {
        clearInterval(wordProgressRef.current);
        wordProgressRef.current = null;
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

  const renderTextWithHighlights = () => {
    return words.map((word, index) => {
      const isCurrentWord = index === currentWordIndex;
      const isIncorrect = incorrectWords.includes(index);
      
      let className = 'inline-block mr-2 transition-all duration-300';
      
      if (isCurrentWord) {
        className += ' underline decoration-2 decoration-blue-500';
      }
      
      if (isIncorrect) {
        className += ' text-red-500 font-bold';
      }
      
      return (
        <span key={index} className={className}>
          {word}
        </span>
      );
    });
  };

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

        {/* Text with real-time highlights */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="text-lg leading-relaxed">
            {renderTextWithHighlights()}
          </div>
        </div>

        {/* Status indicator */}
        {isListening && (
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Listening... {isProcessing && "Processing..."}
            </span>
            {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Click "Listen" to hear the correct pronunciation, then "Start Reading Practice" for real-time feedback. 
          Incorrect words will be highlighted in red, and the current word being listened to will be underlined.
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
