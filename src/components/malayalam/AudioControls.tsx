
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
  onWordHighlight?: (wordIndex: number) => void;
  onReadingStop?: () => void;
}

interface TimingData {
  word: string;
  startTime: number;
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
  const [isLoadingTiming, setIsLoadingTiming] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const highlightTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const { toast } = useToast();

  const clearAllTimeouts = useCallback(() => {
    highlightTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    highlightTimeoutRefs.current = [];
    if (wordTimerRef.current) {
      clearInterval(wordTimerRef.current);
      wordTimerRef.current = null;
    }
  }, []);

  const readText = useCallback(async () => {
    setIsReading(true);
    setIsLoadingTiming(true);
    
    try {
      // Get timing data from Gemini
      const { data: timingResponse, error } = await supabase.functions.invoke('gemini-tts', {
        body: { text: malayalamText, language: 'ml-IN' }
      });

      setIsLoadingTiming(false);

      if (error || !timingResponse?.success) {
        console.error('Timing generation error:', error);
        toast({
          title: "Timing generation failed",
          description: "Using fallback timing. Audio will still work.",
          variant: "destructive",
        });
      }

      const words = malayalamText.split(/\s+/);
      const timingData: TimingData[] = timingResponse?.timingData || 
        words.map((word, index) => ({ word, startTime: index * 400 }));

      // Create and configure speech utterance
      const utterance = new SpeechSynthesisUtterance(malayalamText);
      utterance.lang = 'ml-IN';
      utterance.rate = 0.7;
      utterance.pitch = 1;
      
      utteranceRef.current = utterance;

      // Set up word highlighting based on timing data
      utterance.onstart = () => {
        console.log('Speech started, setting up word highlighting');
        
        if (onWordHighlight && words.length > 0) {
          // Highlight first word immediately
          onWordHighlight(0);
          
          // Schedule highlights for remaining words
          timingData.slice(1).forEach((timing, index) => {
            const wordIndex = index + 1;
            const timeout = setTimeout(() => {
              if (onWordHighlight && wordIndex < words.length) {
                onWordHighlight(wordIndex);
              }
            }, timing.startTime);
            
            highlightTimeoutRefs.current.push(timeout);
          });
        }
      };

      utterance.onend = () => {
        console.log('Speech ended');
        setIsReading(false);
        utteranceRef.current = null;
        clearAllTimeouts();
        if (onReadingStop) onReadingStop();
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsReading(false);
        utteranceRef.current = null;
        clearAllTimeouts();
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
        description: "Listen carefully to the pronunciation with improved timing.",
      });

    } catch (error) {
      console.error('Error in readText:', error);
      setIsReading(false);
      setIsLoadingTiming(false);
      if (onReadingStop) onReadingStop();
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [malayalamText, toast, onWordHighlight, onReadingStop, clearAllTimeouts]);

  const stopReading = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      setIsReading(false);
      utteranceRef.current = null;
      clearAllTimeouts();
      if (onReadingStop) onReadingStop();
    }
  }, [onReadingStop, clearAllTimeouts]);

  return (
    <div className="flex gap-4 justify-center mb-6">
      {!isReading ? (
        <Button
          onClick={readText}
          className="glow-button flex items-center gap-2"
          disabled={isRecording || isLoadingTiming}
        >
          <Volume2 className="h-4 w-4" />
          {isLoadingTiming ? "Preparing..." : "Listen Text"}
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
