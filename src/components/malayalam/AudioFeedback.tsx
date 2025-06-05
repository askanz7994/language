
import { Button } from "@/components/ui/button";
import { Volume2, Square } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AudioFeedbackProps {
  text: string;
  title: string;
  language?: string;
}

const AudioFeedback = ({ text, title, language = 'en' }: AudioFeedbackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const playFeedback = useCallback(async () => {
    if (!text) return;

    setIsPlaying(true);
    try {
      // Use Gemini for Malayalam text, Web Speech API for English
      if (language === 'malayalam') {
        const { data, error } = await supabase.functions.invoke('gemini-text-to-speech', {
          body: {
            text: text,
            language: 'malayalam'
          }
        });

        if (error) {
          throw error;
        }

        // For now, fall back to Web Speech API but with Malayalam settings
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ml-IN';
        utterance.rate = 0.7; // Slower for better Malayalam pronunciation
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          toast({
            title: "Playback failed",
            description: "Please try again.",
            variant: "destructive",
          });
        };

        speechSynthesis.speak(utterance);
      } else {
        // Use Web Speech API for English text
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          toast({
            title: "Playback failed",
            description: "Please try again.",
            variant: "destructive",
          });
        };

        speechSynthesis.speak(utterance);
      }

      toast({
        title: `Playing ${title}`,
        description: "Listen to the feedback audio.",
      });
    } catch (error) {
      console.error('Error playing feedback:', error);
      setIsPlaying(false);
      toast({
        title: "Playback failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [text, title, language, toast]);

  const stopFeedback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return (
    <div className="flex justify-center mt-2">
      {!isPlaying ? (
        <Button
          onClick={playFeedback}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
        >
          <Volume2 className="h-3 w-3" />
          Listen
        </Button>
      ) : (
        <Button
          onClick={stopFeedback}
          variant="destructive"
          size="sm"
          className="flex items-center gap-1 text-xs"
        >
          <Square className="h-3 w-3" />
          Stop
        </Button>
      )}
    </div>
  );
};

export default AudioFeedback;
