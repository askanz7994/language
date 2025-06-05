
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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const readText = useCallback(async () => {
    setIsReading(true);
    try {
      // Use Gemini to convert Malayalam text to phonetic pronunciation
      const { data, error } = await supabase.functions.invoke('gemini-phonetic-converter', {
        body: { text: malayalamText }
      });

      if (error) {
        console.error('Error getting phonetic conversion:', error);
        // Fallback to original text if conversion fails
        speakText(malayalamText);
        return;
      }

      const phoneticText = data?.phoneticText || malayalamText;
      speakText(phoneticText);

      toast({
        title: "Reading text",
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

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ml-IN';
    utterance.rate = 0.8;
    
    utteranceRef.current = utterance;
    
    utterance.onend = () => {
      setIsReading(false);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsReading(false);
      utteranceRef.current = null;
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    };

    speechSynthesis.speak(utterance);
  };

  const stopReading = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      setIsReading(false);
      utteranceRef.current = null;
    }
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
          Stop Reading
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
          Stop Recording
        </Button>
      )}
    </div>
  );
};

export default AudioControls;
