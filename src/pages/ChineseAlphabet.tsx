
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";

const ChineseAlphabet = () => {
  const basicStrokes = [
    { stroke: "一", name: "héng", description: "horizontal stroke" },
    { stroke: "丨", name: "shù", description: "vertical stroke" },
    { stroke: "丿", name: "piě", description: "left-falling stroke" },
    { stroke: "丶", name: "diǎn", description: "dot stroke" },
    { stroke: "乙", name: "zhé", description: "turning stroke" }
  ];

  const basicRadicals = [
    { radical: "人", pinyin: "rén", meaning: "person" },
    { radical: "口", pinyin: "kǒu", meaning: "mouth" },
    { radical: "手", pinyin: "shǒu", meaning: "hand" },
    { radical: "水", pinyin: "shuǐ", meaning: "water" },
    { radical: "火", pinyin: "huǒ", meaning: "fire" },
    { radical: "土", pinyin: "tǔ", meaning: "earth" },
    { radical: "木", pinyin: "mù", meaning: "wood" },
    { radical: "金", pinyin: "jīn", meaning: "metal" },
    { radical: "日", pinyin: "rì", meaning: "sun" },
    { radical: "月", pinyin: "yuè", meaning: "moon" },
    { radical: "心", pinyin: "xīn", meaning: "heart" },
    { radical: "女", pinyin: "nǚ", meaning: "woman" }
  ];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Chinese Characters</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn Chinese character strokes and basic radicals
          </p>
        </div>

        {/* Basic Strokes */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Basic Strokes (基本笔画)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {basicStrokes.map((stroke, index) => (
              <div key={index} className="language-card text-center p-6">
                <div className="text-6xl font-bold mb-2">{stroke.stroke}</div>
                <div className="text-lg font-semibold text-primary mb-1">{stroke.name}</div>
                <div className="text-sm text-muted-foreground">{stroke.description}</div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Radicals */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Common Radicals (常用部首)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {basicRadicals.map((radical, index) => (
              <div key={index} className="language-card text-center p-6">
                <div className="text-5xl font-bold mb-2">{radical.radical}</div>
                <div className="text-lg font-semibold text-primary mb-1">{radical.pinyin}</div>
                <div className="text-sm text-muted-foreground">{radical.meaning}</div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/chinese/numbers">
            <Button className="glow-button">
              Next: Learn Numbers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChineseAlphabet;
