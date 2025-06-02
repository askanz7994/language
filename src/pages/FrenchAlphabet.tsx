
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const FrenchAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { letter: "A", lowercase: "a", pronunciation: "ah" },
    { letter: "B", lowercase: "b", pronunciation: "bay" },
    { letter: "C", lowercase: "c", pronunciation: "say" },
    { letter: "D", lowercase: "d", pronunciation: "day" },
    { letter: "E", lowercase: "e", pronunciation: "uh" },
    { letter: "F", lowercase: "f", pronunciation: "eff" },
    { letter: "G", lowercase: "g", pronunciation: "zhay" },
    { letter: "H", lowercase: "h", pronunciation: "ahsh" },
    { letter: "I", lowercase: "i", pronunciation: "ee" },
    { letter: "J", lowercase: "j", pronunciation: "zhee" },
    { letter: "K", lowercase: "k", pronunciation: "kah" },
    { letter: "L", lowercase: "l", pronunciation: "ell" },
    { letter: "M", lowercase: "m", pronunciation: "emm" },
    { letter: "N", lowercase: "n", pronunciation: "enn" },
    { letter: "O", lowercase: "o", pronunciation: "oh" },
    { letter: "P", lowercase: "p", pronunciation: "pay" },
    { letter: "Q", lowercase: "q", pronunciation: "koo" },
    { letter: "R", lowercase: "r", pronunciation: "air" },
    { letter: "S", lowercase: "s", pronunciation: "ess" },
    { letter: "T", lowercase: "t", pronunciation: "tay" },
    { letter: "U", lowercase: "u", pronunciation: "oo" },
    { letter: "V", lowercase: "v", pronunciation: "vay" },
    { letter: "W", lowercase: "w", pronunciation: "doo-bluh-vay" },
    { letter: "X", lowercase: "x", pronunciation: "eeks" },
    { letter: "Y", lowercase: "y", pronunciation: "ee-grek" },
    { letter: "Z", lowercase: "z", pronunciation: "zed" },
  ];

  const currentItem = alphabet[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-french" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn French
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">French Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the 26 letters of the French alphabet
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.letter}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.lowercase}</div>
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

export default FrenchAlphabet;
