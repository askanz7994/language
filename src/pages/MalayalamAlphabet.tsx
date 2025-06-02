
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const MalayalamAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { malayalam: "അ", romanization: "a", type: "vowel" },
    { malayalam: "ആ", romanization: "aa", type: "vowel" },
    { malayalam: "ഇ", romanization: "i", type: "vowel" },
    { malayalam: "ഈ", romanization: "ii", type: "vowel" },
    { malayalam: "ഉ", romanization: "u", type: "vowel" },
    { malayalam: "ഊ", romanization: "uu", type: "vowel" },
    { malayalam: "ഋ", romanization: "ri", type: "vowel" },
    { malayalam: "എ", romanization: "e", type: "vowel" },
    { malayalam: "ഏ", romanization: "ee", type: "vowel" },
    { malayalam: "ഐ", romanization: "ai", type: "vowel" },
    { malayalam: "ഒ", romanization: "o", type: "vowel" },
    { malayalam: "ഓ", romanization: "oo", type: "vowel" },
    { malayalam: "ഔ", romanization: "au", type: "vowel" },
    { malayalam: "ക", romanization: "ka", type: "consonant" },
    { malayalam: "ഖ", romanization: "kha", type: "consonant" },
    { malayalam: "ഗ", romanization: "ga", type: "consonant" },
    { malayalam: "ഘ", romanization: "gha", type: "consonant" },
    { malayalam: "ങ", romanization: "nga", type: "consonant" },
    { malayalam: "ച", romanization: "cha", type: "consonant" },
    { malayalam: "ഛ", romanization: "chha", type: "consonant" },
    { malayalam: "ജ", romanization: "ja", type: "consonant" },
    { malayalam: "ഝ", romanization: "jha", type: "consonant" },
    { malayalam: "ഞ", romanization: "nya", type: "consonant" },
    { malayalam: "ട", romanization: "ta", type: "consonant" },
    { malayalam: "ഠ", romanization: "tha", type: "consonant" },
    { malayalam: "ഡ", romanization: "da", type: "consonant" },
    { malayalam: "ഢ", romanization: "dha", type: "consonant" },
    { malayalam: "ണ", romanization: "na", type: "consonant" },
    { malayalam: "ത", romanization: "tha", type: "consonant" },
    { malayalam: "ഥ", romanization: "thha", type: "consonant" },
    { malayalam: "ദ", romanization: "da", type: "consonant" },
    { malayalam: "ധ", romanization: "dha", type: "consonant" },
    { malayalam: "ന", romanization: "na", type: "consonant" },
    { malayalam: "പ", romanization: "pa", type: "consonant" },
    { malayalam: "ഫ", romanization: "pha", type: "consonant" },
    { malayalam: "ബ", romanization: "ba", type: "consonant" },
    { malayalam: "ഭ", romanization: "bha", type: "consonant" },
    { malayalam: "മ", romanization: "ma", type: "consonant" },
    { malayalam: "യ", romanization: "ya", type: "consonant" },
    { malayalam: "ര", romanization: "ra", type: "consonant" },
    { malayalam: "ല", romanization: "la", type: "consonant" },
    { malayalam: "വ", romanization: "va", type: "consonant" },
    { malayalam: "ശ", romanization: "sha", type: "consonant" },
    { malayalam: "ഷ", romanization: "shha", type: "consonant" },
    { malayalam: "സ", romanization: "sa", type: "consonant" },
    { malayalam: "ഹ", romanization: "ha", type: "consonant" },
    { malayalam: "ള", romanization: "la", type: "consonant" },
    { malayalam: "ഴ", romanization: "zha", type: "consonant" },
    { malayalam: "റ", romanization: "ra", type: "consonant" },
  ];

  const currentItem = alphabet[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Malayalam
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Malayalam Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the beautiful script of Malayalam
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.malayalam}</div>
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

export default MalayalamAlphabet;
