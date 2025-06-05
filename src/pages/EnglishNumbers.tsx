
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
    const numberText = `${numbers[index].digit}, ${numbers[index].word}`;
    console.log(`Playing audio for English number: ${numberText}`);
    
    // Use Speech Synthesis API to read the number aloud
    const utterance = new SpeechSynthesisUtterance(numberText);
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
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Numbers in English
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn English numbers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-primary">{number.digit}</div>
                  <div className="text-2xl font-semibold">{number.word}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Volume2 className="h-4 w-4" />
                  Listen
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
