
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const FrenchNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", french: "Zéro", pronunciation: "/ze.ʁo/", example: "0 livres - Zéro livre" },
    { digit: "1", french: "Un", pronunciation: "/œ̃/", example: "1 pomme - Une pomme" },
    { digit: "2", french: "Deux", pronunciation: "/dø/", example: "2 chats - Deux chats" },
    { digit: "3", french: "Trois", pronunciation: "/tʁwa/", example: "3 oiseaux - Trois oiseaux" },
    { digit: "4", french: "Quatre", pronunciation: "/katʁ/", example: "4 fleurs - Quatre fleurs" },
    { digit: "5", french: "Cinq", pronunciation: "/sɛ̃k/", example: "5 arbres - Cinq arbres" },
    { digit: "6", french: "Six", pronunciation: "/sis/", example: "6 étoiles - Six étoiles" },
    { digit: "7", french: "Sept", pronunciation: "/sɛt/", example: "7 jours - Sept jours" },
    { digit: "8", french: "Huit", pronunciation: "/ɥit/", example: "8 heures - Huit heures" },
    { digit: "9", french: "Neuf", pronunciation: "/nœf/", example: "9 mois - Neuf mois" },
    { digit: "10", french: "Dix", pronunciation: "/dis/", example: "10 doigts - Dix doigts" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-french" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to French
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Numbers in French</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and pronounce numbers in French
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
              <div className="text-3xl mb-2 font-semibold">{number.french}</div>
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

export default FrenchNumbers;
