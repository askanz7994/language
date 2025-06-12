
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const EnglishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const generateNumbers = () => {
    const numbers = [];
    
    // Basic numbers 0-20
    const basicNumbers = [
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
      { digit: "11", word: "Eleven" },
      { digit: "12", word: "Twelve" },
      { digit: "13", word: "Thirteen" },
      { digit: "14", word: "Fourteen" },
      { digit: "15", word: "Fifteen" },
      { digit: "16", word: "Sixteen" },
      { digit: "17", word: "Seventeen" },
      { digit: "18", word: "Eighteen" },
      { digit: "19", word: "Nineteen" },
      { digit: "20", word: "Twenty" }
    ];
    
    numbers.push(...basicNumbers);
    
    // Tens (30, 40, 50, etc.)
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    // Numbers 21-99
    for (let i = 21; i <= 99; i++) {
      const tensPlace = Math.floor(i / 10);
      const onesPlace = i % 10;
      const onesWords = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
      const word = `${tens[tensPlace]}-${onesWords[onesPlace]}`;
      numbers.push({ digit: i.toString(), word });
    }
    
    // Hundreds (100, 200, 300, etc.)
    const hundreds = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    for (let i = 1; i <= 9; i++) {
      numbers.push({ digit: (i * 100).toString(), word: `${hundreds[i]} Hundred` });
    }
    
    // Selected numbers for demonstration (every 50 from 150-950, plus key milestones)
    const selectedNumbers = [
      { digit: "101", word: "One Hundred One" },
      { digit: "150", word: "One Hundred Fifty" },
      { digit: "200", word: "Two Hundred" },
      { digit: "250", word: "Two Hundred Fifty" },
      { digit: "300", word: "Three Hundred" },
      { digit: "350", word: "Three Hundred Fifty" },
      { digit: "400", word: "Four Hundred" },
      { digit: "450", word: "Four Hundred Fifty" },
      { digit: "500", word: "Five Hundred" },
      { digit: "550", word: "Five Hundred Fifty" },
      { digit: "600", word: "Six Hundred" },
      { digit: "650", word: "Six Hundred Fifty" },
      { digit: "700", word: "Seven Hundred" },
      { digit: "750", word: "Seven Hundred Fifty" },
      { digit: "800", word: "Eight Hundred" },
      { digit: "850", word: "Eight Hundred Fifty" },
      { digit: "900", word: "Nine Hundred" },
      { digit: "950", word: "Nine Hundred Fifty" },
      { digit: "1000", word: "One Thousand" }
    ];
    
    numbers.push(...selectedNumbers);
    
    return numbers;
  };

  const numbers = generateNumbers();

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
    setTimeout(() => setPlayingAudio(null), 3000);
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
            Numbers in English (1-1000)
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Listen and learn English numbers from zero to one thousand
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="word-card">
              <div className="flex flex-col gap-2">
                <div className="text-center">
                  <div className="text-lg md:text-xl font-bold text-primary">{number.digit}</div>
                  <div className="text-sm md:text-base font-semibold break-words">{number.word}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''} w-full`}
                  size="sm"
                >
                  <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="ml-1 text-xs">Listen</span>
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
