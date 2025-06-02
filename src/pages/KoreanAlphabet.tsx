
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const KoreanAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const hangul = [
    { letter: "ㄱ", romanization: "g/k", pronunciation: "/k/ /g/", example: "가 (ga) - Go" },
    { letter: "ㄴ", romanization: "n", pronunciation: "/n/", example: "나 (na) - I" },
    { letter: "ㄷ", romanization: "d/t", pronunciation: "/t/ /d/", example: "다 (da) - All" },
    { letter: "ㄹ", romanization: "r/l", pronunciation: "/ɾ/ /l/", example: "라 (ra) - La" },
    { letter: "ㅁ", romanization: "m", pronunciation: "/m/", example: "마 (ma) - Horse" },
    { letter: "ㅂ", romanization: "b/p", pronunciation: "/p/ /b/", example: "바 (ba) - Bar" },
    { letter: "ㅅ", romanization: "s", pronunciation: "/s/", example: "사 (sa) - Four" },
    { letter: "ㅇ", romanization: "ng/silent", pronunciation: "/ŋ/ ∅", example: "아 (a) - Ah" },
    { letter: "ㅈ", romanization: "j", pronunciation: "/tʃ/ /dʒ/", example: "자 (ja) - Sleep" },
    { letter: "ㅊ", romanization: "ch", pronunciation: "/tʃʰ/", example: "차 (cha) - Tea" },
    { letter: "ㅋ", romanization: "k", pronunciation: "/kʰ/", example: "카 (ka) - Car" },
    { letter: "ㅌ", romanization: "t", pronunciation: "/tʰ/", example: "타 (ta) - Ride" },
    { letter: "ㅍ", romanization: "p", pronunciation: "/pʰ/", example: "파 (pa) - Green onion" },
    { letter: "ㅎ", romanization: "h", pronunciation: "/h/", example: "하 (ha) - Do" },
    { letter: "ㅏ", romanization: "a", pronunciation: "/a/", example: "사과 (sagwa) - Apple" },
    { letter: "ㅑ", romanization: "ya", pronunciation: "/ja/", example: "야구 (yagu) - Baseball" },
    { letter: "ㅓ", romanization: "eo", pronunciation: "/ʌ/", example: "서울 (Seoul) - Seoul" },
    { letter: "ㅕ", romanization: "yeo", pronunciation: "/jʌ/", example: "여자 (yeoja) - Woman" },
    { letter: "ㅗ", romanization: "o", pronunciation: "/o/", example: "고양이 (goyangi) - Cat" },
    { letter: "ㅛ", romanization: "yo", pronunciation: "/jo/", example: "요리 (yori) - Cooking" },
    { letter: "ㅜ", romanization: "u", pronunciation: "/u/", example: "구름 (gureum) - Cloud" },
    { letter: "ㅠ", romanization: "yu", pronunciation: "/ju/", example: "유리 (yuri) - Glass" },
    { letter: "ㅡ", romanization: "eu", pronunciation: "/ɯ/", example: "음식 (eumsik) - Food" },
    { letter: "ㅣ", romanization: "i", pronunciation: "/i/", example: "이름 (ireum) - Name" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Korean Alphabet - Hangul (한글)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the 24 basic letters of Hangul, the Korean writing system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {hangul.map((letter, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-primary">{letter.letter}</div>
                  <div className="text-2xl text-muted-foreground">{letter.romanization}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-2xl mb-2 font-semibold">{letter.romanization}</div>
              <div className="text-muted-foreground mb-3 italic">{letter.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>예:</strong> {letter.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KoreanAlphabet;
