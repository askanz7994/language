
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const EnglishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", word: "Zero" },
    { digit: "1", word: "One" },
    { digit: "2", word: "Two" },
    { digit: "3", word: "Three" },
    { digit: "4", word: "Four" },
    { digit: "5", word: "Five" },
    { digit: "6", word: "Six" },
    { digit: "7", word: "Seven" },
    { digit: "8", word: "Eight" },
    { digit: "9", word: "Nine" },
    { digit: "10", word: "Ten" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    const numberWord = numbers[index].word;
    console.log(`Playing audio for English number: ${numberWord}`);
    
    // Use Speech Synthesis API to read only the word aloud
    const utterance = new SpeechSynthesisUtterance(numberWord);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setPlayingAudio(null);
    };
    
    speechSynthesis.speak(utterance);
    
    // Reset playing state after a short delay as fallback
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Numbers in English
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Listen and learn English numbers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="text-xl md:text-2xl font-bold text-primary flex-shrink-0">{number.digit}</div>
                  <div className="text-lg md:text-2xl font-semibold truncate">{number.word}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''} flex-shrink-0`}
                  size="sm"
                >
                  <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline ml-1">Listen</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishNumbers;
