
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const DutchWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "ik", "jij", "hij", "zij", "wij", "jullie", "zij", "dit", "dat", "wat",
    "wie", "waar", "wanneer", "waarom", "hoe", "ja", "nee", "alsjeblieft", "dank je", "sorry",
    "naam", "huis", "water", "eten", "tijd", "dag", "nacht", "ochtend", "avond", "jaar",
    "maand", "week", "vandaag", "morgen", "gisteren", "moeder", "vader", "broer", "zus", "kind",
    "man", "vrouw", "vriend", "leraar", "dokter", "boek", "pen", "papier", "tafel", "stoel",
    "kamer", "deur", "raam", "plafond", "vloer", "weg", "auto", "trein", "vliegtuig", "boom",
    "bloem", "blad", "fruit", "groente", "rijst", "brood", "melk", "thee", "koffie", "suiker",
    "zout", "olie", "vlees", "vis", "ei", "rood", "wit", "zwart", "blauw", "groen",
    "geel", "roze", "bruin", "klein", "groot", "nieuw", "oud", "heet", "koud", "goed",
    "slecht", "blij", "verdrietig", "snel", "langzaam", "boven", "onder", "binnen", "buiten", "hier"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Dutch word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-dutch" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dutch
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nederlandse woorden (Dutch Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Dutch words
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

export default DutchWords;
