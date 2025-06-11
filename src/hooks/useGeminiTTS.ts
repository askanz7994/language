
import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseGeminiTTSProps {
  onWordHighlight?: (wordIndex: number) => void;
  onReadingStop?: () => void;
  clearHighlighting: () => void;
}

export const useGeminiTTS = ({ onWordHighlight, onReadingStop, clearHighlighting }: UseGeminiTTSProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wordsRef = useRef<string[]>([]);

  const playWithGeminiTTS = useCallback(async (englishText: string) => {
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
            onWordHighlight(0);
          }
        };

        audio.onended = () => {
          console.log('Gemini audio ended');
          clearHighlighting();
          if (onReadingStop) onReadingStop();
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          console.error('Audio playback error');
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
              onWordHighlight(wordIndex);
              wordIndex++;
            } else {
              clearInterval(highlightInterval);
            }
          }, intervalMs);
          
          audio.onended = () => {
            clearInterval(highlightInterval);
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
  }, [onWordHighlight, onReadingStop, clearHighlighting]);

  const stopGeminiTTS = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  return {
    playWithGeminiTTS,
    stopGeminiTTS
  };
};
