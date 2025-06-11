
import { Button } from "@/components/ui/button";
import { Volume2, Square, Mic } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { WordTiming } from "@/data/englishTopicData";

interface EnglishAudioPlayerProps {
  englishText: string;
  audioFile?: string;
  wordTimings?: WordTiming[];
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onWordHighlight?: (wordIndex: number) => void;
  onReadingStop?: () => void;
}

const EnglishAudioPlayer = ({ 
  englishText, 
  audioFile,
  wordTimings,
  isRecording, 
  onStartRecording, 
  onStopRecording,
  onWordHighlight,
  onReadingStop
}: EnglishAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();
  const { toast } = useToast();

  const clearHighlighting = useCallback(() => {
    if (onWordHighlight) {
      onWordHighlight(-1);
    }
  }, [onWordHighlight]);

  // Update word highlighting based on current time
  useEffect(() => {
    if (isPlaying && wordTimings && onWordHighlight) {
      const currentWordIndex = wordTimings.findIndex(
        (timing) => currentTime >= timing.startTime && currentTime <= timing.endTime
      );
      
      if (currentWordIndex !== -1) {
        onWordHighlight(currentWordIndex);
      }
    }
  }, [currentTime, isPlaying, wordTimings, onWordHighlight]);

  // Animation loop to update current time
  const updateTime = useCallback(() => {
    if (audioRef.current && isPlaying) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateTime);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateTime);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, updateTime]);

  const playAudio = useCallback(async () => {
    if (!audioFile) {
      // Fallback to speech synthesis if no audio file
      const utterance = new SpeechSynthesisUtterance(englishText);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        clearHighlighting();
        if (onReadingStop) onReadingStop();
      };
      
      speechSynthesis.speak(utterance);
      return;
    }

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioFile);
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setCurrentTime(0);
          clearHighlighting();
          if (onReadingStop) onReadingStop();
        };
        
        audioRef.current.onerror = () => {
          console.error('Audio loading error');
          toast({
            title: "Audio loading failed",
            description: "Falling back to text-to-speech.",
            variant: "destructive",
          });
          // Fallback to speech synthesis
          playAudio();
        };
      }
      
      await audioRef.current.play();
      setIsPlaying(true);
      
      toast({
        title: "Playing audio",
        description: "Listen carefully with word highlighting.",
      });
      
    } catch (error) {
      console.error('Error playing audio:', error);
      toast({
        title: "Playback failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [audioFile, englishText, toast, onReadingStop, clearHighlighting]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      speechSynthesis.cancel();
    }
    
    setIsPlaying(false);
    setCurrentTime(0);
    clearHighlighting();
    if (onReadingStop) onReadingStop();
  }, [onReadingStop, clearHighlighting]);

  return (
    <div className="flex gap-4 justify-center mb-6">
      {!isPlaying ? (
        <Button
          onClick={playAudio}
          className="glow-button flex items-center gap-2"
          disabled={isRecording}
        >
          <Volume2 className="h-4 w-4" />
          Listen Text
        </Button>
      ) : (
        <Button
          onClick={stopAudio}
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
          disabled={isPlaying}
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

export default EnglishAudioPlayer;
