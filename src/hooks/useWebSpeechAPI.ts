
import { useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseWebSpeechAPIProps {
  onWordHighlight?: (wordIndex: number) => void;
  onReadingStop?: () => void;
  clearHighlighting: () => void;
}

export const useWebSpeechAPI = ({ onWordHighlight, onReadingStop, clearHighlighting }: UseWebSpeechAPIProps) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(-1);
  const { toast } = useToast();

  const playWithWebSpeechAPI = useCallback(async (englishText: string) => {
    try {
      // Split text into words, filtering out empty strings and cleaning punctuation
      const words = englishText.split(/\s+/).filter(word => word.trim() !== '');
      wordsRef.current = words;
      currentWordIndexRef.current = -1;
      
      console.log('Starting Web Speech API with words:', words);

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
        console.log('Web Speech started');
        // Highlight first word when speech starts
        if (onWordHighlight && words.length > 0) {
          currentWordIndexRef.current = 0;
          onWordHighlight(0);
        }
      };

      utterance.onend = () => {
        console.log('Web Speech ended');
        utteranceRef.current = null;
        clearHighlighting();
        if (onReadingStop) onReadingStop();
      };

      utterance.onerror = (event) => {
        console.error('Web Speech error:', event);
        utteranceRef.current = null;
        clearHighlighting();
        if (onReadingStop) onReadingStop();
        // Don't show error toast when manually stopped - properly check error codes
        if (event.error !== 'aborted' as any && event.error !== 'interrupted' as any) {
          toast({
            title: "Reading failed",
            description: "Please try again.",
            variant: "destructive",
          });
        }
      };

      // Wait a bit before starting speech for better Android compatibility
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 100);

    } catch (error) {
      console.error('Error in Web Speech API:', error);
      clearHighlighting();
      if (onReadingStop) onReadingStop();
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [onWordHighlight, onReadingStop, clearHighlighting, toast]);

  const stopWebSpeechAPI = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
    }
  }, []);

  return {
    playWithWebSpeechAPI,
    stopWebSpeechAPI
  };
};
