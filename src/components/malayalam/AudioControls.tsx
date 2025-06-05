
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
      // First, get phonetic pronunciation from Gemini
      const { data, error } = await supabase.functions.invoke('malayalam-tts', {
        body: {
          text: malayalamText,
          language: 'ml'
        }
      });

      if (error) {
        console.error('Gemini TTS error:', error);
        // Fallback to original text if Gemini fails
        speakText(malayalamText);
        return;
      }

      const phoneticText = data.phoneticText || malayalamText;
      console.log('Using phonetic text:', phoneticText);
      
      speakText(phoneticText);

      toast({
        title: "Reading Malayalam text",
        description: "Using improved pronunciation with Gemini AI.",
      });
    } catch (error) {
      console.error('Error getting phonetic text:', error);
      // Fallback to original text
      speakText(malayalamText);
    }
  }, [malayalamText, toast]);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Enhanced settings for better pronunciation
    utterance.rate = 0.7; // Slower for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1;
    
    // Try to use a voice that handles Malayalam better
    const voices = speechSynthesis.getVoices();
    const malayalamVoice = voices.find(voice => 
      voice.lang.includes('ml') || voice.lang.includes('hi') || voice.lang.includes('en-IN')
    );
    
    if (malayalamVoice) {
      utterance.voice = malayalamVoice;
      utterance.lang = malayalamVoice.lang;
    } else {
      utterance.lang = 'en-IN'; // Indian English as fallback
    }
    
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
    <div className="flex gap-4 justify-center mb-6 p-4 bg-muted/30 rounded-lg">
      {!isReading ? (
        <Button
          onClick={readText}
          className="glow-button flex items-center gap-2"
          disabled={isRecording}
        >
          <Volume2 className="h-4 w-4" />
          Read Text
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
          Start Recording
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
