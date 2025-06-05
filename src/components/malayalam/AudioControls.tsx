
import { Button } from "@/components/ui/button";
import { Volume2, Square, Mic } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface AudioControlsProps {
  malayalamText: string;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onWordHighlight?: (wordIndex: number) => void;
  onReadingStop?: () => void;
}

const AudioControls = ({ 
  malayalamText, 
  isRecording, 
  onStartRecording, 
  onStopRecording,
  onWordHighlight,
  onReadingStop
}: AudioControlsProps) => {
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const readText = useCallback(async () => {
    setIsReading(true);
    try {
      const words = malayalamText.split(' ');
      let currentWordIndex = 0;

      const utterance = new SpeechSynthesisUtterance(malayalamText);
      utterance.lang = 'ml-IN';
      utterance.rate = 0.7; // Increased from 0.6 to 0.7 (added 0.1)
      
      utteranceRef.current = utterance;
      
      // Better word timing calculation for Malayalam
      const wordsPerMinute = 95; // Increased from 80 to match the faster rate
      const millisecondsPerWord = (60 / wordsPerMinute) * 1000;
      
      // Start word highlighting immediately when speech starts
      utterance.onstart = () => {
        currentWordIndex = 0;
        if (onWordHighlight && words.length > 0) {
          onWordHighlight(0);
          currentWordIndex = 1;
        }
        
        // Set up word highlighting timer
        wordTimerRef.current = setInterval(() => {
          if (currentWordIndex < words.length && onWordHighlight) {
            onWordHighlight(currentWordIndex);
            currentWordIndex++;
          } else if (wordTimerRef.current) {
            clearInterval(wordTimerRef.current);
            wordTimerRef.current = null;
          }
        }, millisecondsPerWord);
      };

      utterance.onend = () => {
        setIsReading(false);
        utteranceRef.current = null;
        if (wordTimerRef.current) {
          clearInterval(wordTimerRef.current);
          wordTimerRef.current = null;
        }
        if (onReadingStop) onReadingStop();
      };

      utterance.onerror = () => {
        setIsReading(false);
        utteranceRef.current = null;
        if (wordTimerRef.current) {
          clearInterval(wordTimerRef.current);
          wordTimerRef.current = null;
        }
        if (onReadingStop) onReadingStop();
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
      if (onReadingStop) onReadingStop();
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [malayalamText, toast, onWordHighlight, onReadingStop]);

  const stopReading = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      setIsReading(false);
      utteranceRef.current = null;
      if (wordTimerRef.current) {
        clearInterval(wordTimerRef.current);
        wordTimerRef.current = null;
      }
      if (onReadingStop) onReadingStop();
    }
  }, [onReadingStop]);

  return (
    <div className="flex gap-4 justify-center mb-6">
      {!isReading ? (
        <Button
          onClick={readText}
          className="glow-button flex items-center gap-2"
          disabled={isRecording}
        >
          <Volume2 className="h-4 w-4" />
          Listen Text
        </Button>
      ) : (
        <Button
          onClick={stopReading}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Square className="h-4 w-4" />
          Stop Listening
        </Button>
      )}

      {!isRecording ? (
        <Button
          onClick={onStartRecording}
          className="glow-button flex items-center gap-2"
          disabled={isReading}
        >
          <Mic className="h-4 w-4" />
          Start Reading
        </Button>
      ) : (
        <Button
          onClick={onStopRecording}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Square className="h-4 w-4" />
          Stop Reading
        </Button>
      )}
    </div>
  );
};

export default AudioControls;
