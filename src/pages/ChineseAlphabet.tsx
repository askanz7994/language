
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const ChineseAlphabet = () => {
  const [currentLetter, setCurrentLetter] = useState(0);

  const alphabet = [
    { pinyin: "a", chinese: "啊", pronunciation: "ah" },
    { pinyin: "o", chinese: "喔", pronunciation: "oh" },
    { pinyin: "e", chinese: "鹅", pronunciation: "eh" },
    { pinyin: "i", chinese: "衣", pronunciation: "ee" },
    { pinyin: "u", chinese: "乌", pronunciation: "oo" },
    { pinyin: "ü", chinese: "迂", pronunciation: "yu" },
    { pinyin: "ai", chinese: "爱", pronunciation: "eye" },
    { pinyin: "ei", chinese: "诶", pronunciation: "ay" },
    { pinyin: "ui", chinese: "威", pronunciation: "way" },
    { pinyin: "ao", chinese: "熬", pronunciation: "ow" },
    { pinyin: "ou", chinese: "欧", pronunciation: "oh" },
    { pinyin: "iu", chinese: "优", pronunciation: "yo" },
    { pinyin: "ie", chinese: "耶", pronunciation: "yeh" },
    { pinyin: "üe", chinese: "约", pronunciation: "yue" },
    { pinyin: "er", chinese: "儿", pronunciation: "er" },
  ];

  const currentItem = alphabet[currentLetter];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Chinese Pinyin</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn Chinese pronunciation with Pinyin system
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.chinese}</div>
            <div className="text-6xl font-bold mb-4">{currentItem.pinyin}</div>
            <div className="text-2xl text-muted-foreground mb-6">Pronunciation: {currentItem.pronunciation}</div>
            <Button className="glow-button mb-6">
              <Volume2 className="mr-2 h-4 w-4" />
              Play Sound
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentLetter(Math.max(0, currentLetter - 1))}
              disabled={currentLetter === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentLetter + 1} of {alphabet.length}
            </span>
            
            <Button 
              onClick={() => setCurrentLetter(Math.min(alphabet.length - 1, currentLetter + 1))}
              disabled={currentLetter === alphabet.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChineseAlphabet;
