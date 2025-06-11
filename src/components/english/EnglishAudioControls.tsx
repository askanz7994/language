
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
  const currentWordIndexRef = useRef(-1);
  const { toast } = useToast();

  const clearHighlighting = useCallback(() => {
    if (onWordHighlight) {
      onWordHighlight(-1);
    }
    currentWordIndexRef.current = -1;
  }, [onWordHighlight]);

  const readText = useCallback(async () => {
    setIsReading(true);
    clearHighlighting();
    
    try {
      // Split text into words, filtering out empty strings and cleaning punctuation
      const words = englishText.split(/\s+/).filter(word => word.trim() !== '');
      wordsRef.current = words;
      currentWordIndexRef.current = -1;
      
      console.log('Starting speech with words:', words);

      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.lang = 'en-US';
      utterance.rate = 0.7; // Slightly faster for better Android compatibility
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utteranceRef.current = utterance;

      // Enhanced boundary event handling for Android compatibility
      utterance.onboundary = (event) => {
        console.log('Boundary event:', event.name, 'at char:', event.charIndex, 'elapsed:', event.elapsedTime);
        
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          
          // More robust word index calculation
          let currentChar = 0;
          let wordIndex = -1;
          
          for (let i = 0; i < words.length; i++) {
            // Find the start of the current word in the original text
            const wordStart = englishText.indexOf(words[i], currentChar);
            const wordEnd = wordStart + words[i].length;
            
            if (charIndex >= wordStart && charIndex < wordEnd) {
              wordIndex = i;
              break;
            }
            
            currentChar = wordEnd;
          }
          
          // Only update if we found a valid word and it's different from current
          if (wordIndex >= 0 && wordIndex !== currentWordIndexRef.current && wordIndex < words.length) {
            currentWordIndexRef.current = wordIndex;
            console.log(`Highlighting word ${wordIndex}: "${words[wordIndex]}"`);
            
            if (onWordHighlight) {
              onWordHighlight(wordIndex);
            }
          }
        }
      };

      utterance.onstart = () => {
        console.log('Speech started');
        // Highlight first word when speech starts
        if (onWordHighlight && words.length > 0) {
          currentWordIndexRef.current = 0;
          onWordHighlight(0);
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

      // Wait a bit before starting speech for better Android compatibility
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 100);

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
