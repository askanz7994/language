
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const EnglishAlphabets = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  const playAudio = (letter: string, index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for English letter: ${letter}`);
    
    // Use Speech Synthesis API to read the letter aloud
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setPlayingAudio(null);
    };
    
    speechSynthesis.speak(utterance);
    
    // Reset playing state after a short delay as fallback
    setTimeout(() => setPlayingAudio(null), 1500);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">English Alphabets</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the letters.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {alphabets.map((letter, index) => (
              <div key={index} className="word-card text-center">
                <div className="text-5xl font-bold mb-4">{letter}</div>
                <Button
                  onClick={() => playAudio(letter, index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Volume2 className="h-4 w-4" />
                  Listen
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
