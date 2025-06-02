
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const FrenchWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { english: "Hello", french: "Bonjour", pronunciation: "/bon.ʒuʁ/", example: "Hello, how are you? - Bonjour, comment allez-vous?" },
    { english: "Thank you", french: "Merci", pronunciation: "/mɛʁ.si/", example: "Thank you very much - Merci beaucoup" },
    { english: "Water", french: "Eau", pronunciation: "/o/", example: "I need water - J'ai besoin d'eau" },
    { english: "Food", french: "Nourriture", pronunciation: "/nu.ʁi.tyʁ/", example: "The food is tasty - La nourriture est délicieuse" },
    { english: "House", french: "Maison", pronunciation: "/mɛ.zɔ̃/", example: "My house is big - Ma maison est grande" },
    { english: "School", french: "École", pronunciation: "/e.kɔl/", example: "I go to school - Je vais à l'école" },
    { english: "Mother", french: "Mère", pronunciation: "/mɛʁ/", example: "My mother is kind - Ma mère est gentille" },
    { english: "Father", french: "Père", pronunciation: "/pɛʁ/", example: "Father is working - Père travaille" },
    { english: "Friend", french: "Ami", pronunciation: "/a.mi/", example: "He is my friend - Il est mon ami" },
    { english: "Book", french: "Livre", pronunciation: "/livʁ/", example: "I read books - Je lis des livres" },
    { english: "Love", french: "Amour", pronunciation: "/a.muʁ/", example: "Love is beautiful - L'amour est beau" },
    { english: "Happy", french: "Heureux", pronunciation: "/ø.ʁø/", example: "I am happy - Je suis heureux" },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Common Words in French</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your vocabulary with essential French words
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{word.english}</div>
                  <div className="text-3xl font-semibold">{word.french}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-muted-foreground mb-3 italic">{word.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Example:</strong><br />
                {word.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrenchWords;
