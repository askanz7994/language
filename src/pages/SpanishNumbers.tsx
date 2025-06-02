
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const SpanishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", spanish: "Cero", pronunciation: "/ˈθe.ɾo/", example: "0 libros - Cero libros" },
    { digit: "1", spanish: "Uno", pronunciation: "/ˈu.no/", example: "1 manzana - Una manzana" },
    { digit: "2", spanish: "Dos", pronunciation: "/dos/", example: "2 gatos - Dos gatos" },
    { digit: "3", spanish: "Tres", pronunciation: "/tɾes/", example: "3 pájaros - Tres pájaros" },
    { digit: "4", spanish: "Cuatro", pronunciation: "/ˈkwa.tɾo/", example: "4 flores - Cuatro flores" },
    { digit: "5", spanish: "Cinco", pronunciation: "/ˈθin.ko/", example: "5 árboles - Cinco árboles" },
    { digit: "6", spanish: "Seis", pronunciation: "/sejs/", example: "6 estrellas - Seis estrellas" },
    { digit: "7", spanish: "Siete", pronunciation: "/ˈsje.te/", example: "7 días - Siete días" },
    { digit: "8", spanish: "Ocho", pronunciation: "/ˈo.t͡ʃo/", example: "8 horas - Ocho horas" },
    { digit: "9", spanish: "Nueve", pronunciation: "/ˈnwe.βe/", example: "9 meses - Nueve meses" },
    { digit: "10", spanish: "Diez", pronunciation: "/djeθ/", example: "10 dedos - Diez dedos" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-spanish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Spanish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Numbers in Spanish</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and pronounce numbers in Spanish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-3xl mb-2 font-semibold">{number.spanish}</div>
              <div className="text-muted-foreground mb-3 italic">{number.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Example:</strong> {number.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpanishNumbers;
