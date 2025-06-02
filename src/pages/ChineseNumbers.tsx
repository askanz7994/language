
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const ChineseNumbers = () => {
  const [currentNumber, setCurrentNumber] = useState(1);

  const numbers = [
    { number: 1, chinese: "一", pinyin: "yī" },
    { number: 2, chinese: "二", pinyin: "èr" },
    { number: 3, chinese: "三", pinyin: "sān" },
    { number: 4, chinese: "四", pinyin: "sì" },
    { number: 5, chinese: "五", pinyin: "wǔ" },
    { number: 6, chinese: "六", pinyin: "liù" },
    { number: 7, chinese: "七", pinyin: "qī" },
    { number: 8, chinese: "八", pinyin: "bā" },
    { number: 9, chinese: "九", pinyin: "jiǔ" },
    { number: 10, chinese: "十", pinyin: "shí" },
  ];

  const currentItem = numbers[currentNumber - 1];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Chinese Numbers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count from 1 to 10 in Chinese
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.chinese}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.number}</div>
            <div className="text-2xl text-muted-foreground mb-6">Pinyin: {currentItem.pinyin}</div>
            <Button className="glow-button mb-6">
              <Volume2 className="mr-2 h-4 w-4" />
              Play Sound
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentNumber(Math.max(1, currentNumber - 1))}
              disabled={currentNumber === 1}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentNumber} of {numbers.length}
            </span>
            
            <Button 
              onClick={() => setCurrentNumber(Math.min(numbers.length, currentNumber + 1))}
              disabled={currentNumber === numbers.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChineseNumbers;
