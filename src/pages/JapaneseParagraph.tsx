
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const JapaneseParagraph = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const paragraphs = [
    {
      hiragana: "わたしの なまえは やまだ たろうです。わたしは がくせいです。とうきょうに すんでいます。",
      kanji: "私の名前は山田太郎です。私は学生です。東京に住んでいます。",
      romaji: "Watashi no namae wa Yamada Tarou desu. Watashi wa gakusei desu. Toukyou ni sunde imasu.",
      english: "My name is Yamada Tarou. I am a student. I live in Tokyo.",
      title: "Self Introduction"
    },
    {
      hiragana: "きょうは いい てんきです。そらが あおくて きれいです。ともだちと こうえんに いきます。",
      kanji: "今日はいい天気です。空が青くてきれいです。友達と公園に行きます。",
      romaji: "Kyou wa ii tenki desu. Sora ga aokute kirei desu. Tomodachi to kouen ni ikimasu.",
      english: "Today the weather is nice. The sky is blue and beautiful. I'm going to the park with my friend.",
      title: "A Beautiful Day"
    },
    {
      hiragana: "わたしの かぞくは よにんです。ちちと ははと いもうとです。みんな やさしいです。",
      kanji: "私の家族は四人です。父と母と妹です。みんな優しいです。",
      romaji: "Watashi no kazoku wa yonin desu. Chichi to haha to imouto desu. Minna yasashii desu.",
      english: "My family has four people. Father, mother, and younger sister. Everyone is kind.",
      title: "My Family"
    }
  ];

  const currentItem = paragraphs[currentParagraph];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Japanese Paragraphs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice reading Japanese paragraphs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{currentItem.title}</h2>
            <div className="text-center mb-8">
              <div className="text-2xl leading-relaxed mb-4">{currentItem.kanji}</div>
              <div className="text-xl leading-relaxed mb-6 text-primary">{currentItem.hiragana}</div>
              <div className="text-lg text-muted-foreground mb-6">{currentItem.romaji}</div>
              <div className="text-lg font-medium">{currentItem.english}</div>
            </div>
            <div className="text-center">
              <Button className="glow-button">
                <Volume2 className="mr-2 h-4 w-4" />
                Play Sound
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentParagraph(Math.max(0, currentParagraph - 1))}
              disabled={currentParagraph === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentParagraph + 1} of {paragraphs.length}
            </span>
            
            <Button 
              onClick={() => setCurrentParagraph(Math.min(paragraphs.length - 1, currentParagraph + 1))}
              disabled={currentParagraph === paragraphs.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseParagraph;
