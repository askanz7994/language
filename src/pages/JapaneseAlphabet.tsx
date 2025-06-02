
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const JapaneseAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const hiragana = [
    { hiragana: "あ", romanization: "a", katakana: "ア" },
    { hiragana: "い", romanization: "i", katakana: "イ" },
    { hiragana: "う", romanization: "u", katakana: "ウ" },
    { hiragana: "え", romanization: "e", katakana: "エ" },
    { hiragana: "お", romanization: "o", katakana: "オ" },
    { hiragana: "か", romanization: "ka", katakana: "カ" },
    { hiragana: "き", romanization: "ki", katakana: "キ" },
    { hiragana: "く", romanization: "ku", katakana: "ク" },
    { hiragana: "け", romanization: "ke", katakana: "ケ" },
    { hiragana: "こ", romanization: "ko", katakana: "コ" },
    { hiragana: "さ", romanization: "sa", katakana: "サ" },
    { hiragana: "し", romanization: "shi", katakana: "シ" },
    { hiragana: "す", romanization: "su", katakana: "ス" },
    { hiragana: "せ", romanization: "se", katakana: "セ" },
    { hiragana: "そ", romanization: "so", katakana: "ソ" },
    { hiragana: "た", romanization: "ta", katakana: "タ" },
    { hiragana: "ち", romanization: "chi", katakana: "チ" },
    { hiragana: "つ", romanization: "tsu", katakana: "ツ" },
    { hiragana: "て", romanization: "te", katakana: "テ" },
    { hiragana: "と", romanization: "to", katakana: "ト" },
    { hiragana: "な", romanization: "na", katakana: "ナ" },
    { hiragana: "に", romanization: "ni", katakana: "ニ" },
    { hiragana: "ぬ", romanization: "nu", katakana: "ヌ" },
    { hiragana: "ね", romanization: "ne", katakana: "ネ" },
    { hiragana: "の", romanization: "no", katakana: "ノ" },
  ];

  const currentItem = hiragana[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Japanese Hiragana</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the basic Japanese syllabary - Hiragana
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.hiragana}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.katakana}</div>
            <div className="text-xl text-muted-foreground mb-2">Katakana</div>
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
              {currentLetter + 1} of {hiragana.length}
            </span>
            
            <Button 
              onClick={() => setCurrentLetter(Math.min(hiragana.length - 1, currentLetter + 1))}
              disabled={currentLetter === hiragana.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseAlphabet;
