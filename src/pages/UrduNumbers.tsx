
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const UrduNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", urdu: "صفر" },
    { digit: "1", urdu: "ایک" },
    { digit: "2", urdu: "دو" },
    { digit: "3", urdu: "تین" },
    { digit: "4", urdu: "چار" },
    { digit: "5", urdu: "پانچ" },
    { digit: "6", urdu: "چھے" },
    { digit: "7", urdu: "سات" },
    { digit: "8", urdu: "آٹھ" },
    { digit: "9", urdu: "نو" },
    { digit: "10", urdu: "دس" },
    { digit: "11", urdu: "گیارہ" },
    { digit: "12", urdu: "بارہ" },
    { digit: "13", urdu: "تیرہ" },
    { digit: "14", urdu: "چودہ" },
    { digit: "15", urdu: "پندرہ" },
    { digit: "16", urdu: "سولہ" },
    { digit: "17", urdu: "سترہ" },
    { digit: "18", urdu: "اٹھارہ" },
    { digit: "19", urdu: "انیس" },
    { digit: "20", urdu: "بیس" },
    { digit: "21", urdu: "اکیس" },
    { digit: "22", urdu: "بائیس" },
    { digit: "23", urdu: "تیئیس" },
    { digit: "24", urdu: "چوبیس" },
    { digit: "25", urdu: "پچیس" },
    { digit: "26", urdu: "چھبیس" },
    { digit: "27", urdu: "ستائیس" },
    { digit: "28", urdu: "اٹھائیس" },
    { digit: "29", urdu: "انتیس" },
    { digit: "30", urdu: "تیس" },
    { digit: "31", urdu: "اکتیس" },
    { digit: "32", urdu: "بتیس" },
    { digit: "33", urdu: "تینتیس" },
    { digit: "34", urdu: "چونتیس" },
    { digit: "35", urdu: "پینتیس" },
    { digit: "36", urdu: "چھتیس" },
    { digit: "37", urdu: "سینتیس" },
    { digit: "38", urdu: "اڑتیس" },
    { digit: "39", urdu: "انتالیس" },
    { digit: "40", urdu: "چالیس" },
    { digit: "41", urdu: "اکتالیس" },
    { digit: "42", urdu: "بیالیس" },
    { digit: "43", urdu: "تینتالیس" },
    { digit: "44", urdu: "چوالیس" },
    { digit: "45", urdu: "پینتالیس" },
    { digit: "46", urdu: "چھیالیس" },
    { digit: "47", urdu: "سینتالیس" },
    { digit: "48", urdu: "اڑتالیس" },
    { digit: "49", urdu: "انچاس" },
    { digit: "50", urdu: "پچاس" },
    { digit: "51", urdu: "اکاون" },
    { digit: "52", urdu: "باون" },
    { digit: "53", urdu: "ترپن" },
    { digit: "54", urdu: "چون" },
    { digit: "55", urdu: "پچپن" },
    { digit: "56", urdu: "چھپن" },
    { digit: "57", urdu: "ستاون" },
    { digit: "58", urdu: "اٹھاون" },
    { digit: "59", urdu: "انساٹھ" },
    { digit: "60", urdu: "ساٹھ" },
    { digit: "61", urdu: "اکسٹھ" },
    { digit: "62", urdu: "باسٹھ" },
    { digit: "63", urdu: "تریسٹھ" },
    { digit: "64", urdu: "چونسٹھ" },
    { digit: "65", urdu: "پینسٹھ" },
    { digit: "66", urdu: "چھیاسٹھ" },
    { digit: "67", urdu: "سڑسٹھ" },
    { digit: "68", urdu: "اڑسٹھ" },
    { digit: "69", urdu: "انہتر" },
    { digit: "70", urdu: "ستر" },
    { digit: "71", urdu: "اکہتر" },
    { digit: "72", urdu: "بہتر" },
    { digit: "73", urdu: "تہتر" },
    { digit: "74", urdu: "چوہتر" },
    { digit: "75", urdu: "پچہتر" },
    { digit: "76", urdu: "چھہتر" },
    { digit: "77", urdu: "ستہتر" },
    { digit: "78", urdu: "اٹھہتر" },
    { digit: "79", urdu: "اناسی" },
    { digit: "80", urdu: "اسی" },
    { digit: "81", urdu: "اکیاسی" },
    { digit: "82", urdu: "بیاسی" },
    { digit: "83", urdu: "تراسی" },
    { digit: "84", urdu: "چوراسی" },
    { digit: "85", urdu: "پچاسی" },
    { digit: "86", urdu: "چھیاسی" },
    { digit: "87", urdu: "ستاسی" },
    { digit: "88", urdu: "اٹھاسی" },
    { digit: "89", urdu: "نواسی" },
    { digit: "90", urdu: "نوے" },
    { digit: "91", urdu: "اکانوے" },
    { digit: "92", urdu: "بانوے" },
    { digit: "93", urdu: "ترانوے" },
    { digit: "94", urdu: "چورانوے" },
    { digit: "95", urdu: "پچانوے" },
    { digit: "96", urdu: "چھیانوے" },
    { digit: "97", urdu: "ستانوے" },
    { digit: "98", urdu: "اٹھانوے" },
    { digit: "99", urdu: "ننانوے" },
    { digit: "100", urdu: "سو" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Urdu number: ${numbers[index].urdu}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-urdu" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Urdu
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            اردو نمبرز (Urdu Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Urdu
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
              <div className="text-2xl font-semibold text-center">{number.urdu}</div>
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

export default UrduNumbers;
