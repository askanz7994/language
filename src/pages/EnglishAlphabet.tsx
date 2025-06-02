
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const EnglishAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { letter: "A", lowercase: "a", phonetic: "ay" },
    { letter: "B", lowercase: "b", phonetic: "bee" },
    { letter: "C", lowercase: "c", phonetic: "see" },
    { letter: "D", lowercase: "d", phonetic: "dee" },
    { letter: "E", lowercase: "e", phonetic: "ee" },
    { letter: "F", lowercase: "f", phonetic: "ef" },
    { letter: "G", lowercase: "g", phonetic: "jee" },
    { letter: "H", lowercase: "h", phonetic: "aych" },
    { letter: "I", lowercase: "i", phonetic: "eye" },
    { letter: "J", lowercase: "j", phonetic: "jay" },
    { letter: "K", lowercase: "k", phonetic: "kay" },
    { letter: "L", lowercase: "l", phonetic: "el" },
    { letter: "M", lowercase: "m", phonetic: "em" },
    { letter: "N", lowercase: "n", phonetic: "en" },
    { letter: "O", lowercase: "o", phonetic: "oh" },
    { letter: "P", lowercase: "p", phonetic: "pee" },
    { letter: "Q", lowercase: "q", phonetic: "cue" },
    { letter: "R", lowercase: "r", phonetic: "ar" },
    { letter: "S", lowercase: "s", phonetic: "ess" },
    { letter: "T", lowercase: "t", phonetic: "tee" },
    { letter: "U", lowercase: "u", phonetic: "you" },
    { letter: "V", lowercase: "v", phonetic: "vee" },
    { letter: "W", lowercase: "w", phonetic: "double-you" },
    { letter: "X", lowercase: "x", phonetic: "ex" },
    { letter: "Y", lowercase: "y", phonetic: "why" },
    { letter: "Z", lowercase: "z", phonetic: "zee" },
  ];

  const currentItem = alphabet[currentLetter];

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
            Learn the 26 letters of the English alphabet
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.letter}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.lowercase}</div>
            <div className="text-2xl text-muted-foreground mb-6">Pronunciation: {currentItem.phonetic}</div>
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

export default EnglishAlphabet;
