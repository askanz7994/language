
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const HindiNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", hindi: "शून्य", transliteration: "shunya", example: "0 किताबें - शून्य किताबें" },
    { digit: "1", hindi: "एक", transliteration: "ek", example: "1 सेब - एक सेब" },
    { digit: "2", hindi: "दो", transliteration: "do", example: "2 बिल्लियां - दो बिल्लियां" },
    { digit: "3", hindi: "तीन", transliteration: "teen", example: "3 पक्षी - तीन पक्षी" },
    { digit: "4", hindi: "चार", transliteration: "chaar", example: "4 फूल - चार फूल" },
    { digit: "5", hindi: "पांच", transliteration: "paanch", example: "5 पेड़ - पांच पेड़" },
    { digit: "6", hindi: "छह", transliteration: "chhah", example: "6 तारे - छह तारे" },
    { digit: "7", hindi: "सात", transliteration: "saat", example: "7 दिन - सात दिन" },
    { digit: "8", hindi: "आठ", transliteration: "aath", example: "8 घंटे - आठ घंटे" },
    { digit: "9", hindi: "नौ", transliteration: "nau", example: "9 महीने - नौ महीने" },
    { digit: "10", hindi: "दस", transliteration: "das", example: "10 उंगलियां - दस उंगलियां" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Numbers in Hindi</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and recognize numbers in Hindi script
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
              <div className="text-3xl mb-2 font-semibold">{number.hindi}</div>
              <div className="text-muted-foreground mb-3 italic">{number.transliteration}</div>
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

export default HindiNumbers;
