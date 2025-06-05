
import { Button } from "@/components/ui/button";
import { Volume2, Square } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface AudioFeedbackProps {
  text: string;
  title: string;
  language?: string;
}

const AudioFeedback = ({ text, title, language = 'en' }: AudioFeedbackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const playFeedback = useCallback(async () => {
    if (!text) return;

    setIsPlaying(true);
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'malayalam' ? 'ml-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      
      utteranceRef.current = utterance;
      
      utterance.onend = () => {
        setIsPlaying(false);
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        utteranceRef.current = null;
        toast({
          title: "Playback failed",
          description: "Please try again.",
          variant: "destructive",
        });
      };

      speechSynthesis.speak(utterance);

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
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      utteranceRef.current = null;
    }
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
