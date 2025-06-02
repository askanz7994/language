
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ItalianWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "io", "tu", "lui", "lei", "noi", "voi", "loro", "questo", "quello", "cosa",
    "chi", "dove", "quando", "perché", "come", "sì", "no", "per favore", "grazie", "scusa",
    "nome", "casa", "acqua", "cibo", "tempo", "giorno", "notte", "mattina", "sera", "anno",
    "mese", "settimana", "oggi", "domani", "ieri", "mamma", "papà", "fratello", "sorella", "bambino",
    "uomo", "donna", "amico", "insegnante", "dottore", "libro", "penna", "carta", "tavolo", "sedia",
    "stanza", "porta", "finestra", "soffitto", "pavimento", "strada", "macchina", "treno", "aereo", "albero",
    "fiore", "foglia", "frutta", "verdura", "riso", "pane", "latte", "tè", "caffè", "zucchero",
    "sale", "olio", "carne", "pesce", "uovo", "rosso", "bianco", "nero", "blu", "verde",
    "giallo", "rosa", "marrone", "piccolo", "grande", "nuovo", "vecchio", "caldo", "freddo", "buono",
    "cattivo", "felice", "triste", "veloce", "lento", "sopra", "sotto", "dentro", "fuori", "qui"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Italian word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-italian" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Italian
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Parole Italiane (Italian Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Italian words
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

export default ItalianWords;
