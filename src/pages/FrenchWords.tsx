
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const FrenchWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "je", "tu", "il", "elle", "nous", "vous", "ils", "ceci", "cela", "quoi",
    "qui", "où", "quand", "pourquoi", "comment", "oui", "non", "s'il vous plaît", "merci", "désolé",
    "nom", "maison", "eau", "nourriture", "temps", "jour", "nuit", "matin", "soir", "année",
    "mois", "semaine", "aujourd'hui", "demain", "hier", "mère", "père", "frère", "sœur", "enfant",
    "homme", "femme", "ami", "professeur", "docteur", "livre", "stylo", "papier", "table", "chaise",
    "chambre", "porte", "fenêtre", "plafond", "sol", "route", "voiture", "train", "avion", "arbre",
    "fleur", "feuille", "fruit", "légume", "riz", "pain", "lait", "thé", "café", "sucre",
    "sel", "huile", "viande", "poisson", "œuf", "rouge", "blanc", "noir", "bleu", "vert",
    "jaune", "rose", "brun", "petit", "grand", "nouveau", "vieux", "chaud", "froid", "bon",
    "mauvais", "heureux", "triste", "rapide", "lent", "au-dessus", "en dessous", "à l'intérieur", "à l'extérieur", "ici"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for French word: ${words[index]}`);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mots Français (French Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn French words
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{word}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrenchWords;
