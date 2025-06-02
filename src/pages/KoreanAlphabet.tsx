
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const KoreanAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { korean: "ㄱ", romanization: "g/k", name: "giyeok" },
    { korean: "ㄴ", romanization: "n", name: "nieun" },
    { korean: "ㄷ", romanization: "d/t", name: "digeut" },
    { korean: "ㄹ", romanization: "r/l", name: "rieul" },
    { korean: "ㅁ", romanization: "m", name: "mieum" },
    { korean: "ㅂ", romanization: "b/p", name: "bieup" },
    { korean: "ㅅ", romanization: "s", name: "siot" },
    { korean: "ㅇ", romanization: "ng", name: "ieung" },
    { korean: "ㅈ", romanization: "j", name: "jieut" },
    { korean: "ㅊ", romanization: "ch", name: "chieut" },
    { korean: "ㅋ", romanization: "k", name: "kieuk" },
    { korean: "ㅌ", romanization: "t", name: "tieut" },
    { korean: "ㅍ", romanization: "p", name: "pieup" },
    { korean: "ㅎ", romanization: "h", name: "hieut" },
    { korean: "ㅏ", romanization: "a", name: "a" },
    { korean: "ㅑ", romanization: "ya", name: "ya" },
    { korean: "ㅓ", romanization: "eo", name: "eo" },
    { korean: "ㅕ", romanization: "yeo", name: "yeo" },
    { korean: "ㅗ", romanization: "o", name: "o" },
    { korean: "ㅛ", romanization: "yo", name: "yo" },
    { korean: "ㅜ", romanization: "u", name: "u" },
    { korean: "ㅠ", romanization: "yu", name: "yu" },
    { korean: "ㅡ", romanization: "eu", name: "eu" },
    { korean: "ㅣ", romanization: "i", name: "i" },
  ];

  const currentItem = alphabet[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Korean Alphabet (Hangul)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Korean writing system - Hangul
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.korean}</div>
            <div className="text-3xl font-bold mb-4">{currentItem.name}</div>
            <div className="text-2xl text-muted-foreground mb-6">Romanization: {currentItem.romanization}</div>
            <Button className="glow-button mb-6">
              <Volume2 className="mr-2 h-4 w-4" />
              Play Sound
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentLetter(Math.max(0, currentLetter - 1))}
              disabled={currentLetter === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentLetter + 1} of {alphabet.length}
            </span>
            
            <Button 
              onClick={() => setCurrentLetter(Math.min(alphabet.length - 1, currentLetter + 1))}
              disabled={currentLetter === alphabet.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoreanAlphabet;
