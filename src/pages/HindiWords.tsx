
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const HindiWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { english: "Hello", hindi: "नमस्ते", transliteration: "namaste", example: "Hello, how are you? - नमस्ते, आप कैसे हैं?" },
    { english: "Thank you", hindi: "धन्यवाद", transliteration: "dhanyavaad", example: "Thank you very much - बहुत धन्यवाद" },
    { english: "Water", hindi: "पानी", transliteration: "paani", example: "I need water - मुझे पानी चाहिए" },
    { english: "Food", hindi: "खाना", transliteration: "khaana", example: "The food is tasty - खाना स्वादिष्ट है" },
    { english: "House", hindi: "घर", transliteration: "ghar", example: "My house is big - मेरा घर बड़ा है" },
    { english: "School", hindi: "स्कूल", transliteration: "school", example: "I go to school - मैं स्कूल जाता हूं" },
    { english: "Mother", hindi: "माता", transliteration: "mata", example: "My mother is kind - मेरी माता दयालु है" },
    { english: "Father", hindi: "पिता", transliteration: "pita", example: "Father is working - पिता काम कर रहे हैं" },
    { english: "Friend", hindi: "मित्र", transliteration: "mitra", example: "He is my friend - वह मेरा मित्र है" },
    { english: "Book", hindi: "किताब", transliteration: "kitaab", example: "I read books - मैं किताबें पढ़ता हूं" },
    { english: "Love", hindi: "प्रेम", transliteration: "prem", example: "Love is beautiful - प्रेम सुंदर है" },
    { english: "Happy", hindi: "खुश", transliteration: "khush", example: "I am happy - मैं खुश हूं" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Common Words in Hindi</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your vocabulary with essential Hindi words
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{word.english}</div>
                  <div className="text-3xl font-semibold">{word.hindi}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-muted-foreground mb-3 italic">{word.transliteration}</div>
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

export default HindiWords;
