
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const PortugueseWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "eu", "você", "ele", "ela", "nós", "vocês", "eles", "isto", "isso", "o que",
    "quem", "onde", "quando", "por que", "como", "sim", "não", "por favor", "obrigado", "desculpe",
    "nome", "casa", "água", "comida", "tempo", "dia", "noite", "manhã", "tarde", "ano",
    "mês", "semana", "hoje", "amanhã", "ontem", "mãe", "pai", "irmão", "irmã", "criança",
    "homem", "mulher", "amigo", "professor", "médico", "livro", "caneta", "papel", "mesa", "cadeira",
    "quarto", "porta", "janela", "teto", "chão", "rua", "carro", "trem", "avião", "árvore",
    "flor", "folha", "fruta", "vegetal", "arroz", "pão", "leite", "chá", "café", "açúcar",
    "sal", "óleo", "carne", "peixe", "ovo", "vermelho", "branco", "preto", "azul", "verde",
    "amarelo", "rosa", "marrom", "pequeno", "grande", "novo", "velho", "quente", "frio", "bom",
    "mau", "feliz", "triste", "rápido", "lento", "acima", "abaixo", "dentro", "fora", "aqui"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Portuguese word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-portuguese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portuguese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Palavras Portuguesas (Portuguese Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Portuguese words
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

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Vocabulary Builder</h3>
            <p className="text-muted-foreground mb-4">
              Click on any word card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio pronunciation coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortugueseWords;
