
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ChineseAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const pinyin = [
    { letter: "A", pinyin: "a", tone: "ā á ǎ à", pronunciation: "/a/", example: "爱 (ài) - Love" },
    { letter: "B", pinyin: "b", tone: "ba bo bi bu", pronunciation: "/p/", example: "爸爸 (bàba) - Father" },
    { letter: "C", pinyin: "c", tone: "ca co ci cu", pronunciation: "/tsʰ/", example: "茶 (chá) - Tea" },
    { letter: "D", pinyin: "d", tone: "da do di du", pronunciation: "/t/", example: "大 (dà) - Big" },
    { letter: "E", pinyin: "e", tone: "ē é ě è", pronunciation: "/ɤ/", example: "饿 (è) - Hungry" },
    { letter: "F", pinyin: "f", tone: "fa fo fi fu", pronunciation: "/f/", example: "饭 (fàn) - Rice" },
    { letter: "G", pinyin: "g", tone: "ga go gi gu", pronunciation: "/k/", example: "狗 (gǒu) - Dog" },
    { letter: "H", pinyin: "h", tone: "ha ho hi hu", pronunciation: "/x/", example: "好 (hǎo) - Good" },
    { letter: "I", pinyin: "i", tone: "ī í ǐ ì", pronunciation: "/i/", example: "一 (yī) - One" },
    { letter: "J", pinyin: "j", tone: "ja jo ji ju", pronunciation: "/tɕ/", example: "家 (jiā) - Home" },
    { letter: "K", pinyin: "k", tone: "ka ko ki ku", pronunciation: "/kʰ/", example: "看 (kàn) - See" },
    { letter: "L", pinyin: "l", tone: "la lo li lu", pronunciation: "/l/", example: "来 (lái) - Come" },
    { letter: "M", pinyin: "m", tone: "ma mo mi mu", pronunciation: "/m/", example: "妈妈 (māma) - Mother" },
    { letter: "N", pinyin: "n", tone: "na no ni nu", pronunciation: "/n/", example: "你 (nǐ) - You" },
    { letter: "O", pinyin: "o", tone: "ō ó ǒ ò", pronunciation: "/o/", example: "我 (wǒ) - I" },
    { letter: "P", pinyin: "p", tone: "pa po pi pu", pronunciation: "/pʰ/", example: "朋友 (péngyǒu) - Friend" },
    { letter: "Q", pinyin: "q", tone: "qa qo qi qu", pronunciation: "/tɕʰ/", example: "去 (qù) - Go" },
    { letter: "R", pinyin: "r", tone: "ra ro ri ru", pronunciation: "/ʐ/", example: "人 (rén) - Person" },
    { letter: "S", pinyin: "s", tone: "sa so si su", pronunciation: "/s/", example: "三 (sān) - Three" },
    { letter: "T", pinyin: "t", tone: "ta to ti tu", pronunciation: "/tʰ/", example: "他 (tā) - He" },
    { letter: "U", pinyin: "u", tone: "ū ú ǔ ù", pronunciation: "/u/", example: "五 (wǔ) - Five" },
    { letter: "V", pinyin: "v", tone: "va vo vi vu", pronunciation: "/v/", example: "Very rare in Chinese" },
    { letter: "W", pinyin: "w", tone: "wa wo wi wu", pronunciation: "/w/", example: "我 (wǒ) - I" },
    { letter: "X", pinyin: "x", tone: "xa xo xi xu", pronunciation: "/ɕ/", example: "小 (xiǎo) - Small" },
    { letter: "Y", pinyin: "y", tone: "ya yo yi yu", pronunciation: "/j/", example: "月 (yuè) - Moon" },
    { letter: "Z", pinyin: "z", tone: "za zo zi zu", pronunciation: "/ts/", example: "再见 (zàijiàn) - Goodbye" },
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
              <div className="text-lg mb-2 font-semibold">{item.tone}</div>
              <div className="text-muted-foreground mb-3 italic">{item.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>例子:</strong> {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChineseAlphabet;
