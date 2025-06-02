
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const ChineseWords = () => {
  const [currentWord, setCurrentWord] = useState(0);

  const words = [
    { chinese: "你好", pinyin: "nǐ hǎo", english: "Hello" },
    { chinese: "谢谢", pinyin: "xiè xiè", english: "Thank you" },
    { chinese: "再见", pinyin: "zài jiàn", english: "Goodbye" },
    { chinese: "对不起", pinyin: "duì bù qǐ", english: "Sorry" },
    { chinese: "是", pinyin: "shì", english: "Yes" },
    { chinese: "不", pinyin: "bù", english: "No" },
    { chinese: "家", pinyin: "jiā", english: "Home/Family" },
    { chinese: "朋友", pinyin: "péng yǒu", english: "Friend" },
    { chinese: "水", pinyin: "shuǐ", english: "Water" },
    { chinese: "吃", pinyin: "chī", english: "To eat" },
  ];

  const currentItem = words[currentWord];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Chinese Words</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn essential Chinese vocabulary
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="language-card text-center p-12 mb-8">
            <div className="text-8xl font-bold mb-6 text-primary">{currentItem.chinese}</div>
            <div className="text-3xl font-bold mb-4">{currentItem.english}</div>
            <div className="text-xl text-muted-foreground mb-6">Pinyin: {currentItem.pinyin}</div>
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

export default ChineseWords;
