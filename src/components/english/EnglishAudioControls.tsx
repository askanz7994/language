
import { Button } from "@/components/ui/button";
import { Volume2, Square, Mic } from "lucide-react";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGeminiTTS } from "@/hooks/useGeminiTTS";
import { useWebSpeechAPI } from "@/hooks/useWebSpeechAPI";
import { useAudioState } from "@/hooks/useAudioState";

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
  const { toast } = useToast();
  const { isReading, startReading, stopReading, clearHighlighting } = useAudioState(onWordHighlight);

  const { playWithGeminiTTS, stopGeminiTTS } = useGeminiTTS({
    onWordHighlight,
    onReadingStop: () => {
      stopReading();
      if (onReadingStop) onReadingStop();
    },
    clearHighlighting
  });

  const { playWithWebSpeechAPI, stopWebSpeechAPI } = useWebSpeechAPI({
    onWordHighlight,
    onReadingStop: () => {
      stopReading();
      if (onReadingStop) onReadingStop();
    },
    clearHighlighting
  });

  const readText = useCallback(async () => {
    startReading();
    
    try {
      // Try Gemini TTS first, fallback to Web Speech API if needed
      const geminiSuccess = await playWithGeminiTTS(englishText);
      
      if (!geminiSuccess) {
        console.log('Falling back to Web Speech API');
        await playWithWebSpeechAPI(englishText);
      }
      
    } catch (error) {
      console.error('Error in readText:', error);
      stopReading();
      if (onReadingStop) onReadingStop();
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [englishText, startReading, stopReading, playWithGeminiTTS, playWithWebSpeechAPI, onReadingStop, toast]);

  const stopReadingText = useCallback(() => {
    // Stop Gemini audio if playing
    stopGeminiTTS();
    
    // Stop Web Speech API if active
    stopWebSpeechAPI();
    
    stopReading();
    if (onReadingStop) onReadingStop();
    // No toast message when user manually stops listening
  }, [stopGeminiTTS, stopWebSpeechAPI, stopReading, onReadingStop]);

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
          onClick={stopReadingText}
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
