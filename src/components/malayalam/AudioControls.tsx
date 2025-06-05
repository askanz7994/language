
import { Button } from "@/components/ui/button";
import { Volume2, Square, Mic } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AudioControlsProps {
  malayalamText: string;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const AudioControls = ({ 
  malayalamText, 
  isRecording, 
  onStartRecording, 
  onStopRecording 
}: AudioControlsProps) => {
  const [isReading, setIsReading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const readText = useCallback(async () => {
    setIsReading(true);
    try {
      // Use Gemini for better Malayalam pronunciation
      const { data, error } = await supabase.functions.invoke('gemini-text-to-speech', {
        body: {
          text: malayalamText,
          language: 'malayalam'
        }
      });

      if (error) {
        console.error('Gemini TTS error:', error);
        // Fall back to Web Speech API with optimized Malayalam settings
        const utterance = new SpeechSynthesisUtterance(malayalamText);
        utterance.lang = 'ml-IN';
        utterance.rate = 0.7; // Slower for better pronunciation
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsReading(false);
        };

        utterance.onerror = () => {
          setIsReading(false);
          toast({
            title: "Reading failed",
            description: "Please try again.",
            variant: "destructive",
          });
        };

        speechSynthesis.speak(utterance);
      } else {
        // For now, still use Web Speech API but with better settings
        // TODO: When Gemini audio generation is available, use the returned audio
        const utterance = new SpeechSynthesisUtterance(malayalamText);
        utterance.lang = 'ml-IN';
        utterance.rate = 0.7; // Slower rate for better Malayalam pronunciation
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsReading(false);
        };

        utterance.onerror = () => {
          setIsReading(false);
          toast({
            title: "Reading failed",
            description: "Please try again.",
            variant: "destructive",
          });
        };

        speechSynthesis.speak(utterance);
      }

      toast({
        title: "Reading Malayalam text",
        description: "Listen carefully to the pronunciation.",
      });
    } catch (error) {
      console.error('Error reading text:', error);
      setIsReading(false);
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [malayalamText, toast]);

  const stopReading = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    speechSynthesis.cancel();
    setIsReading(false);
  }, []);

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
