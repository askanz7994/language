
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const EnglishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", word: "Zero", pronunciation: "/ˈzɪəroʊ/", example: "0 books - Zero books" },
    { digit: "1", word: "One", pronunciation: "/wʌn/", example: "1 apple - One apple" },
    { digit: "2", word: "Two", pronunciation: "/tuː/", example: "2 cats - Two cats" },
    { digit: "3", word: "Three", pronunciation: "/θriː/", example: "3 birds - Three birds" },
    { digit: "4", word: "Four", pronunciation: "/fɔːr/", example: "4 flowers - Four flowers" },
    { digit: "5", word: "Five", pronunciation: "/faɪv/", example: "5 trees - Five trees" },
    { digit: "6", word: "Six", pronunciation: "/sɪks/", example: "6 stars - Six stars" },
    { digit: "7", word: "Seven", pronunciation: "/ˈsevən/", example: "7 days - Seven days" },
    { digit: "8", word: "Eight", pronunciation: "/eɪt/", example: "8 hours - Eight hours" },
    { digit: "9", word: "Nine", pronunciation: "/naɪn/", example: "9 months - Nine months" },
    { digit: "10", word: "Ten", pronunciation: "/ten/", example: "10 fingers - Ten fingers" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Numbers in English</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and pronounce numbers in English
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-3xl mb-2 font-semibold">{number.word}</div>
              <div className="text-muted-foreground mb-3 italic">{number.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Example:</strong> {number.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishNumbers;
