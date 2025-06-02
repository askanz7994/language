
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";

const EnglishAlphabet = () => {
  const letters = [
    { letter: "A", lowercase: "a", pronunciation: "ay" },
    { letter: "B", lowercase: "b", pronunciation: "bee" },
    { letter: "C", lowercase: "c", pronunciation: "see" },
    { letter: "D", lowercase: "d", pronunciation: "dee" },
    { letter: "E", lowercase: "e", pronunciation: "ee" },
    { letter: "F", lowercase: "f", pronunciation: "eff" },
    { letter: "G", lowercase: "g", pronunciation: "jee" },
    { letter: "H", lowercase: "h", pronunciation: "aych" },
    { letter: "I", lowercase: "i", pronunciation: "eye" },
    { letter: "J", lowercase: "j", pronunciation: "jay" },
    { letter: "K", lowercase: "k", pronunciation: "kay" },
    { letter: "L", lowercase: "l", pronunciation: "ell" },
    { letter: "M", lowercase: "m", pronunciation: "emm" },
    { letter: "N", lowercase: "n", pronunciation: "enn" },
    { letter: "O", lowercase: "o", pronunciation: "oh" },
    { letter: "P", lowercase: "p", pronunciation: "pee" },
    { letter: "Q", lowercase: "q", pronunciation: "cue" },
    { letter: "R", lowercase: "r", pronunciation: "are" },
    { letter: "S", lowercase: "s", pronunciation: "ess" },
    { letter: "T", lowercase: "t", pronunciation: "tee" },
    { letter: "U", lowercase: "u", pronunciation: "you" },
    { letter: "V", lowercase: "v", pronunciation: "vee" },
    { letter: "W", lowercase: "w", pronunciation: "double-you" },
    { letter: "X", lowercase: "x", pronunciation: "eks" },
    { letter: "Y", lowercase: "y", pronunciation: "why" },
    { letter: "Z", lowercase: "z", pronunciation: "zee" }
  ];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">English Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the English alphabet with pronunciation guide
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
          <Link to="/english/numbers">
            <Button className="glow-button">
              Next: Learn Numbers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnglishAlphabet;
