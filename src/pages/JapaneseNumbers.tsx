
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const JapaneseNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", japanese: "零（れい）" },
    { digit: "1", japanese: "一（いち）" },
    { digit: "2", japanese: "二（に）" },
    { digit: "3", japanese: "三（さん）" },
    { digit: "4", japanese: "四（よん）" },
    { digit: "5", japanese: "五（ご）" },
    { digit: "6", japanese: "六（ろく）" },
    { digit: "7", japanese: "七（なな）" },
    { digit: "8", japanese: "八（はち）" },
    { digit: "9", japanese: "九（きゅう）" },
    { digit: "10", japanese: "十（じゅう）" },
    { digit: "11", japanese: "十一（じゅういち）" },
    { digit: "12", japanese: "十二（じゅうに）" },
    { digit: "13", japanese: "十三（じゅうさん）" },
    { digit: "14", japanese: "十四（じゅうよん）" },
    { digit: "15", japanese: "十五（じゅうご）" },
    { digit: "16", japanese: "十六（じゅうろく）" },
    { digit: "17", japanese: "十七（じゅうなな）" },
    { digit: "18", japanese: "十八（じゅうはち）" },
    { digit: "19", japanese: "十九（じゅうきゅう）" },
    { digit: "20", japanese: "二十（にじゅう）" },
    { digit: "21", japanese: "二十一（にじゅういち）" },
    { digit: "22", japanese: "二十二（にじゅうに）" },
    { digit: "23", japanese: "二十三（にじゅうさん）" },
    { digit: "24", japanese: "二十四（にじゅうよん）" },
    { digit: "25", japanese: "二十五（にじゅうご）" },
    { digit: "26", japanese: "二十六（にじゅうろく）" },
    { digit: "27", japanese: "二十七（にじゅうなな）" },
    { digit: "28", japanese: "二十八（にじゅうはち）" },
    { digit: "29", japanese: "二十九（にじゅうきゅう）" },
    { digit: "30", japanese: "三十（さんじゅう）" },
    { digit: "31", japanese: "三十一（さんじゅういち）" },
    { digit: "32", japanese: "三十二（さんじゅうに）" },
    { digit: "33", japanese: "三十三（さんじゅうさん）" },
    { digit: "34", japanese: "三十四（さんじゅうよん）" },
    { digit: "35", japanese: "三十五（さんじゅうご）" },
    { digit: "36", japanese: "三十六（さんじゅうろく）" },
    { digit: "37", japanese: "三十七（さんじゅうなな）" },
    { digit: "38", japanese: "三十八（さんじゅうはち）" },
    { digit: "39", japanese: "三十九（さんじゅうきゅう）" },
    { digit: "40", japanese: "四十（よんじゅう）" },
    { digit: "41", japanese: "四十一（よんじゅういち）" },
    { digit: "42", japanese: "四十二（よんじゅうに）" },
    { digit: "43", japanese: "四十三（よんじゅうさん）" },
    { digit: "44", japanese: "四十四（よんじゅうよん）" },
    { digit: "45", japanese: "四十五（よんじゅうご）" },
    { digit: "46", japanese: "四十六（よんじゅうろく）" },
    { digit: "47", japanese: "四十七（よんじゅうなな）" },
    { digit: "48", japanese: "四十八（よんじゅうはち）" },
    { digit: "49", japanese: "四十九（よんじゅうきゅう）" },
    { digit: "50", japanese: "五十（ごじゅう）" },
    { digit: "51", japanese: "五十一（ごじゅういち）" },
    { digit: "52", japanese: "五十二（ごじゅうに）" },
    { digit: "53", japanese: "五十三（ごじゅうさん）" },
    { digit: "54", japanese: "五十四（ごじゅうよん）" },
    { digit: "55", japanese: "五十五（ごじゅうご）" },
    { digit: "56", japanese: "五十六（ごじゅうろく）" },
    { digit: "57", japanese: "五十七（ごじゅうなな）" },
    { digit: "58", japanese: "五十八（ごじゅうはち）" },
    { digit: "59", japanese: "五十九（ごじゅうきゅう）" },
    { digit: "60", japanese: "六十（ろくじゅう）" },
    { digit: "61", japanese: "六十一（ろくじゅういち）" },
    { digit: "62", japanese: "六十二（ろくじゅうに）" },
    { digit: "63", japanese: "六十三（ろくじゅうさん）" },
    { digit: "64", japanese: "六十四（ろくじゅうよん）" },
    { digit: "65", japanese: "六十五（ろくじゅうご）" },
    { digit: "66", japanese: "六十六（ろくじゅうろく）" },
    { digit: "67", japanese: "六十七（ろくじゅうなな）" },
    { digit: "68", japanese: "六十八（ろくじゅうはち）" },
    { digit: "69", japanese: "六十九（ろくじゅうきゅう）" },
    { digit: "70", japanese: "七十（ななじゅう）" },
    { digit: "71", japanese: "七十一（ななじゅういち）" },
    { digit: "72", japanese: "七十二（ななじゅうに）" },
    { digit: "73", japanese: "七十三（ななじゅうさん）" },
    { digit: "74", japanese: "七十四（ななじゅうよん）" },
    { digit: "75", japanese: "七十五（ななじゅうご）" },
    { digit: "76", japanese: "七十六（ななじゅうろく）" },
    { digit: "77", japanese: "七十七（ななじゅうなな）" },
    { digit: "78", japanese: "七十八（ななじゅうはち）" },
    { digit: "79", japanese: "七十九（ななじゅうきゅう）" },
    { digit: "80", japanese: "八十（はちじゅう）" },
    { digit: "81", japanese: "八十一（はちじゅういち）" },
    { digit: "82", japanese: "八十二（はちじゅうに）" },
    { digit: "83", japanese: "八十三（はちじゅうさん）" },
    { digit: "84", japanese: "八十四（はちじゅうよん）" },
    { digit: "85", japanese: "八十五（はちじゅうご）" },
    { digit: "86", japanese: "八十六（はちじゅうろく）" },
    { digit: "87", japanese: "八十七（はちじゅうなな）" },
    { digit: "88", japanese: "八十八（はちじゅうはち）" },
    { digit: "89", japanese: "八十九（はちじゅうきゅう）" },
    { digit: "90", japanese: "九十（きゅうじゅう）" },
    { digit: "91", japanese: "九十一（きゅうじゅういち）" },
    { digit: "92", japanese: "九十二（きゅうじゅうに）" },
    { digit: "93", japanese: "九十三（きゅうじゅうさん）" },
    { digit: "94", japanese: "九十四（きゅうじゅうよん）" },
    { digit: "95", japanese: "九十五（きゅうじゅうご）" },
    { digit: "96", japanese: "九十六（きゅうじゅうろく）" },
    { digit: "97", japanese: "九十七（きゅうじゅうなな）" },
    { digit: "98", japanese: "九十八（きゅうじゅうはち）" },
    { digit: "99", japanese: "九十九（きゅうじゅうきゅう）" },
    { digit: "100", japanese: "百（ひゃく）" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Japanese number: ${numbers[index].japanese}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-japanese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Japanese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            日本語の数字 (Japanese Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Japanese
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-semibold text-center">{number.japanese}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Practice Time!</h3>
            <p className="text-muted-foreground mb-4">
              Click on any number card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio feature coming soon with native speaker recordings!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseNumbers;
