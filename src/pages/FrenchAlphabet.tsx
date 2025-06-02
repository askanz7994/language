
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";

const FrenchAlphabet = () => {
  const letters = [
    { letter: "A", lowercase: "a", pronunciation: "ah" },
    { letter: "B", lowercase: "b", pronunciation: "bay" },
    { letter: "C", lowercase: "c", pronunciation: "say" },
    { letter: "D", lowercase: "d", pronunciation: "day" },
    { letter: "E", lowercase: "e", pronunciation: "uh" },
    { letter: "F", lowercase: "f", pronunciation: "eff" },
    { letter: "G", lowercase: "g", pronunciation: "zhay" },
    { letter: "H", lowercase: "h", pronunciation: "ash" },
    { letter: "I", lowercase: "i", pronunciation: "ee" },
    { letter: "J", lowercase: "j", pronunciation: "zhee" },
    { letter: "K", lowercase: "k", pronunciation: "kah" },
    { letter: "L", lowercase: "l", pronunciation: "ell" },
    { letter: "M", lowercase: "m", pronunciation: "emm" },
    { letter: "N", lowercase: "n", pronunciation: "enn" },
    { letter: "O", lowercase: "o", pronunciation: "oh" },
    { letter: "P", lowercase: "p", pronunciation: "pay" },
    { letter: "Q", lowercase: "q", pronunciation: "kü" },
    { letter: "R", lowercase: "r", pronunciation: "err" },
    { letter: "S", lowercase: "s", pronunciation: "ess" },
    { letter: "T", lowercase: "t", pronunciation: "tay" },
    { letter: "U", lowercase: "u", pronunciation: "ü" },
    { letter: "V", lowercase: "v", pronunciation: "vay" },
    { letter: "W", lowercase: "w", pronunciation: "doo-bluh-vay" },
    { letter: "X", lowercase: "x", pronunciation: "eeks" },
    { letter: "Y", lowercase: "y", pronunciation: "ee-grek" },
    { letter: "Z", lowercase: "z", pronunciation: "zed" }
  ];

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
            Learn the French alphabet with pronunciation guide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-16">
          {letters.map((letter, index) => (
            <div key={index} className="language-card text-center p-6">
              <div className="text-4xl font-bold mb-2">{letter.letter}{letter.lowercase}</div>
              <div className="text-lg font-semibold text-primary mb-1">{letter.pronunciation}</div>
              <Button variant="ghost" size="sm" className="mt-2">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/french/numbers">
            <Button className="glow-button">
              Next: Learn Numbers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrenchAlphabet;
