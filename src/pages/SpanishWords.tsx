
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const SpanishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "yo", "tú", "él", "ella", "nosotros", "vosotros", "ellos", "esto", "eso", "qué",
    "quién", "dónde", "cuándo", "por qué", "cómo", "sí", "no", "por favor", "gracias", "lo siento",
    "nombre", "casa", "agua", "comida", "tiempo", "día", "noche", "mañana", "tarde", "año",
    "mes", "semana", "hoy", "mañana", "ayer", "madre", "padre", "hermano", "hermana", "niño",
    "hombre", "mujer", "amigo", "profesor", "doctor", "libro", "pluma", "papel", "mesa", "silla",
    "habitación", "puerta", "ventana", "techo", "suelo", "camino", "coche", "tren", "avión", "árbol",
    "flor", "hoja", "fruta", "verdura", "arroz", "pan", "leche", "té", "café", "azúcar",
    "sal", "aceite", "carne", "pescado", "huevo", "rojo", "blanco", "negro", "azul", "verde",
    "amarillo", "rosa", "marrón", "pequeño", "grande", "nuevo", "viejo", "caliente", "frío", "bueno",
    "malo", "feliz", "triste", "rápido", "lento", "arriba", "abajo", "dentro", "fuera", "aquí"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Spanish word: ${words[index]}`);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Palabras en Español (Spanish Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Spanish words
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

export default SpanishWords;
