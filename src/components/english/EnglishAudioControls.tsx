
import { Button } from "@/components/ui/button";
import { Volume2, Square, Mic } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface EnglishAudioControlsProps {
  englishText: string;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onWordHighlight?: (wordIndex: number) => void;
  onReadingStop?: () => void;
}

const EnglishAudioControls = ({ 
  englishText, 
  isRecording, 
  onStartRecording, 
  onStopRecording,
  onWordHighlight,
  onReadingStop
}: EnglishAudioControlsProps) => {
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentWordIndexRef = useRef<number>(0);
  const wordsRef = useRef<string[]>([]);
  const { toast } = useToast();

  const clearHighlighting = useCallback(() => {
    currentWordIndexRef.current = 0;
    if (onWordHighlight) {
      onWordHighlight(-1);
    }
  }, [onWordHighlight]);

  const readText = useCallback(async () => {
    setIsReading(true);
    
    try {
      const words = englishText.split(/\s+/);
      wordsRef.current = words;
      currentWordIndexRef.current = 0;

      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      utterance.pitch = 1;
      
      utteranceRef.current = utterance;

      utterance.onboundary = (event) => {
        if (event.name === 'word' && onWordHighlight) {
          const currentIndex = currentWordIndexRef.current;
          if (currentIndex < words.length) {
            console.log('Highlighting word:', currentIndex, words[currentIndex]);
            onWordHighlight(currentIndex);
            currentWordIndexRef.current++;
          }
        }
      };

      utterance.onstart = () => {
        console.log('Speech started');
        if (onWordHighlight && words.length > 0) {
          onWordHighlight(0);
          currentWordIndexRef.current = 1;
        }
      };

      utterance.onend = () => {
        console.log('Speech ended');
        setIsReading(false);
        utteranceRef.current = null;
        clearHighlighting();
        if (onReadingStop) onReadingStop();
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsReading(false);
        utteranceRef.current = null;
        clearHighlighting();
        if (onReadingStop) onReadingStop();
        toast({
          title: "Reading failed",
          description: "Please try again.",
          variant: "destructive",
        });
      };

      speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('Error in readText:', error);
      setIsReading(false);
      clearHighlighting();
      if (onReadingStop) onReadingStop();
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [englishText, toast, onWordHighlight, onReadingStop, clearHighlighting]);

  const stopReading = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      setIsReading(false);
      utteranceRef.current = null;
      clearHighlighting();
      if (onReadingStop) onReadingStop();
    }
  }, [onReadingStop, clearHighlighting]);

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

export default EnglishAudioControls;
