
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const KoreanNumbers = () => {
  const [currentNumber, setCurrentNumber] = useState(1);

  const numbers = [
    { number: 1, korean: "하나", hanja: "一", romanization: "hana" },
    { number: 2, korean: "둘", hanja: "二", romanization: "dul" },
    { number: 3, korean: "셋", hanja: "三", romanization: "set" },
    { number: 4, korean: "넷", hanja: "四", romanization: "net" },
    { number: 5, korean: "다섯", hanja: "五", romanization: "daseot" },
    { number: 6, korean: "여섯", hanja: "六", romanization: "yeoseot" },
    { number: 7, korean: "일곱", hanja: "七", romanization: "ilgop" },
    { number: 8, korean: "여덟", hanja: "八", romanization: "yeodeol" },
    { number: 9, korean: "아홉", hanja: "九", romanization: "ahop" },
    { number: 10, korean: "열", hanja: "十", romanization: "yeol" },
  ];

  const currentItem = numbers[currentNumber - 1];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Korean Numbers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count from 1 to 10 in Korean
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.korean}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.number}</div>
            <div className="text-2xl text-muted-foreground mb-6">Romanization: {currentItem.romanization}</div>
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

export default KoreanNumbers;
