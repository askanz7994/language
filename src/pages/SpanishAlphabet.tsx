
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const SpanishAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const alphabet = [
    { letter: "A", lowercase: "a", pronunciation: "/a/", example: "Agua - Water" },
    { letter: "B", lowercase: "b", pronunciation: "/be/", example: "Beso - Kiss" },
    { letter: "C", lowercase: "c", pronunciation: "/θe/ or /se/", example: "Casa - House" },
    { letter: "D", lowercase: "d", pronunciation: "/de/", example: "Día - Day" },
    { letter: "E", lowercase: "e", pronunciation: "/e/", example: "Estrella - Star" },
    { letter: "F", lowercase: "f", pronunciation: "/efe/", example: "Familia - Family" },
    { letter: "G", lowercase: "g", pronunciation: "/xe/", example: "Gato - Cat" },
    { letter: "H", lowercase: "h", pronunciation: "/atʃe/", example: "Hola - Hello" },
    { letter: "I", lowercase: "i", pronunciation: "/i/", example: "Isla - Island" },
    { letter: "J", lowercase: "j", pronunciation: "/xota/", example: "Jardín - Garden" },
    { letter: "K", lowercase: "k", pronunciation: "/ka/", example: "Kilo - Kilo" },
    { letter: "L", lowercase: "l", pronunciation: "/ele/", example: "Luna - Moon" },
    { letter: "M", lowercase: "m", pronunciation: "/eme/", example: "Madre - Mother" },
    { letter: "N", lowercase: "n", pronunciation: "/ene/", example: "Niño - Child" },
    { letter: "Ñ", lowercase: "ñ", pronunciation: "/eɲe/", example: "Niña - Girl" },
    { letter: "O", lowercase: "o", pronunciation: "/o/", example: "Ojo - Eye" },
    { letter: "P", lowercase: "p", pronunciation: "/pe/", example: "Padre - Father" },
    { letter: "Q", lowercase: "q", pronunciation: "/ku/", example: "Queso - Cheese" },
    { letter: "R", lowercase: "r", pronunciation: "/ere/", example: "Rosa - Rose" },
    { letter: "S", lowercase: "s", pronunciation: "/ese/", example: "Sol - Sun" },
    { letter: "T", lowercase: "t", pronunciation: "/te/", example: "Tiempo - Time" },
    { letter: "U", lowercase: "u", pronunciation: "/u/", example: "Uva - Grape" },
    { letter: "V", lowercase: "v", pronunciation: "/ube/", example: "Vida - Life" },
    { letter: "W", lowercase: "w", pronunciation: "/ube doble/", example: "Washington - Washington" },
    { letter: "X", lowercase: "x", pronunciation: "/ekis/", example: "Xilófono - Xylophone" },
    { letter: "Y", lowercase: "y", pronunciation: "/i griega/", example: "Yo - I" },
    { letter: "Z", lowercase: "z", pronunciation: "/θeta/ or /seta/", example: "Zapato - Shoe" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-spanish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Spanish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Spanish Alphabet (Alfabeto Español)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn all 27 letters of the Spanish alphabet including the unique Ñ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {alphabet.map((letter, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-primary">{letter.letter}</div>
                  <div className="text-3xl text-muted-foreground">{letter.lowercase}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-2xl mb-2 font-semibold">{letter.letter}</div>
              <div className="text-muted-foreground mb-3 italic">{letter.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Ejemplo:</strong> {letter.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpanishAlphabet;
