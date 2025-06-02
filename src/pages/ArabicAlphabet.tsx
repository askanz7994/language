
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const ArabicAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { arabic: "ا", romanization: "alif", pronunciation: "a" },
    { arabic: "ب", romanization: "baa", pronunciation: "b" },
    { arabic: "ت", romanization: "taa", pronunciation: "t" },
    { arabic: "ث", romanization: "thaa", pronunciation: "th" },
    { arabic: "ج", romanization: "jeem", pronunciation: "j" },
    { arabic: "ح", romanization: "haa", pronunciation: "h" },
    { arabic: "خ", romanization: "khaa", pronunciation: "kh" },
    { arabic: "د", romanization: "daal", pronunciation: "d" },
    { arabic: "ذ", romanization: "dhaal", pronunciation: "dh" },
    { arabic: "ر", romanization: "raa", pronunciation: "r" },
    { arabic: "ز", romanization: "zaay", pronunciation: "z" },
    { arabic: "س", romanization: "seen", pronunciation: "s" },
    { arabic: "ش", romanization: "sheen", pronunciation: "sh" },
    { arabic: "ص", romanization: "saad", pronunciation: "s" },
    { arabic: "ض", romanization: "daad", pronunciation: "d" },
    { arabic: "ط", romanization: "taa", pronunciation: "t" },
    { arabic: "ظ", romanization: "dhaa", pronunciation: "dh" },
    { arabic: "ع", romanization: "ayn", pronunciation: "'" },
    { arabic: "غ", romanization: "ghayn", pronunciation: "gh" },
    { arabic: "ف", romanization: "faa", pronunciation: "f" },
    { arabic: "ق", romanization: "qaaf", pronunciation: "q" },
    { arabic: "ك", romanization: "kaaf", pronunciation: "k" },
    { arabic: "ل", romanization: "laam", pronunciation: "l" },
    { arabic: "م", romanization: "meem", pronunciation: "m" },
    { arabic: "ن", romanization: "noon", pronunciation: "n" },
    { arabic: "ه", romanization: "haa", pronunciation: "h" },
    { arabic: "و", romanization: "waaw", pronunciation: "w" },
    { arabic: "ي", romanization: "yaa", pronunciation: "y" },
  ];

  const currentItem = alphabet[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-arabic" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Arabic
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Arabic Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the 28 letters of the Arabic alphabet
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.arabic}</div>
            <div className="text-3xl font-bold mb-4">{currentItem.romanization}</div>
            <div className="text-2xl text-muted-foreground mb-6">Pronunciation: {currentItem.pronunciation}</div>
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

export default ArabicAlphabet;
