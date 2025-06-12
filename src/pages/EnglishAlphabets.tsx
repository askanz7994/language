
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Square } from "lucide-icon";
import { useState, useRef, useCallback, useEffect } from "react";

const EnglishAlphabets = () => {
  // State variables
  const [playingAudio, setPlayingAudio] = useState(false); // Controls playback of the full alphabet audio
  const [currentTime, setCurrentTime] = useState(0); // Tracks current playback time of the full audio
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null); // Index of the currently highlighted letter
  const [playingIndividualLetter, setPlayingIndividualLetter] = useState(false); // Controls playback of individual letter audio

  // Refs
  const audioRef = useRef<HTMLHTMLAudioElement | null>(null); // Ref for the main audio element
  const individualAudioRef = useRef<HTMLHTMLAudioElement | null>(null); // Ref for individual letter audio (if you implement it)
  const animationRef = useRef<number | null>(null); // Ref for the requestAnimationFrame
  const individualTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for timeout when playing individual letters

  // Alphabet data
  const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  // Updated timing data for the 30-second alphabet.mp3 file
  // Each letter gets approximately 1.15 seconds (30 seconds / 26 letters)
  const letterTimings = [
    { letter: "A", startTime: 0.0, endTime: 1.15 },
    { letter: "B", startTime: 1.15, endTime: 2.30 },
    { letter: "C", startTime: 2.30, endTime: 3.45 },
    { letter: "D", startTime: 3.45, endTime: 4.60 },
    { letter: "E", startTime: 4.60, endTime: 5.75 },
    { letter: "F", startTime: 5.75, endTime: 6.90 },
    { letter: "G", startTime: 6.90, endTime: 8.05 },
    { letter: "H", startTime: 8.05, endTime: 9.20 },
    { letter: "I", startTime: 9.20, endTime: 10.35 },
    { letter: "J", startTime: 10.35, endTime: 11.50 },
    { letter: "K", startTime: 11.50, endTime: 12.65 },
    { letter: "L", startTime: 12.65, endTime: 13.80 },
    { letter: "M", startTime: 13.80, endTime: 14.95 },
    { letter: "N", startTime: 14.95, endTime: 16.10 },
    { letter: "O", startTime: 16.10, endTime: 17.25 },
    { letter: "P", startTime: 17.25, endTime: 18.40 },
    { letter: "Q", startTime: 18.40, endTime: 19.55 },
    { letter: "R", startTime: 19.55, endTime: 20.70 },
    { letter: "S", startTime: 20.70, endTime: 21.85 },
    { letter: "T", startTime: 21.85, endTime: 23.00 },
    { letter: "U", startTime: 23.00, endTime: 24.15 },
    { letter: "V", startTime: 24.15, endTime: 25.30 },
    { letter: "W", startTime: 25.30, endTime: 26.45 },
    { letter: "X", startTime: 26.45, endTime: 27.60 },
    { letter: "Y", startTime: 27.60, endTime: 28.75 },
    { letter: "Z", startTime: 28.75, endTime: 30.00 }
  ];

  // Function to toggle playing the full alphabet audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (playingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlayingAudio(!playingAudio);
    }
  };

  // Function to stop the audio and reset state
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingAudio(false);
      setCurrentTime(0);
      setHighlightedIndex(null);
    }
  };

  // Function to play individual letter audio (placeholder - you'd need separate audio files or a more complex solution)
  const playIndividualLetter = (index: number) => {
    // Implement logic to play individual letter audio here
    // For example, if you have separate audio files like "A.mp3", "B.mp3", etc.
    // This is just a placeholder to demonstrate the concept.
    console.log(`Playing individual letter: ${alphabets[index]}`);
    setPlayingIndividualLetter(true);
    // Simulate playing for a short duration
    individualTimeoutRef.current = setTimeout(() => {
      setPlayingIndividualLetter(false);
    }, 1000); // Simulate 1 second playback
  };

  // Callback for the animation loop to update current time
  const updateTime = useCallback(() => {
    if (audioRef.current && playingAudio) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateTime);
    }
  }, [playingAudio]);

  // Effect to start/stop the animation loop when playingAudio changes
  useEffect(() => {
    if (playingAudio) {
      animationRef.current = requestAnimationFrame(updateTime);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    // Cleanup on component unmount or when playingAudio becomes false
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [playingAudio, updateTime]);

  // Effect to update highlighting based on current time
  useEffect(() => {
    if (playingAudio) {
      const currentLetterIndex = letterTimings.findIndex(
        (timing) => currentTime >= timing.startTime && currentTime < timing.endTime
      );

      if (currentLetterIndex !== -1) {
        setHighlightedIndex(currentLetterIndex);
      } else {
        // If current time is outside any defined range (e.g., at the very end or beginning)
        setHighlightedIndex(null);
      }
    } else {
      // If audio is not playing, no letter should be highlighted
      setHighlightedIndex(null);
    }
  }, [currentTime, playingAudio, letterTimings]);

  // Effect to handle audio ending
  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnded = () => {
      setPlayingAudio(false);
      setCurrentTime(0);
      setHighlightedIndex(null);
    };

    if (audio) {
      audio.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnded);
      }
      if (individualTimeoutRef.current) {
        clearTimeout(individualTimeoutRef.current);
      }
    };
  }, []); // Run once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">English Alphabets</h1>

      {/* Audio element for the full alphabet */}
      <audio ref={audioRef} src="/audio/alphabet.mp3" preload="auto" />

      <div className="flex space-x-4 mb-8">
        <Button onClick={togglePlayPause} className="px-6 py-3 text-lg">
          {playingAudio ? (
            <>
              <Square className="h-5 w-5 mr-2" /> Stop
            </>
          ) : (
            <>
              <Volume2 className="h-5 w-5 mr-2" /> Play All
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4 max-w-4xl w-full">
        {alphabets.map((letter, index) => (
          <Button
            key={letter}
            className={`
              p-4 text-2xl font-semibold
              ${highlightedIndex === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
              hover:bg-blue-600 hover:text-white
            `}
            onClick={() => playIndividualLetter(index)}
            disabled={playingAudio} // Disable individual letter buttons while full audio is playing
          >
            {letter}
          </Button>
        ))}
      </div>

      <div className="mt-8 text-lg">
        Current Time: {currentTime.toFixed(2)}s
        {highlightedIndex !== null && (
          <span className="ml-4">
            - Highlighting: {alphabets[highlightedIndex]}
          </span>
        )}
      </div>
    </div>
  );
};

export default EnglishAlphabets;