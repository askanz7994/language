
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const GermanWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { english: "Hello", german: "Hallo", pronunciation: "/ˈhaˌlo/", example: "Hello, how are you? - Hallo, wie geht es dir?" },
    { english: "Thank you", german: "Danke", pronunciation: "/ˈdaŋkə/", example: "Thank you very much - Vielen Dank" },
    { english: "Water", german: "Wasser", pronunciation: "/ˈvasɐ/", example: "I need water - Ich brauche Wasser" },
    { english: "Food", german: "Essen", pronunciation: "/ˈɛsən/", example: "The food is tasty - Das Essen ist lecker" },
    { english: "House", german: "Haus", pronunciation: "/haʊs/", example: "My house is big - Mein Haus ist groß" },
    { english: "School", german: "Schule", pronunciation: "/ˈʃuːlə/", example: "I go to school - Ich gehe zur Schule" },
    { english: "Mother", german: "Mutter", pronunciation: "/ˈmʊtɐ/", example: "My mother is kind - Meine Mutter ist nett" },
    { english: "Father", german: "Vater", pronunciation: "/ˈfaːtɐ/", example: "Father is working - Vater arbeitet" },
    { english: "Friend", german: "Freund", pronunciation: "/fʁɔʏnt/", example: "He is my friend - Er ist mein Freund" },
    { english: "Book", german: "Buch", pronunciation: "/buːx/", example: "I read books - Ich lese Bücher" },
    { english: "Love", german: "Liebe", pronunciation: "/ˈliːbə/", example: "Love is beautiful - Liebe ist schön" },
    { english: "Happy", german: "Glücklich", pronunciation: "/ˈɡlʏklɪç/", example: "I am happy - Ich bin glücklich" },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Common Words in German</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your vocabulary with essential German words
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{word.english}</div>
                  <div className="text-3xl font-semibold">{word.german}</div>
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

export default GermanWords;
