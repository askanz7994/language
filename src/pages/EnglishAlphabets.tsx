
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Square } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

const EnglishAlphabets = () => {
  const [playingAudio, setPlayingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  // Timing data for each letter in the alphabet.mp3 file (in seconds)
  // You may need to adjust these timings based on your actual audio file
  const letterTimings = [
    { letter: "A", startTime: 0.0, endTime: 1.0 },
    { letter: "B", startTime: 1.0, endTime: 2.0 },
    { letter: "C", startTime: 2.0, endTime: 3.0 },
    { letter: "D", startTime: 3.0, endTime: 4.0 },
    { letter: "E", startTime: 4.0, endTime: 5.0 },
    { letter: "F", startTime: 5.0, endTime: 6.0 },
    { letter: "G", startTime: 6.0, endTime: 7.0 },
    { letter: "H", startTime: 7.0, endTime: 8.0 },
    { letter: "I", startTime: 8.0, endTime: 9.0 },
    { letter: "J", startTime: 9.0, endTime: 10.0 },
    { letter: "K", startTime: 10.0, endTime: 11.0 },
    { letter: "L", startTime: 11.0, endTime: 12.0 },
    { letter: "M", startTime: 12.0, endTime: 13.0 },
    { letter: "N", startTime: 13.0, endTime: 14.0 },
    { letter: "O", startTime: 14.0, endTime: 15.0 },
    { letter: "P", startTime: 15.0, endTime: 16.0 },
    { letter: "Q", startTime: 16.0, endTime: 17.0 },
    { letter: "R", startTime: 17.0, endTime: 18.0 },
    { letter: "S", startTime: 18.0, endTime: 19.0 },
    { letter: "T", startTime: 19.0, endTime: 20.0 },
    { letter: "U", startTime: 20.0, endTime: 21.0 },
    { letter: "V", startTime: 21.0, endTime: 22.0 },
    { letter: "W", startTime: 22.0, endTime: 23.0 },
    { letter: "X", startTime: 23.0, endTime: 24.0 },
    { letter: "Y", startTime: 24.0, endTime: 25.0 },
    { letter: "Z", startTime: 25.0, endTime: 26.0 }
  ];

  // Update highlighting based on current time
  useEffect(() => {
    if (playingAudio) {
      const currentLetterIndex = letterTimings.findIndex(
        (timing) => currentTime >= timing.startTime && currentTime <= timing.endTime
      );
      
      if (currentLetterIndex !== -1) {
        setHighlightedIndex(currentLetterIndex);
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
    
    setPlayingAudio(false);
    setCurrentTime(0);
    setHighlightedIndex(null);
  }, []);

  const playIndividualLetter = useCallback(async (letter: string, index: number) => {
    if (playingAudio) return; // Don't allow individual play while full alphabet is playing
    
    try {
      const timing = letterTimings[index];
      if (!timing) return;

      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/alphabet.mp3');
      }
      
      audioRef.current.currentTime = timing.startTime;
      setHighlightedIndex(index);
      
      const playPromise = audioRef.current.play();
      
      // Stop the audio after the letter's duration
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setHighlightedIndex(null);
      }, (timing.endTime - timing.startTime) * 1000);
      
      await playPromise;
      
    } catch (error) {
      console.error('Error playing letter audio:', error);
      setHighlightedIndex(null);
    }
  }, [playingAudio]);

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
                  disabled={playingAudio}
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
