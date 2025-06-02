
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const KoreanWords = () => {
  const [currentWord, setCurrentWord] = useState(0);

  const words = [
    { korean: "안녕하세요", romanization: "annyeonghaseyo", english: "Hello" },
    { korean: "감사합니다", romanization: "gamsahamnida", english: "Thank you" },
    { korean: "안녕히 가세요", romanization: "annyeonghi gaseyo", english: "Goodbye" },
    { korean: "죄송합니다", romanization: "joesonghamnida", english: "Sorry" },
    { korean: "네", romanization: "ne", english: "Yes" },
    { korean: "아니요", romanization: "aniyo", english: "No" },
    { korean: "집", romanization: "jip", english: "House/Home" },
    { korean: "친구", romanization: "chingu", english: "Friend" },
    { korean: "물", romanization: "mul", english: "Water" },
    { korean: "먹다", romanization: "meokda", english: "To eat" },
  ];

  const currentItem = words[currentWord];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Korean Words</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn essential Korean vocabulary
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.korean}</div>
            <div className="text-3xl font-bold mb-4">{currentItem.english}</div>
            <div className="text-xl text-muted-foreground mb-6">Romanization: {currentItem.romanization}</div>
            <Button className="glow-button mb-6">
              <Volume2 className="mr-2 h-4 w-4" />
              Play Sound
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentWord(Math.max(0, currentWord - 1))}
              disabled={currentWord === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentWord + 1} of {words.length}
            </span>
            
            <Button 
              onClick={() => setCurrentWord(Math.min(words.length - 1, currentWord + 1))}
              disabled={currentWord === words.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoreanWords;
