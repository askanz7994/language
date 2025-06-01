
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const EnglishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { word: "Hello", pronunciation: "/həˈloʊ/", meaning: "A greeting", example: "Hello, how are you today?" },
    { word: "Thank you", pronunciation: "/θæŋk juː/", meaning: "Expression of gratitude", example: "Thank you for your help" },
    { word: "Water", pronunciation: "/ˈwɔːtər/", meaning: "Clear liquid for drinking", example: "I need a glass of water" },
    { word: "Food", pronunciation: "/fuːd/", meaning: "Something to eat", example: "The food tastes delicious" },
    { word: "House", pronunciation: "/haʊs/", meaning: "A building for living", example: "My house is near the park" },
    { word: "School", pronunciation: "/skuːl/", meaning: "Place for education", example: "I go to school every day" },
    { word: "Mother", pronunciation: "/ˈmʌðər/", meaning: "Female parent", example: "My mother is very kind" },
    { word: "Father", pronunciation: "/ˈfɑːðər/", meaning: "Male parent", example: "Father is working in the office" },
    { word: "Friend", pronunciation: "/frend/", meaning: "A close companion", example: "She is my best friend" },
    { word: "Book", pronunciation: "/bʊk/", meaning: "Written or printed work", example: "I love reading books" },
    { word: "Love", pronunciation: "/lʌv/", meaning: "Deep affection", example: "Love makes life beautiful" },
    { word: "Happy", pronunciation: "/ˈhæpi/", meaning: "Feeling joy", example: "I am happy to see you" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Common Words in English</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your vocabulary with essential English words
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{word.word}</div>
                  <div className="text-muted-foreground italic">{word.pronunciation}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-lg mb-3">{word.meaning}</div>
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

export default EnglishWords;
