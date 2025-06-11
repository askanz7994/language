
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
  const wordsRef = useRef<string[]>([]);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const clearHighlighting = useCallback(() => {
    if (onWordHighlight) {
      onWordHighlight(-1);
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, [onWordHighlight]);

  // Fallback highlighting for Android devices
  const startFallbackHighlighting = useCallback((words: string[], duration: number) => {
    if (!onWordHighlight || words.length === 0) return;
    
    const timePerWord = duration / words.length;
    let currentWordIndex = 0;
    
    const highlightNextWord = () => {
      if (currentWordIndex < words.length) {
        console.log(`Fallback highlighting word ${currentWordIndex}: "${words[currentWordIndex]}"`);
        onWordHighlight(currentWordIndex);
        currentWordIndex++;
        
        if (currentWordIndex < words.length) {
          fallbackTimerRef.current = setTimeout(highlightNextWord, timePerWord);
        }
      }
    };
    
    // Start with first word
    onWordHighlight(0);
    if (words.length > 1) {
      fallbackTimerRef.current = setTimeout(highlightNextWord, timePerWord);
    }
  }, [onWordHighlight]);

  const readText = useCallback(async () => {
    setIsReading(true);
    
    try {
      // Split text into words, filtering out empty strings
      const words = englishText.split(/\s+/).filter(word => word.trim() !== '');
      wordsRef.current = words;
      
      console.log('Starting speech with words:', words);

      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.lang = 'en-US';
      utterance.rate = 0.6; // Slower rate for better word tracking
      utterance.pitch = 1;
      
      utteranceRef.current = utterance;

      // Track current word index
      let currentWordIndex = 0;
      let boundaryEventWorking = false;
      
      // Estimate duration for fallback (rough calculation)
      const estimatedDuration = (words.length / utterance.rate) * 1000 * 0.6; // Conservative estimate

      utterance.onboundary = (event) => {
        // Only process word boundaries
        if (event.name === 'word') {
          boundaryEventWorking = true;
          const charIndex = event.charIndex;
          
          // Find which word we're currently on based on character position
          let charCount = 0;
          let wordIndex = 0;
          
          for (let i = 0; i < words.length; i++) {
            if (charCount <= charIndex && charIndex < charCount + words[i].length) {
              wordIndex = i;
              break;
            }
            charCount += words[i].length + 1; // +1 for space
          }
          
          if (wordIndex !== currentWordIndex && onWordHighlight) {
            currentWordIndex = wordIndex;
            console.log(`Highlighting word ${currentWordIndex}: "${words[currentWordIndex]}"`);
            onWordHighlight(currentWordIndex);
          }
        }
      };

      utterance.onstart = () => {
        console.log('Speech started');
        // Highlight first word when speech starts
        if (onWordHighlight && words.length > 0) {
          onWordHighlight(0);
        }
        
        // Start fallback timer for Android compatibility
        setTimeout(() => {
          if (!boundaryEventWorking) {
            console.log('Boundary events not working, using fallback highlighting');
            startFallbackHighlighting(words, estimatedDuration);
          }
        }, 500); // Give boundary events time to start working
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
  }, [englishText, toast, onWordHighlight, onReadingStop, clearHighlighting, startFallbackHighlighting]);

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
