
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";

const SpanishAlphabet = () => {
  const letters = [
    { letter: "A", lowercase: "a", pronunciation: "ah" },
    { letter: "B", lowercase: "b", pronunciation: "bay" },
    { letter: "C", lowercase: "c", pronunciation: "say" },
    { letter: "D", lowercase: "d", pronunciation: "day" },
    { letter: "E", lowercase: "e", pronunciation: "ay" },
    { letter: "F", lowercase: "f", pronunciation: "eh-fay" },
    { letter: "G", lowercase: "g", pronunciation: "hay" },
    { letter: "H", lowercase: "h", pronunciation: "ah-chay" },
    { letter: "I", lowercase: "i", pronunciation: "ee" },
    { letter: "J", lowercase: "j", pronunciation: "ho-tah" },
    { letter: "K", lowercase: "k", pronunciation: "kah" },
    { letter: "L", lowercase: "l", pronunciation: "eh-lay" },
    { letter: "M", lowercase: "m", pronunciation: "eh-may" },
    { letter: "N", lowercase: "n", pronunciation: "eh-nay" },
    { letter: "Ñ", lowercase: "ñ", pronunciation: "eh-nyay" },
    { letter: "O", lowercase: "o", pronunciation: "oh" },
    { letter: "P", lowercase: "p", pronunciation: "pay" },
    { letter: "Q", lowercase: "q", pronunciation: "koo" },
    { letter: "R", lowercase: "r", pronunciation: "eh-ray" },
    { letter: "S", lowercase: "s", pronunciation: "eh-say" },
    { letter: "T", lowercase: "t", pronunciation: "tay" },
    { letter: "U", lowercase: "u", pronunciation: "oo" },
    { letter: "V", lowercase: "v", pronunciation: "bay" },
    { letter: "W", lowercase: "w", pronunciation: "doh-blay bay" },
    { letter: "X", lowercase: "x", pronunciation: "eh-kees" },
    { letter: "Y", lowercase: "y", pronunciation: "ee gree-ay-gah" },
    { letter: "Z", lowercase: "z", pronunciation: "say-tah" }
  ];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-spanish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Spanish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Spanish Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Spanish alphabet with pronunciation guide
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
          <Link to="/spanish/numbers">
            <Button className="glow-button">
              Next: Learn Numbers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpanishAlphabet;
