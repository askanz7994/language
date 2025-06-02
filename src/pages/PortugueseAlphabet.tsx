
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const PortugueseAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const alphabet = [
    { letter: "A", lowercase: "a", pronunciation: "/a/", example: "Amor - Love" },
    { letter: "B", lowercase: "b", pronunciation: "/be/", example: "Bom - Good" },
    { letter: "C", lowercase: "c", pronunciation: "/se/", example: "Casa - House" },
    { letter: "D", lowercase: "d", pronunciation: "/de/", example: "Dia - Day" },
    { letter: "E", lowercase: "e", pronunciation: "/e/", example: "Estrela - Star" },
    { letter: "F", lowercase: "f", pronunciation: "/efe/", example: "Família - Family" },
    { letter: "G", lowercase: "g", pronunciation: "/ʒe/", example: "Gato - Cat" },
    { letter: "H", lowercase: "h", pronunciation: "/aɡa/", example: "Hoje - Today" },
    { letter: "I", lowercase: "i", pronunciation: "/i/", example: "Ilha - Island" },
    { letter: "J", lowercase: "j", pronunciation: "/ʒɔta/", example: "Jardim - Garden" },
    { letter: "K", lowercase: "k", pronunciation: "/ka/", example: "Kilo - Kilo" },
    { letter: "L", lowercase: "l", pronunciation: "/ele/", example: "Lua - Moon" },
    { letter: "M", lowercase: "m", pronunciation: "/eme/", example: "Mãe - Mother" },
    { letter: "N", lowercase: "n", pronunciation: "/ene/", example: "Nome - Name" },
    { letter: "O", lowercase: "o", pronunciation: "/o/", example: "Olho - Eye" },
    { letter: "P", lowercase: "p", pronunciation: "/pe/", example: "Pai - Father" },
    { letter: "Q", lowercase: "q", pronunciation: "/ke/", example: "Quero - Want" },
    { letter: "R", lowercase: "r", pronunciation: "/ɛʁe/", example: "Rosa - Rose" },
    { letter: "S", lowercase: "s", pronunciation: "/ese/", example: "Sol - Sun" },
    { letter: "T", lowercase: "t", pronunciation: "/te/", example: "Tempo - Time" },
    { letter: "U", lowercase: "u", pronunciation: "/u/", example: "Uva - Grape" },
    { letter: "V", lowercase: "v", pronunciation: "/ve/", example: "Vida - Life" },
    { letter: "W", lowercase: "w", pronunciation: "/dabliu/", example: "WiFi - WiFi" },
    { letter: "X", lowercase: "x", pronunciation: "/ʃis/", example: "Xícara - Cup" },
    { letter: "Y", lowercase: "y", pronunciation: "/ípsilon/", example: "Yoga - Yoga" },
    { letter: "Z", lowercase: "z", pronunciation: "/ze/", example: "Zero - Zero" },
    { letter: "Ç", lowercase: "ç", pronunciation: "/se sedilha/", example: "Coração - Heart" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-portuguese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portuguese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portuguese Alphabet (Alfabeto Português)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn all 27 letters of the Portuguese alphabet including the cedilla (Ç)
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
                <strong>Exemplo:</strong> {letter.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortugueseAlphabet;
