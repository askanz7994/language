
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const GermanNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", german: "Null", pronunciation: "/nʊl/", example: "0 Bücher - Null Bücher" },
    { digit: "1", german: "Eins", pronunciation: "/aɪns/", example: "1 Apfel - Ein Apfel" },
    { digit: "2", german: "Zwei", pronunciation: "/tsvaɪ/", example: "2 Katzen - Zwei Katzen" },
    { digit: "3", german: "Drei", pronunciation: "/draɪ/", example: "3 Vögel - Drei Vögel" },
    { digit: "4", german: "Vier", pronunciation: "/fiːɐ̯/", example: "4 Blumen - Vier Blumen" },
    { digit: "5", german: "Fünf", pronunciation: "/fʏnf/", example: "5 Bäume - Fünf Bäume" },
    { digit: "6", german: "Sechs", pronunciation: "/zɛks/", example: "6 Sterne - Sechs Sterne" },
    { digit: "7", german: "Sieben", pronunciation: "/ˈziːbən/", example: "7 Tage - Sieben Tage" },
    { digit: "8", german: "Acht", pronunciation: "/axt/", example: "8 Stunden - Acht Stunden" },
    { digit: "9", german: "Neun", pronunciation: "/nɔʏn/", example: "9 Monate - Neun Monate" },
    { digit: "10", german: "Zehn", pronunciation: "/tseːn/", example: "10 Finger - Zehn Finger" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-german" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to German
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Numbers in German</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and pronounce numbers in German
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
              <div className="text-3xl mb-2 font-semibold">{number.german}</div>
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

export default GermanNumbers;
