
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const JapaneseWords = () => {
  const [currentWord, setCurrentWord] = useState(0);

  const words = [
    { hiragana: "こんにちは", kanji: "", romaji: "konnichiwa", english: "Hello" },
    { hiragana: "ありがとう", kanji: "", romaji: "arigatou", english: "Thank you" },
    { hiragana: "さようなら", kanji: "", romaji: "sayounara", english: "Goodbye" },
    { hiragana: "すみません", kanji: "", romaji: "sumimasen", english: "Excuse me/Sorry" },
    { hiragana: "はい", kanji: "", romaji: "hai", english: "Yes" },
    { hiragana: "いいえ", kanji: "", romaji: "iie", english: "No" },
    { hiragana: "いえ", kanji: "家", romaji: "ie", english: "House/Home" },
    { hiragana: "ともだち", kanji: "友達", romaji: "tomodachi", english: "Friend" },
    { hiragana: "みず", kanji: "水", romaji: "mizu", english: "Water" },
    { hiragana: "たべる", kanji: "食べる", romaji: "taberu", english: "To eat" },
  ];

  const currentItem = words[currentWord];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Japanese Words</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn essential Japanese vocabulary
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            {currentItem.kanji && <div className="text-8xl font-bold mb-4 text-primary">{currentItem.kanji}</div>}
            <div className="text-6xl font-bold mb-6 text-primary">{currentItem.hiragana}</div>
            <div className="text-3xl font-bold mb-4">{currentItem.english}</div>
            <div className="text-xl text-muted-foreground mb-6">Romaji: {currentItem.romaji}</div>
            <Button className="glow-button mb-6">
              <Volume2 className="mr-2 h-4 w-4" />
              Play Sound
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentWord(Math.max(0, currentWord - 1))}
              disabled={currentWord === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentWord + 1} of {words.length}
            </span>
            
            <Button 
              onClick={() => setCurrentWord(Math.min(words.length - 1, currentWord + 1))}
              disabled={currentWord === words.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseWords;
