
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const JapaneseNumbers = () => {
  const [currentNumber, setCurrentNumber] = useState(1);

  const numbers = [
    { number: 1, hiragana: "いち", kanji: "一", romaji: "ichi" },
    { number: 2, hiragana: "に", kanji: "二", romaji: "ni" },
    { number: 3, hiragana: "さん", kanji: "三", romaji: "san" },
    { number: 4, hiragana: "よん", kanji: "四", romaji: "yon" },
    { number: 5, hiragana: "ご", kanji: "五", romaji: "go" },
    { number: 6, hiragana: "ろく", kanji: "六", romaji: "roku" },
    { number: 7, hiragana: "なな", kanji: "七", romaji: "nana" },
    { number: 8, hiragana: "はち", kanji: "八", romaji: "hachi" },
    { number: 9, hiragana: "きゅう", kanji: "九", romaji: "kyuu" },
    { number: 10, hiragana: "じゅう", kanji: "十", romaji: "juu" },
  ];

  const currentItem = numbers[currentNumber - 1];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Japanese Numbers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count from 1 to 10 in Japanese
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-4 text-primary">{currentItem.kanji}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.hiragana}</div>
            <div className="text-4xl font-bold mb-4">{currentItem.number}</div>
            <div className="text-2xl text-muted-foreground mb-6">Romaji: {currentItem.romaji}</div>
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

export default JapaneseNumbers;
