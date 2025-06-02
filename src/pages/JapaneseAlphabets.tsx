
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const JapaneseAlphabets = () => {
  const hiragana = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を", "ん"
  ];

  const katakana = [
    "ア", "イ", "ウ", "エ", "オ",
    "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ",
    "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ", "ユ", "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ", "ヲ", "ン"
  ];

  const playAudio = (character: string) => {
    console.log(`Playing audio for Japanese character: ${character}`);
    // Audio functionality will be implemented when user provides ElevenLabs API key
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">日本語の文字 (Nihongo no Moji - Japanese Characters)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the characters.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hiragana Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Hiragana (ひらがな)</h2>
            <div className="grid grid-cols-5 gap-4">
              {hiragana.map((character, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-4">{character}</div>
                  <Button
                    onClick={() => playAudio(character)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Katakana Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Katakana (カタカナ)</h2>
            <div className="grid grid-cols-5 gap-4">
              {katakana.map((character, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-4">{character}</div>
                  <Button
                    onClick={() => playAudio(character)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseAlphabets;
