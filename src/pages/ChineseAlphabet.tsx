
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ChineseAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const pinyin = [
    { letter: "A", pinyin: "a", pronunciation: "ā á ǎ à" },
    { letter: "B", pinyin: "b", pronunciation: "ba bo bi bu" },
    { letter: "C", pinyin: "c", pronunciation: "ca co ci cu" },
    { letter: "D", pinyin: "d", pronunciation: "da do di du" },
    { letter: "E", pinyin: "e", pronunciation: "ē é ě è" },
    { letter: "F", pinyin: "f", pronunciation: "fa fo fi fu" },
    { letter: "G", pinyin: "g", pronunciation: "ga go gi gu" },
    { letter: "H", pinyin: "h", pronunciation: "ha ho hi hu" },
    { letter: "I", pinyin: "i", pronunciation: "ī í ǐ ì" },
    { letter: "J", pinyin: "j", pronunciation: "ja jo ji ju" },
    { letter: "K", pinyin: "k", pronunciation: "ka ko ki ku" },
    { letter: "L", pinyin: "l", pronunciation: "la lo li lu" },
    { letter: "M", pinyin: "m", pronunciation: "ma mo mi mu" },
    { letter: "N", pinyin: "n", pronunciation: "na no ni nu" },
    { letter: "O", pinyin: "o", pronunciation: "ō ó ǒ ò" },
    { letter: "P", pinyin: "p", pronunciation: "pa po pi pu" },
    { letter: "Q", pinyin: "q", pronunciation: "qa qo qi qu" },
    { letter: "R", pinyin: "r", pronunciation: "ra ro ri ru" },
    { letter: "S", pinyin: "s", pronunciation: "sa so si su" },
    { letter: "T", pinyin: "t", pronunciation: "ta to ti tu" },
    { letter: "U", pinyin: "u", pronunciation: "ū ú ǔ ù" },
    { letter: "V", pinyin: "v", pronunciation: "va vo vi vu" },
    { letter: "W", pinyin: "w", pronunciation: "wa wo wi wu" },
    { letter: "X", pinyin: "x", pronunciation: "xa xo xi xu" },
    { letter: "Y", pinyin: "y", pronunciation: "ya yo yi yu" },
    { letter: "Z", pinyin: "z", pronunciation: "za zo zi zu" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Chinese Pinyin (汉语拼音)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Pinyin romanization system used to represent Chinese pronunciation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pinyin.map((item, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-primary">{item.letter}</div>
                  <div className="text-2xl text-muted-foreground">{item.pinyin}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-lg mb-2 font-semibold text-center">{item.pronunciation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChineseAlphabet;
