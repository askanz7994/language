
import { Button } from "@/components/ui/button";
import { Volume2, Square, Mic } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(-1);
  const { toast } = useToast();

  const clearHighlighting = useCallback(() => {
    if (onWordHighlight) {
      onWordHighlight(-1);
    }
    currentWordIndexRef.current = -1;
  }, [onWordHighlight]);

  const playWithGeminiTTS = useCallback(async () => {
    try {
      console.log('Attempting Gemini TTS...');
      
      const { data, error } = await supabase.functions.invoke('gemini-paragraph-tts', {
        body: { text: englishText }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error('Failed to call TTS function');
      }

      if (data?.success && data?.audioData) {
        console.log('Got audio data from Gemini, playing...');
        
        // Convert base64 audio data to blob and play
        const audioBytes = atob(data.audioData);
        const audioArray = new Uint8Array(audioBytes.length);
        for (let i = 0; i < audioBytes.length; i++) {
          audioArray[i] = audioBytes.charCodeAt(i);
        }
        
        const audioBlob = new Blob([audioArray], { type: data.mimeType || 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        // Simulate word highlighting during playback
        const words = englishText.split(/\s+/).filter(word => word.trim() !== '');
        wordsRef.current = words;
        
        audio.onplay = () => {
          console.log('Gemini audio started playing');
          if (onWordHighlight && words.length > 0) {
            currentWordIndexRef.current = 0;
            onWordHighlight(0);
          }
        };

        audio.onended = () => {
          console.log('Gemini audio ended');
          setIsReading(false);
          clearHighlighting();
          if (onReadingStop) onReadingStop();
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          console.error('Audio playback error');
          setIsReading(false);
          clearHighlighting();
          if (onReadingStop) onReadingStop();
          URL.revokeObjectURL(audioUrl);
          throw new Error('Audio playback failed');
        };

        // Start word highlighting simulation
        if (onWordHighlight && words.length > 0) {
          const wordsPerSecond = 2.5; // Estimated speaking rate
          const intervalMs = 1000 / wordsPerSecond;
          
          let wordIndex = 0;
          const highlightInterval = setInterval(() => {
            if (wordIndex < words.length && !audio.paused && !audio.ended) {
              currentWordIndexRef.current = wordIndex;
              onWordHighlight(wordIndex);
              wordIndex++;
            } else {
              clearInterval(highlightInterval);
            }
          }, intervalMs);
          
          audio.onended = () => {
            clearInterval(highlightInterval);
            setIsReading(false);
            clearHighlighting();
            if (onReadingStop) onReadingStop();
            URL.revokeObjectURL(audioUrl);
          };
        }
        
        await audio.play();
        return true; // Success
        
      } else if (data?.fallbackToWebSpeech) {
        console.log('Gemini TTS not available, falling back to Web Speech API');
        return false; // Fallback needed
      } else {
        throw new Error('Invalid response from TTS service');
      }
      
    } catch (error) {
      console.error('Gemini TTS error:', error);
      return false; // Fallback needed
    }
  }, [englishText, onWordHighlight, onReadingStop, clearHighlighting]);

  const playWithWebSpeechAPI = useCallback(async () => {
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
        setIsReading(false);
        utteranceRef.current = null;
        clearHighlighting();
        if (onReadingStop) onReadingStop();
      };

      utterance.onerror = (event) => {
        console.error('Web Speech error:', event);
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
      console.error('Error in Web Speech API:', error);
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

  const readText = useCallback(async () => {
    setIsReading(true);
    clearHighlighting();
    
    try {
      // Try Gemini TTS first, fallback to Web Speech API if needed
      const geminiSuccess = await playWithGeminiTTS();
      
      if (!geminiSuccess) {
        console.log('Falling back to Web Speech API');
        await playWithWebSpeechAPI();
      }
      
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
  }, [playWithGeminiTTS, playWithWebSpeechAPI, clearHighlighting, onReadingStop, toast]);

  const stopReading = useCallback(() => {
    // Stop Gemini audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    
    // Stop Web Speech API if active
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
    }
    
    setIsReading(false);
    clearHighlighting();
    if (onReadingStop) onReadingStop();
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
