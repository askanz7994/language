
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const HindiAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { devanagari: "अ", romanization: "a", type: "vowel" },
    { devanagari: "आ", romanization: "aa", type: "vowel" },
    { devanagari: "इ", romanization: "i", type: "vowel" },
    { devanagari: "ई", romanization: "ii", type: "vowel" },
    { devanagari: "उ", romanization: "u", type: "vowel" },
    { devanagari: "ऊ", romanization: "uu", type: "vowel" },
    { devanagari: "ए", romanization: "e", type: "vowel" },
    { devanagari: "ऐ", romanization: "ai", type: "vowel" },
    { devanagari: "ओ", romanization: "o", type: "vowel" },
    { devanagari: "औ", romanization: "au", type: "vowel" },
    { devanagari: "क", romanization: "ka", type: "consonant" },
    { devanagari: "ख", romanization: "kha", type: "consonant" },
    { devanagari: "ग", romanization: "ga", type: "consonant" },
    { devanagari: "घ", romanization: "gha", type: "consonant" },
    { devanagari: "च", romanization: "cha", type: "consonant" },
    { devanagari: "छ", romanization: "chha", type: "consonant" },
    { devanagari: "ज", romanization: "ja", type: "consonant" },
    { devanagari: "झ", romanization: "jha", type: "consonant" },
    { devanagari: "ट", romanization: "ta", type: "consonant" },
    { devanagari: "ठ", romanization: "tha", type: "consonant" },
    { devanagari: "ड", romanization: "da", type: "consonant" },
    { devanagari: "ढ", romanization: "dha", type: "consonant" },
    { devanagari: "त", romanization: "ta", type: "consonant" },
    { devanagari: "थ", romanization: "tha", type: "consonant" },
    { devanagari: "द", romanization: "da", type: "consonant" },
    { devanagari: "ध", romanization: "dha", type: "consonant" },
    { devanagari: "न", romanization: "na", type: "consonant" },
    { devanagari: "प", romanization: "pa", type: "consonant" },
    { devanagari: "फ", romanization: "pha", type: "consonant" },
    { devanagari: "ब", romanization: "ba", type: "consonant" },
    { devanagari: "भ", romanization: "bha", type: "consonant" },
    { devanagari: "म", romanization: "ma", type: "consonant" },
    { devanagari: "य", romanization: "ya", type: "consonant" },
    { devanagari: "र", romanization: "ra", type: "consonant" },
    { devanagari: "ल", romanization: "la", type: "consonant" },
    { devanagari: "व", romanization: "va", type: "consonant" },
    { devanagari: "श", romanization: "sha", type: "consonant" },
    { devanagari: "स", romanization: "sa", type: "consonant" },
    { devanagari: "ह", romanization: "ha", type: "consonant" },
  ];

  const currentItem = alphabet[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Hindi Alphabet (Devanagari)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Devanagari script used for Hindi
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.devanagari}</div>
            <div className="text-3xl font-bold mb-4 capitalize">{currentItem.type}</div>
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

export default HindiAlphabet;
