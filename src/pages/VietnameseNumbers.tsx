
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const VietnameseNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", vietnamese: "không" },
    { digit: "1", vietnamese: "một" },
    { digit: "2", vietnamese: "hai" },
    { digit: "3", vietnamese: "ba" },
    { digit: "4", vietnamese: "bốn" },
    { digit: "5", vietnamese: "năm" },
    { digit: "6", vietnamese: "sáu" },
    { digit: "7", vietnamese: "bảy" },
    { digit: "8", vietnamese: "tám" },
    { digit: "9", vietnamese: "chín" },
    { digit: "10", vietnamese: "mười" },
    { digit: "11", vietnamese: "mười một" },
    { digit: "12", vietnamese: "mười hai" },
    { digit: "13", vietnamese: "mười ba" },
    { digit: "14", vietnamese: "mười bốn" },
    { digit: "15", vietnamese: "mười lăm" },
    { digit: "16", vietnamese: "mười sáu" },
    { digit: "17", vietnamese: "mười bảy" },
    { digit: "18", vietnamese: "mười tám" },
    { digit: "19", vietnamese: "mười chín" },
    { digit: "20", vietnamese: "hai mười" },
    { digit: "21", vietnamese: "hai mười một" },
    { digit: "22", vietnamese: "hai mười hai" },
    { digit: "23", vietnamese: "hai mười ba" },
    { digit: "24", vietnamese: "hai mười bốn" },
    { digit: "25", vietnamese: "hai mười lăm" },
    { digit: "26", vietnamese: "hai mười sáu" },
    { digit: "27", vietnamese: "hai mười bảy" },
    { digit: "28", vietnamese: "hai mười tám" },
    { digit: "29", vietnamese: "hai mười chín" },
    { digit: "30", vietnamese: "ba mười" },
    { digit: "31", vietnamese: "ba mười một" },
    { digit: "32", vietnamese: "ba mười hai" },
    { digit: "33", vietnamese: "ba mười ba" },
    { digit: "34", vietnamese: "ba mười bốn" },
    { digit: "35", vietnamese: "ba mười lăm" },
    { digit: "36", vietnamese: "ba mười sáu" },
    { digit: "37", vietnamese: "ba mười bảy" },
    { digit: "38", vietnamese: "ba mười tám" },
    { digit: "39", vietnamese: "ba mười chín" },
    { digit: "40", vietnamese: "bốn mười" },
    { digit: "41", vietnamese: "bốn mười một" },
    { digit: "42", vietnamese: "bốn mười hai" },
    { digit: "43", vietnamese: "bốn mười ba" },
    { digit: "44", vietnamese: "bốn mười bốn" },
    { digit: "45", vietnamese: "bốn mười lăm" },
    { digit: "46", vietnamese: "bốn mười sáu" },
    { digit: "47", vietnamese: "bốn mười bảy" },
    { digit: "48", vietnamese: "bốn mười tám" },
    { digit: "49", vietnamese: "bốn mười chín" },
    { digit: "50", vietnamese: "năm mười" },
    { digit: "51", vietnamese: "năm mười một" },
    { digit: "52", vietnamese: "năm mười hai" },
    { digit: "53", vietnamese: "năm mười ba" },
    { digit: "54", vietnamese: "năm mười bốn" },
    { digit: "55", vietnamese: "năm mười lăm" },
    { digit: "56", vietnamese: "năm mười sáu" },
    { digit: "57", vietnamese: "năm mười bảy" },
    { digit: "58", vietnamese: "năm mười tám" },
    { digit: "59", vietnamese: "năm mười chín" },
    { digit: "60", vietnamese: "sáu mười" },
    { digit: "61", vietnamese: "sáu mười một" },
    { digit: "62", vietnamese: "sáu mười hai" },
    { digit: "63", vietnamese: "sáu mười ba" },
    { digit: "64", vietnamese: "sáu mười bốn" },
    { digit: "65", vietnamese: "sáu mười lăm" },
    { digit: "66", vietnamese: "sáu mười sáu" },
    { digit: "67", vietnamese: "sáu mười bảy" },
    { digit: "68", vietnamese: "sáu mười tám" },
    { digit: "69", vietnamese: "sáu mười chín" },
    { digit: "70", vietnamese: "bảy mười" },
    { digit: "71", vietnamese: "bảy mười một" },
    { digit: "72", vietnamese: "bảy mười hai" },
    { digit: "73", vietnamese: "bảy mười ba" },
    { digit: "74", vietnamese: "bảy mười bốn" },
    { digit: "75", vietnamese: "bảy mười lăm" },
    { digit: "76", vietnamese: "bảy mười sáu" },
    { digit: "77", vietnamese: "bảy mười bảy" },
    { digit: "78", vietnamese: "bảy mười tám" },
    { digit: "79", vietnamese: "bảy mười chín" },
    { digit: "80", vietnamese: "tám mười" },
    { digit: "81", vietnamese: "tám mười một" },
    { digit: "82", vietnamese: "tám mười hai" },
    { digit: "83", vietnamese: "tám mười ba" },
    { digit: "84", vietnamese: "tám mười bốn" },
    { digit: "85", vietnamese: "tám mười lăm" },
    { digit: "86", vietnamese: "tám mười sáu" },
    { digit: "87", vietnamese: "tám mười bảy" },
    { digit: "88", vietnamese: "tám mười tám" },
    { digit: "89", vietnamese: "tám mười chín" },
    { digit: "90", vietnamese: "chín mười" },
    { digit: "91", vietnamese: "chín mười một" },
    { digit: "92", vietnamese: "chín mười hai" },
    { digit: "93", vietnamese: "chín mười ba" },
    { digit: "94", vietnamese: "chín mười bốn" },
    { digit: "95", vietnamese: "chín mười lăm" },
    { digit: "96", vietnamese: "chín mười sáu" },
    { digit: "97", vietnamese: "chín mười bảy" },
    { digit: "98", vietnamese: "chín mười tám" },
    { digit: "99", vietnamese: "chín mười chín" },
    { digit: "100", vietnamese: "một trăm" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Vietnamese number: ${numbers[index].vietnamese}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-vietnamese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vietnamese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Số Tiếng Việt (Vietnamese Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Vietnamese
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
              <div className="text-2xl font-semibold text-center">{number.vietnamese}</div>
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

export default VietnameseNumbers;
