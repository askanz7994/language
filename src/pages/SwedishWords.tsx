
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const SwedishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "jag", "du", "han", "hon", "vi", "ni", "de", "detta", "det", "vad",
    "vem", "var", "när", "varför", "hur", "ja", "nej", "snälla", "tack", "förlåt",
    "namn", "hus", "vatten", "mat", "tid", "dag", "natt", "morgon", "kväll", "år",
    "månad", "vecka", "idag", "imorgon", "igår", "mamma", "pappa", "bror", "syster", "barn",
    "man", "kvinna", "vän", "lärare", "läkare", "bok", "penna", "papper", "bord", "stol",
    "rum", "dörr", "fönster", "tak", "golv", "väg", "bil", "tåg", "flygplan", "träd",
    "blomma", "blad", "frukt", "grönsak", "ris", "bröd", "mjölk", "te", "kaffe", "socker",
    "salt", "olja", "kött", "fisk", "ägg", "röd", "vit", "svart", "blå", "grön",
    "gul", "rosa", "brun", "liten", "stor", "ny", "gammal", "varm", "kall", "bra",
    "dålig", "glad", "ledsen", "snabb", "långsam", "ovanför", "under", "inne", "ute", "här"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Swedish word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-swedish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Swedish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Svenska ord (Swedish Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Swedish words
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

export default SwedishWords;
