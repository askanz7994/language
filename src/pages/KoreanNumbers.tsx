
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const KoreanNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", korean: "영" },
    { digit: "1", korean: "일" },
    { digit: "2", korean: "이" },
    { digit: "3", korean: "삼" },
    { digit: "4", korean: "사" },
    { digit: "5", korean: "오" },
    { digit: "6", korean: "육" },
    { digit: "7", korean: "칠" },
    { digit: "8", korean: "팔" },
    { digit: "9", korean: "구" },
    { digit: "10", korean: "십" },
    { digit: "11", korean: "십일" },
    { digit: "12", korean: "십이" },
    { digit: "13", korean: "십삼" },
    { digit: "14", korean: "십사" },
    { digit: "15", korean: "십오" },
    { digit: "16", korean: "십육" },
    { digit: "17", korean: "십칠" },
    { digit: "18", korean: "십팔" },
    { digit: "19", korean: "십구" },
    { digit: "20", korean: "이십" },
    { digit: "21", korean: "이십일" },
    { digit: "22", korean: "이십이" },
    { digit: "23", korean: "이십삼" },
    { digit: "24", korean: "이십사" },
    { digit: "25", korean: "이십오" },
    { digit: "26", korean: "이십육" },
    { digit: "27", korean: "이십칠" },
    { digit: "28", korean: "이십팔" },
    { digit: "29", korean: "이십구" },
    { digit: "30", korean: "삼십" },
    { digit: "31", korean: "삼십일" },
    { digit: "32", korean: "삼십이" },
    { digit: "33", korean: "삼십삼" },
    { digit: "34", korean: "삼십사" },
    { digit: "35", korean: "삼십오" },
    { digit: "36", korean: "삼십육" },
    { digit: "37", korean: "삼십칠" },
    { digit: "38", korean: "삼십팔" },
    { digit: "39", korean: "삼십구" },
    { digit: "40", korean: "사십" },
    { digit: "41", korean: "사십일" },
    { digit: "42", korean: "사십이" },
    { digit: "43", korean: "사십삼" },
    { digit: "44", korean: "사십사" },
    { digit: "45", korean: "사십오" },
    { digit: "46", korean: "사십육" },
    { digit: "47", korean: "사십칠" },
    { digit: "48", korean: "사십팔" },
    { digit: "49", korean: "사십구" },
    { digit: "50", korean: "오십" },
    { digit: "51", korean: "오십일" },
    { digit: "52", korean: "오십이" },
    { digit: "53", korean: "오십삼" },
    { digit: "54", korean: "오십사" },
    { digit: "55", korean: "오십오" },
    { digit: "56", korean: "오십육" },
    { digit: "57", korean: "오십칠" },
    { digit: "58", korean: "오십팔" },
    { digit: "59", korean: "오십구" },
    { digit: "60", korean: "육십" },
    { digit: "61", korean: "육십일" },
    { digit: "62", korean: "육십이" },
    { digit: "63", korean: "육십삼" },
    { digit: "64", korean: "육십사" },
    { digit: "65", korean: "육십오" },
    { digit: "66", korean: "육십육" },
    { digit: "67", korean: "육십칠" },
    { digit: "68", korean: "육십팔" },
    { digit: "69", korean: "육십구" },
    { digit: "70", korean: "칠십" },
    { digit: "71", korean: "칠십일" },
    { digit: "72", korean: "칠십이" },
    { digit: "73", korean: "칠십삼" },
    { digit: "74", korean: "칠십사" },
    { digit: "75", korean: "칠십오" },
    { digit: "76", korean: "칠십육" },
    { digit: "77", korean: "칠십칠" },
    { digit: "78", korean: "칠십팔" },
    { digit: "79", korean: "칠십구" },
    { digit: "80", korean: "팔십" },
    { digit: "81", korean: "팔십일" },
    { digit: "82", korean: "팔십이" },
    { digit: "83", korean: "팔십삼" },
    { digit: "84", korean: "팔십사" },
    { digit: "85", korean: "팔십오" },
    { digit: "86", korean: "팔십육" },
    { digit: "87", korean: "팔십칠" },
    { digit: "88", korean: "팔십팔" },
    { digit: "89", korean: "팔십구" },
    { digit: "90", korean: "구십" },
    { digit: "91", korean: "구십일" },
    { digit: "92", korean: "구십이" },
    { digit: "93", korean: "구십삼" },
    { digit: "94", korean: "구십사" },
    { digit: "95", korean: "구십오" },
    { digit: "96", korean: "구십육" },
    { digit: "97", korean: "구십칠" },
    { digit: "98", korean: "구십팔" },
    { digit: "99", korean: "구십구" },
    { digit: "100", korean: "백" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Korean number: ${numbers[index].korean}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            한국어 숫자 (Korean Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Korean
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
              <div className="text-2xl font-semibold text-center">{number.korean}</div>
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

export default KoreanNumbers;
