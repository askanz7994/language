
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Play, Square } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const EnglishAlphabets = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  // Precise timing for each letter in the 30-second alphabet.mp3 file
  const letterTimings = [
    { letter: "A", start: 0, end: 1.1 },
    { letter: "B", start: 1.1, end: 2.2 },
    { letter: "C", start: 2.2, end: 3.3 },
    { letter: "D", start: 3.3, end: 4.4 },
    { letter: "E", start: 4.4, end: 5.5 },
    { letter: "F", start: 5.5, end: 6.6 },
    { letter: "G", start: 6.6, end: 7.7 },
    { letter: "H", start: 7.7, end: 8.8 },
    { letter: "I", start: 8.8, end: 9.9 },
    { letter: "J", start: 9.9, end: 11.0 },
    { letter: "K", start: 11.0, end: 12.1 },
    { letter: "L", start: 12.1, end: 13.2 },
    { letter: "M", start: 13.2, end: 14.3 },
    { letter: "N", start: 14.3, end: 15.4 },
    { letter: "O", start: 15.4, end: 16.5 },
    { letter: "P", start: 16.5, end: 17.6 },
    { letter: "Q", start: 17.6, end: 18.7 },
    { letter: "R", start: 18.7, end: 19.8 },
    { letter: "S", start: 19.8, end: 20.9 },
    { letter: "T", start: 20.9, end: 22.0 },
    { letter: "U", start: 22.0, end: 23.1 },
    { letter: "V", start: 23.1, end: 24.2 },
    { letter: "W", start: 24.2, end: 25.3 },
    { letter: "X", start: 25.3, end: 26.4 },
    { letter: "Y", start: 26.4, end: 27.5 },
    { letter: "Z", start: 27.5, end: 28.6 }
  ];

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/audio/alphabet.mp3');
    audioRef.current.preload = 'auto';
    
    // Add event listeners
    audioRef.current.addEventListener('loadeddata', () => {
      console.log('Audio file loaded and ready');
    });

    audioRef.current.addEventListener('ended', () => {
      console.log('Audio ended naturally');
      setIsPlayingFull(false);
      setPlayingAudio(null);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const playFullAlphabet = () => {
    if (!audioRef.current) return;

    if (isPlayingFull) {
      // Stop full alphabet playback
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingFull(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      console.log('Stopped full alphabet playback');
    } else {
      // Start full alphabet playback
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => {
          setIsPlayingFull(true);
          console.log('Started full alphabet playback');
          
          // Automatically stop after 30 seconds
          timeoutRef.current = setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setIsPlayingFull(false);
            console.log('Auto-stopping after 30 seconds');
          }, 30000);
        })
        .catch(error => {
          console.error('Error playing full alphabet:', error);
        });
    }
  };

  const playIndividualLetter = (letter: string, index: number) => {
    if (!audioRef.current) return;

    const timing = letterTimings[index];
    if (!timing) return;

    // Stop any current playback
    audioRef.current.pause();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setPlayingAudio(index);
    setIsPlayingFull(false);

    console.log(`Playing letter ${letter} from ${timing.start}s to ${timing.end}s`);

    // Set the current time to the letter's start time
    audioRef.current.currentTime = timing.start;
    
    audioRef.current.play()
      .then(() => {
        console.log(`Started playing at: ${audioRef.current?.currentTime}`);
        
        // Calculate the duration to play
        const duration = (timing.end - timing.start) * 1000; // Convert to milliseconds
        console.log(`Will stop after ${duration}ms`);
        
        // Stop after the letter's duration
        timeoutRef.current = setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
            console.log(`Stopped playing at: ${audioRef.current.currentTime}`);
          }
          setPlayingAudio(null);
        }, duration);
      })
      .catch(error => {
        console.error(`Error playing letter ${letter}:`, error);
        setPlayingAudio(null);
      });
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">English Alphabets</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Listen and learn the letters.
          </p>
          
          {/* Listen Full Alphabet Button */}
          <div className="mt-8">
            <Button
              onClick={playFullAlphabet}
              className={`glow-button text-lg px-8 py-3 ${isPlayingFull ? 'animate-pulse' : ''}`}
              size="lg"
            >
              {isPlayingFull ? (
                <>
                  <Square className="mr-2 h-5 w-5" />
                  Stop Full Alphabet
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Listen Full Alphabet
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {alphabets.map((letter, index) => (
              <div key={index} className="word-card text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{letter}</div>
                <Button
                  onClick={() => playIndividualLetter(letter, index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''} w-full`}
                  size="sm"
                  disabled={isPlayingFull}
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
