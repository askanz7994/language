
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const SpanishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { english: "Hello", spanish: "Hola", pronunciation: "/ˈo.la/", example: "Hello, how are you? - Hola, ¿cómo estás?" },
    { english: "Thank you", spanish: "Gracias", pronunciation: "/ˈɡɾa.θjas/", example: "Thank you very much - Muchas gracias" },
    { english: "Water", spanish: "Agua", pronunciation: "/ˈa.ɣwa/", example: "I need water - Necesito agua" },
    { english: "Food", spanish: "Comida", pronunciation: "/ko.ˈmi.da/", example: "The food is tasty - La comida está sabrosa" },
    { english: "House", spanish: "Casa", pronunciation: "/ˈka.sa/", example: "My house is big - Mi casa es grande" },
    { english: "School", spanish: "Escuela", pronunciation: "/es.ˈkwe.la/", example: "I go to school - Voy a la escuela" },
    { english: "Mother", spanish: "Madre", pronunciation: "/ˈma.dɾe/", example: "My mother is kind - Mi madre es amable" },
    { english: "Father", spanish: "Padre", pronunciation: "/ˈpa.dɾe/", example: "Father is working - Padre está trabajando" },
    { english: "Friend", spanish: "Amigo", pronunciation: "/a.ˈmi.ɣo/", example: "He is my friend - Él es mi amigo" },
    { english: "Book", spanish: "Libro", pronunciation: "/ˈli.βɾo/", example: "I read books - Leo libros" },
    { english: "Love", spanish: "Amor", pronunciation: "/a.ˈmoɾ/", example: "Love is beautiful - El amor es hermoso" },
    { english: "Happy", spanish: "Feliz", pronunciation: "/fe.ˈliθ/", example: "I am happy - Estoy feliz" },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Common Words in Spanish</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your vocabulary with essential Spanish words
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{word.english}</div>
                  <div className="text-3xl font-semibold">{word.spanish}</div>
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

export default SpanishWords;
