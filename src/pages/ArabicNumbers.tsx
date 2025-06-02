
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ArabicNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", arabic: "صفر" },
    { digit: "1", arabic: "واحد" },
    { digit: "2", arabic: "اثنان" },
    { digit: "3", arabic: "ثلاثة" },
    { digit: "4", arabic: "أربعة" },
    { digit: "5", arabic: "خمسة" },
    { digit: "6", arabic: "ستة" },
    { digit: "7", arabic: "سبعة" },
    { digit: "8", arabic: "ثمانية" },
    { digit: "9", arabic: "تسعة" },
    { digit: "10", arabic: "عشرة" },
    { digit: "11", arabic: "أحد عشر" },
    { digit: "12", arabic: "اثنا عشر" },
    { digit: "13", arabic: "ثلاثة عشر" },
    { digit: "14", arabic: "أربعة عشر" },
    { digit: "15", arabic: "خمسة عشر" },
    { digit: "16", arabic: "ستة عشر" },
    { digit: "17", arabic: "سبعة عشر" },
    { digit: "18", arabic: "ثمانية عشر" },
    { digit: "19", arabic: "تسعة عشر" },
    { digit: "20", arabic: "عشرون" },
    { digit: "21", arabic: "واحد وعشرون" },
    { digit: "22", arabic: "اثنان وعشرون" },
    { digit: "23", arabic: "ثلاثة وعشرون" },
    { digit: "24", arabic: "أربعة وعشرون" },
    { digit: "25", arabic: "خمسة وعشرون" },
    { digit: "26", arabic: "ستة وعشرون" },
    { digit: "27", arabic: "سبعة وعشرون" },
    { digit: "28", arabic: "ثمانية وعشرون" },
    { digit: "29", arabic: "تسعة وعشرون" },
    { digit: "30", arabic: "ثلاثون" },
    { digit: "31", arabic: "واحد وثلاثون" },
    { digit: "32", arabic: "اثنان وثلاثون" },
    { digit: "33", arabic: "ثلاثة وثلاثون" },
    { digit: "34", arabic: "أربعة وثلاثون" },
    { digit: "35", arabic: "خمسة وثلاثون" },
    { digit: "36", arabic: "ستة وثلاثون" },
    { digit: "37", arabic: "سبعة وثلاثون" },
    { digit: "38", arabic: "ثمانية وثلاثون" },
    { digit: "39", arabic: "تسعة وثلاثون" },
    { digit: "40", arabic: "أربعون" },
    { digit: "41", arabic: "واحد وأربعون" },
    { digit: "42", arabic: "اثنان وأربعون" },
    { digit: "43", arabic: "ثلاثة وأربعون" },
    { digit: "44", arabic: "أربعة وأربعون" },
    { digit: "45", arabic: "خمسة وأربعون" },
    { digit: "46", arabic: "ستة وأربعون" },
    { digit: "47", arabic: "سبعة وأربعون" },
    { digit: "48", arabic: "ثمانية وأربعون" },
    { digit: "49", arabic: "تسعة وأربعون" },
    { digit: "50", arabic: "خمسون" },
    { digit: "51", arabic: "واحد وخمسون" },
    { digit: "52", arabic: "اثنان وخمسون" },
    { digit: "53", arabic: "ثلاثة وخمسون" },
    { digit: "54", arabic: "أربعة وخمسون" },
    { digit: "55", arabic: "خمسة وخمسون" },
    { digit: "56", arabic: "ستة وخمسون" },
    { digit: "57", arabic: "سبعة وخمسون" },
    { digit: "58", arabic: "ثمانية وخمسون" },
    { digit: "59", arabic: "تسعة وخمسون" },
    { digit: "60", arabic: "ستون" },
    { digit: "61", arabic: "واحد وستون" },
    { digit: "62", arabic: "اثنان وستون" },
    { digit: "63", arabic: "ثلاثة وستون" },
    { digit: "64", arabic: "أربعة وستون" },
    { digit: "65", arabic: "خمسة وستون" },
    { digit: "66", arabic: "ستة وستون" },
    { digit: "67", arabic: "سبعة وستون" },
    { digit: "68", arabic: "ثمانية وستون" },
    { digit: "69", arabic: "تسعة وستون" },
    { digit: "70", arabic: "سبعون" },
    { digit: "71", arabic: "واحد وسبعون" },
    { digit: "72", arabic: "اثنان وسبعون" },
    { digit: "73", arabic: "ثلاثة وسبعون" },
    { digit: "74", arabic: "أربعة وسبعون" },
    { digit: "75", arabic: "خمسة وسبعون" },
    { digit: "76", arabic: "ستة وسبعون" },
    { digit: "77", arabic: "سبعة وسبعون" },
    { digit: "78", arabic: "ثمانية وسبعون" },
    { digit: "79", arabic: "تسعة وسبعون" },
    { digit: "80", arabic: "ثمانون" },
    { digit: "81", arabic: "واحد وثمانون" },
    { digit: "82", arabic: "اثنان وثمانون" },
    { digit: "83", arabic: "ثلاثة وثمانون" },
    { digit: "84", arabic: "أربعة وثمانون" },
    { digit: "85", arabic: "خمسة وثمانون" },
    { digit: "86", arabic: "ستة وثمانون" },
    { digit: "87", arabic: "سبعة وثمانون" },
    { digit: "88", arabic: "ثمانية وثمانون" },
    { digit: "89", arabic: "تسعة وثمانون" },
    { digit: "90", arabic: "تسعون" },
    { digit: "91", arabic: "واحد وتسعون" },
    { digit: "92", arabic: "اثنان وتسعون" },
    { digit: "93", arabic: "ثلاثة وتسعون" },
    { digit: "94", arabic: "أربعة وتسعون" },
    { digit: "95", arabic: "خمسة وتسعون" },
    { digit: "96", arabic: "ستة وتسعون" },
    { digit: "97", arabic: "سبعة وتسعون" },
    { digit: "98", arabic: "ثمانية وتسعون" },
    { digit: "99", arabic: "تسعة وتسعون" },
    { digit: "100", arabic: "مائة" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Arabic number: ${numbers[index].arabic}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-arabic" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Arabic
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            الأرقام العربية (Arabic Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Arabic
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-semibold text-center">{number.arabic}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Practice Time!</h3>
            <p className="text-muted-foreground mb-4">
              Click on any number card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio feature coming soon with native speaker recordings!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabicNumbers;
