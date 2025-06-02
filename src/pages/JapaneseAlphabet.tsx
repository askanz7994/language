
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const JapaneseAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [currentScript, setCurrentScript] = useState<'hiragana' | 'katakana'>('hiragana');

  const hiragana = [
    { letter: "あ", romaji: "a", pronunciation: "/a/", example: "あい (ai) - Love" },
    { letter: "い", romaji: "i", pronunciation: "/i/", example: "いい (ii) - Good" },
    { letter: "う", romaji: "u", pronunciation: "/u/", example: "うみ (umi) - Sea" },
    { letter: "え", romaji: "e", pronunciation: "/e/", example: "えき (eki) - Station" },
    { letter: "お", romaji: "o", pronunciation: "/o/", example: "おかし (okashi) - Sweets" },
    { letter: "か", romaji: "ka", pronunciation: "/ka/", example: "かぞく (kazoku) - Family" },
    { letter: "き", romaji: "ki", pronunciation: "/ki/", example: "きれい (kirei) - Beautiful" },
    { letter: "く", romaji: "ku", pronunciation: "/ku/", example: "くつ (kutsu) - Shoes" },
    { letter: "け", romaji: "ke", pronunciation: "/ke/", example: "けさ (kesa) - This morning" },
    { letter: "こ", romaji: "ko", pronunciation: "/ko/", example: "ここ (koko) - Here" },
    { letter: "さ", romaji: "sa", pronunciation: "/sa/", example: "さくら (sakura) - Cherry blossom" },
    { letter: "し", romaji: "shi", pronunciation: "/ʃi/", example: "しお (shio) - Salt" },
    { letter: "す", romaji: "su", pronunciation: "/su/", example: "すし (sushi) - Sushi" },
    { letter: "せ", romaji: "se", pronunciation: "/se/", example: "せんせい (sensei) - Teacher" },
    { letter: "そ", romaji: "so", pronunciation: "/so/", example: "そら (sora) - Sky" },
    { letter: "た", romaji: "ta", pronunciation: "/ta/", example: "たべる (taberu) - To eat" },
    { letter: "ち", romaji: "chi", pronunciation: "/tʃi/", example: "ちか (chika) - Near" },
    { letter: "つ", romaji: "tsu", pronunciation: "/tsu/", example: "つき (tsuki) - Moon" },
    { letter: "て", romaji: "te", pronunciation: "/te/", example: "て (te) - Hand" },
    { letter: "と", romaji: "to", pronunciation: "/to/", example: "とり (tori) - Bird" },
  ];

  const katakana = [
    { letter: "ア", romaji: "a", pronunciation: "/a/", example: "アメリカ (Amerika) - America" },
    { letter: "イ", romaji: "i", pronunciation: "/i/", example: "イタリア (Itaria) - Italy" },
    { letter: "ウ", romaji: "u", pronunciation: "/u/", example: "ウイスキー (Uisukii) - Whiskey" },
    { letter: "エ", romaji: "e", pronunciation: "/e/", example: "エンジン (Enjin) - Engine" },
    { letter: "オ", romaji: "o", pronunciation: "/o/", example: "オレンジ (Orenji) - Orange" },
    { letter: "カ", romaji: "ka", pronunciation: "/ka/", example: "カメラ (Kamera) - Camera" },
    { letter: "キ", romaji: "ki", pronunciation: "/ki/", example: "キーボード (Kiibodo) - Keyboard" },
    { letter: "ク", romaji: "ku", pronunciation: "/ku/", example: "クッキー (Kukkii) - Cookie" },
    { letter: "ケ", romaji: "ke", pronunciation: "/ke/", example: "ケーキ (Keeki) - Cake" },
    { letter: "コ", romaji: "ko", pronunciation: "/ko/", example: "コーヒー (Koohii) - Coffee" },
    { letter: "サ", romaji: "sa", pronunciation: "/sa/", example: "サラダ (Sarada) - Salad" },
    { letter: "シ", romaji: "shi", pronunciation: "/ʃi/", example: "シャツ (Shatsu) - Shirt" },
    { letter: "ス", romaji: "su", pronunciation: "/su/", example: "スポーツ (Supootsu) - Sports" },
    { letter: "セ", romaji: "se", pronunciation: "/se/", example: "セーター (Seetaa) - Sweater" },
    { letter: "ソ", romaji: "so", pronunciation: "/so/", example: "ソファ (Sofa) - Sofa" },
    { letter: "タ", romaji: "ta", pronunciation: "/ta/", example: "タクシー (Takushii) - Taxi" },
    { letter: "チ", romaji: "chi", pronunciation: "/tʃi/", example: "チーズ (Chiizu) - Cheese" },
    { letter: "ツ", romaji: "tsu", pronunciation: "/tsu/", example: "ツアー (Tsuaa) - Tour" },
    { letter: "テ", romaji: "te", pronunciation: "/te/", example: "テレビ (Terebi) - Television" },
    { letter: "ト", romaji: "to", pronunciation: "/to/", example: "トマト (Tomato) - Tomato" },
  ];

  const currentData = currentScript === 'hiragana' ? hiragana : katakana;

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Japanese Writing System (日本語)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn Hiragana and Katakana, the two phonetic scripts of Japanese
          </p>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button
              onClick={() => setCurrentScript('hiragana')}
              variant={currentScript === 'hiragana' ? 'default' : 'outline'}
              className="glow-button"
            >
              Hiragana (ひらがな)
            </Button>
            <Button
              onClick={() => setCurrentScript('katakana')}
              variant={currentScript === 'katakana' ? 'default' : 'outline'}
              className="glow-button"
            >
              Katakana (カタカナ)
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {currentData.map((item, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-primary">{item.letter}</div>
                  <div className="text-2xl text-muted-foreground">{item.romaji}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-2xl mb-2 font-semibold">{item.romaji}</div>
              <div className="text-muted-foreground mb-3 italic">{item.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>例:</strong> {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JapaneseAlphabet;
