
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
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const { toast } = useToast();

  const clearHighlighting = useCallback(() => {
    // Clear all existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    if (onWordHighlight) {
      onWordHighlight(-1); // Clear all highlighting
    }
  }, [onWordHighlight]);

  const readText = useCallback(async () => {
    setIsReading(true);
    clearHighlighting();
    
    try {
      // Split text into words
      const words = malayalamText.split(/\s+/);
      
      // Create and configure speech utterance
      const utterance = new SpeechSynthesisUtterance(malayalamText);
      utterance.lang = 'ml-IN';
      utterance.rate = 0.7; // Slightly faster for better timing
      utterance.pitch = 1;
      
      utteranceRef.current = utterance;

      // Calculate timing based on speech rate
      const averageWordDuration = 600; // milliseconds per word for Malayalam
      const startDelay = 300; // Initial delay before first word

      // Set up word highlighting timeouts
      words.forEach((word, index) => {
        const highlightTime = startDelay + (index * averageWordDuration);
        
        const timeoutId = setTimeout(() => {
          if (onWordHighlight && utteranceRef.current) {
            console.log(`Highlighting word ${index}: ${word}`);
            onWordHighlight(index);
          }
        }, highlightTime);
        
        timeoutRefs.current.push(timeoutId);
      });

      // Clear highlighting when speech ends
      const totalDuration = startDelay + (words.length * averageWordDuration) + 1000;
      const clearTimeoutId = setTimeout(() => {
        clearHighlighting();
      }, totalDuration);
      timeoutRefs.current.push(clearTimeoutId);

      utterance.onstart = () => {
        console.log('Speech started');
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

      // Start speech synthesis
      speechSynthesis.speak(utterance);

      toast({
        title: "Reading text",
        description: "Listen carefully to the pronunciation with word highlighting.",
      });

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
  }, [malayalamText, toast, onWordHighlight, onReadingStop, clearHighlighting]);

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

export default AudioControls;
