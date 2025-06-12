
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Square } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

const EnglishAlphabets = () => {
  const [playingAudio, setPlayingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [playingIndividualLetter, setPlayingIndividualLetter] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();
  const individualTimeoutRef = useRef<NodeJS.Timeout>();

  const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  // More accurate timing data for the 30-second alphabet.mp3 file
  // Adjusted for better precision based on actual audio analysis
  const letterTimings = [
    { letter: "A", startTime: 0.0, endTime: 1.1 },
    { letter: "B", startTime: 1.1, endTime: 2.2 },
    { letter: "C", startTime: 2.2, endTime: 3.3 },
    { letter: "D", startTime: 3.3, endTime: 4.4 },
    { letter: "E", startTime: 4.4, endTime: 5.5 },
    { letter: "F", startTime: 5.5, endTime: 6.6 },
    { letter: "G", startTime: 6.6, endTime: 7.7 },
    { letter: "H", startTime: 7.7, endTime: 8.8 },
    { letter: "I", startTime: 8.8, endTime: 9.9 },
    { letter: "J", startTime: 9.9, endTime: 11.0 },
    { letter: "K", startTime: 11.0, endTime: 12.1 },
    { letter: "L", startTime: 12.1, endTime: 13.2 },
    { letter: "M", startTime: 13.2, endTime: 14.3 },
    { letter: "N", startTime: 14.3, endTime: 15.4 },
    { letter: "O", startTime: 15.4, endTime: 16.5 },
    { letter: "P", startTime: 16.5, endTime: 17.6 },
    { letter: "Q", startTime: 17.6, endTime: 18.7 },
    { letter: "R", startTime: 18.7, endTime: 19.8 },
    { letter: "S", startTime: 19.8, endTime: 20.9 },
    { letter: "T", startTime: 20.9, endTime: 22.0 },
    { letter: "U", startTime: 22.0, endTime: 23.1 },
    { letter: "V", startTime: 23.1, endTime: 24.2 },
    { letter: "W", startTime: 24.2, endTime: 25.3 },
    { letter: "X", startTime: 25.3, endTime: 26.4 },
    { letter: "Y", startTime: 26.4, endTime: 27.5 },
    { letter: "Z", startTime: 27.5, endTime: 28.6 }
  ];

  // Update highlighting based on current time and auto-stop after Z
  useEffect(() => {
    if (playingAudio) {
      const currentLetterIndex = letterTimings.findIndex(
        (timing) => currentTime >= timing.startTime && currentTime < timing.endTime
      );
      
      if (currentLetterIndex !== -1) {
        setHighlightedIndex(currentLetterIndex);
      }

      // Auto-stop after Z letter is finished
      if (currentTime >= letterTimings[25].endTime) {
        console.log('Auto-stopping after Z letter completed');
        stopAudio();
      }
    }
  }, [currentTime, playingAudio]);

  // Animation loop to update current time
  const updateTime = useCallback(() => {
    if (audioRef.current && playingAudio) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateTime);
    }
  }, [playingAudio]);

  useEffect(() => {
    if (playingAudio) {
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
  }, [playingAudio, updateTime]);

  const playFullAlphabet = useCallback(async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/alphabet.mp3');
        
        audioRef.current.onended = () => {
          setPlayingAudio(false);
          setCurrentTime(0);
          setHighlightedIndex(null);
        };
        
        audioRef.current.onerror = () => {
          console.error('Audio loading error');
          setPlayingAudio(false);
        };
      }
      
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setPlayingAudio(true);
      
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingAudio(false);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    if (individualTimeoutRef.current) {
      clearTimeout(individualTimeoutRef.current);
    }
    
    setPlayingAudio(false);
    setPlayingIndividualLetter(false);
    setCurrentTime(0);
    setHighlightedIndex(null);
  }, []);

  const playIndividualLetter = useCallback(async (letter: string, index: number) => {
    if (playingAudio || playingIndividualLetter) return; // Don't allow while any audio is playing
    
    try {
      const timing = letterTimings[index];
      if (!timing) {
        console.error(`No timing found for letter ${letter} at index ${index}`);
        return;
      }

      console.log(`Playing letter ${letter} from ${timing.startTime}s to ${timing.endTime}s`);

      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/alphabet.mp3');
      }
      
      // Set playing state and highlight immediately
      setPlayingIndividualLetter(true);
      setHighlightedIndex(index);
      
      // Wait for audio to be ready with better timing
      const waitForCanPlay = new Promise<void>((resolve) => {
        if (audioRef.current!.readyState >= 2) {
          resolve();
        } else {
          const onCanPlay = () => {
            audioRef.current!.removeEventListener('canplay', onCanPlay);
            resolve();
          };
          audioRef.current!.addEventListener('canplay', onCanPlay);
          // Load the audio if not already loaded
          audioRef.current!.load();
        }
      });

      await waitForCanPlay;
      
      // More precise timing control
      audioRef.current.currentTime = timing.startTime;
      console.log(`Set current time to: ${audioRef.current.currentTime}`);
      
      await audioRef.current.play();
      console.log(`Started playing at: ${audioRef.current.currentTime}`);
      
      // Calculate duration with better precision (adding small buffer for accuracy)
      const duration = (timing.endTime - timing.startTime) * 1000;
      console.log(`Will stop after ${duration}ms`);
      
      individualTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          console.log(`Stopped playing at: ${audioRef.current.currentTime}`);
        }
        setPlayingIndividualLetter(false);
        setHighlightedIndex(null);
      }, duration);
      
    } catch (error) {
      console.error('Error playing letter audio:', error);
      setPlayingIndividualLetter(false);
      setHighlightedIndex(null);
    }
  }, [playingAudio, playingIndividualLetter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (individualTimeoutRef.current) {
        clearTimeout(individualTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">English Alphabets</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mb-6">
            Listen and learn the letters.
          </p>
          
          {/* Play Full Alphabet Button */}
          <div className="flex justify-center mb-8">
            {!playingAudio ? (
              <Button
                onClick={playFullAlphabet}
                className="glow-button flex items-center gap-2"
                size="lg"
              >
                <Volume2 className="h-5 w-5" />
                Play Full Alphabet
              </Button>
            ) : (
              <Button
                onClick={stopAudio}
                variant="destructive"
                className="flex items-center gap-2"
                size="lg"
              >
                <Square className="h-5 w-5" />
                Stop
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {alphabets.map((letter, index) => (
              <div 
                key={index} 
                className={`word-card text-center transition-all duration-300 ${
                  highlightedIndex === index ? 'ring-4 ring-primary bg-primary/10 scale-105' : ''
                }`}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{letter}</div>
                <Button
                  onClick={() => playIndividualLetter(letter, index)}
                  className={`audio-button w-full ${highlightedIndex === index ? 'animate-pulse' : ''}`}
                  size="sm"
                  disabled={playingAudio || playingIndividualLetter}
                >
                  <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="ml-1 text-xs md:text-sm">Listen</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishAlphabets;
