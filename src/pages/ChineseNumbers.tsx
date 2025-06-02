
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ChineseNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", chinese: "零" },
    { digit: "1", chinese: "一" },
    { digit: "2", chinese: "二" },
    { digit: "3", chinese: "三" },
    { digit: "4", chinese: "四" },
    { digit: "5", chinese: "五" },
    { digit: "6", chinese: "六" },
    { digit: "7", chinese: "七" },
    { digit: "8", chinese: "八" },
    { digit: "9", chinese: "九" },
    { digit: "10", chinese: "十" },
    { digit: "11", chinese: "十一" },
    { digit: "12", chinese: "十二" },
    { digit: "13", chinese: "十三" },
    { digit: "14", chinese: "十四" },
    { digit: "15", chinese: "十五" },
    { digit: "16", chinese: "十六" },
    { digit: "17", chinese: "十七" },
    { digit: "18", chinese: "十八" },
    { digit: "19", chinese: "十九" },
    { digit: "20", chinese: "二十" },
    { digit: "21", chinese: "二十一" },
    { digit: "22", chinese: "二十二" },
    { digit: "23", chinese: "二十三" },
    { digit: "24", chinese: "二十四" },
    { digit: "25", chinese: "二十五" },
    { digit: "26", chinese: "二十六" },
    { digit: "27", chinese: "二十七" },
    { digit: "28", chinese: "二十八" },
    { digit: "29", chinese: "二十九" },
    { digit: "30", chinese: "三十" },
    { digit: "31", chinese: "三十一" },
    { digit: "32", chinese: "三十二" },
    { digit: "33", chinese: "三十三" },
    { digit: "34", chinese: "三十四" },
    { digit: "35", chinese: "三十五" },
    { digit: "36", chinese: "三十六" },
    { digit: "37", chinese: "三十七" },
    { digit: "38", chinese: "三十八" },
    { digit: "39", chinese: "三十九" },
    { digit: "40", chinese: "四十" },
    { digit: "41", chinese: "四十一" },
    { digit: "42", chinese: "四十二" },
    { digit: "43", chinese: "四十三" },
    { digit: "44", chinese: "四十四" },
    { digit: "45", chinese: "四十五" },
    { digit: "46", chinese: "四十六" },
    { digit: "47", chinese: "四十七" },
    { digit: "48", chinese: "四十八" },
    { digit: "49", chinese: "四十九" },
    { digit: "50", chinese: "五十" },
    { digit: "51", chinese: "五十一" },
    { digit: "52", chinese: "五十二" },
    { digit: "53", chinese: "五十三" },
    { digit: "54", chinese: "五十四" },
    { digit: "55", chinese: "五十五" },
    { digit: "56", chinese: "五十六" },
    { digit: "57", chinese: "五十七" },
    { digit: "58", chinese: "五十八" },
    { digit: "59", chinese: "五十九" },
    { digit: "60", chinese: "六十" },
    { digit: "61", chinese: "六十一" },
    { digit: "62", chinese: "六十二" },
    { digit: "63", chinese: "六十三" },
    { digit: "64", chinese: "六十四" },
    { digit: "65", chinese: "六十五" },
    { digit: "66", chinese: "六十六" },
    { digit: "67", chinese: "六十七" },
    { digit: "68", chinese: "六十八" },
    { digit: "69", chinese: "六十九" },
    { digit: "70", chinese: "七十" },
    { digit: "71", chinese: "七十一" },
    { digit: "72", chinese: "七十二" },
    { digit: "73", chinese: "七十三" },
    { digit: "74", chinese: "七十四" },
    { digit: "75", chinese: "七十五" },
    { digit: "76", chinese: "七十六" },
    { digit: "77", chinese: "七十七" },
    { digit: "78", chinese: "七十八" },
    { digit: "79", chinese: "七十九" },
    { digit: "80", chinese: "八十" },
    { digit: "81", chinese: "八十一" },
    { digit: "82", chinese: "八十二" },
    { digit: "83", chinese: "八十三" },
    { digit: "84", chinese: "八十四" },
    { digit: "85", chinese: "八十五" },
    { digit: "86", chinese: "八十六" },
    { digit: "87", chinese: "八十七" },
    { digit: "88", chinese: "八十八" },
    { digit: "89", chinese: "八十九" },
    { digit: "90", chinese: "九十" },
    { digit: "91", chinese: "九十一" },
    { digit: "92", chinese: "九十二" },
    { digit: "93", chinese: "九十三" },
    { digit: "94", chinese: "九十四" },
    { digit: "95", chinese: "九十五" },
    { digit: "96", chinese: "九十六" },
    { digit: "97", chinese: "九十七" },
    { digit: "98", chinese: "九十八" },
    { digit: "99", chinese: "九十九" },
    { digit: "100", chinese: "一百" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Chinese number: ${numbers[index].chinese}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            中文数字 (Chinese Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Chinese
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
              <div className="text-2xl font-semibold text-center">{number.chinese}</div>
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

export default ChineseNumbers;
