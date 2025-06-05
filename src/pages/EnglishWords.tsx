
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const EnglishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "I", "you", "he", "she", "we", "you", "they", "this", "that", "what",
    "who", "where", "when", "why", "how", "yes", "no", "please", "thank you", "sorry",
    "name", "house", "water", "food", "time", "day", "night", "morning", "evening", "year",
    "month", "week", "today", "tomorrow", "yesterday", "mother", "father", "brother", "sister", "child",
    "man", "woman", "friend", "teacher", "doctor", "book", "pen", "paper", "table", "chair",
    "room", "door", "window", "ceiling", "floor", "road", "car", "train", "airplane", "tree",
    "flower", "leaf", "fruit", "vegetable", "rice", "bread", "milk", "tea", "coffee", "sugar",
    "salt", "oil", "meat", "fish", "egg", "red", "white", "black", "blue", "green",
    "yellow", "pink", "brown", "small", "big", "new", "old", "hot", "cold", "good",
    "bad", "happy", "sad", "fast", "slow", "above", "below", "inside", "outside", "here"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for English word: ${words[index]}`);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            English Words
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn English words
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
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishWords;
